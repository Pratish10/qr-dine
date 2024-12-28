/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FREE_PLAN_ID } from '@/config/auth.config';
import prisma from '@/db';
import { ErrorHandler } from '@/lib/error';
import { stripe } from '@/lib/stripe/stripe';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import type Stripe from 'stripe';

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	const body = await req.text();
	const signature = headers().get('Stripe-Signature') ?? '';

	let event;
	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_KEY_SUBSCRIPTION ?? '');
	} catch (err: any) {
		throw new ErrorHandler(`Webhook Error: ${err.message as string}`, 'INTERNAL_SERVER_ERROR');
	}

	const session = event.data.object as Stripe.Checkout.Session;

	switch (event.type) {
		case 'checkout.session.completed': {
			const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
				expand: ['items.data.price.product'],
			});
			if (!session.client_reference_id) {
				throw new ErrorHandler('Webhook: Client Id Error', 'INTERNAL_SERVER_ERROR');
			}
			const plan = subscription.items.data[0]?.price;
			if (!plan) {
				throw new ErrorHandler('Plan Not Found', 'NOT_FOUND');
			}

			const productId = (plan.product as Stripe.Product).id;

			let planId;

			if (typeof plan.product !== 'string' && 'metadata' in plan.product) {
				planId = plan.product.metadata.id;
			} else {
				throw new ErrorHandler('Product metadata not found', 'NOT_FOUND');
			}

			if (!productId || !planId) {
				throw new ErrorHandler('Invalid product data for subscription.', 'NOT_FOUND');
			}

			const planRecord = await prisma.plan.findUnique({
				where: { id: planId },
				select: { id: true },
			});
			if (!planRecord) {
				throw new ErrorHandler('Plan type does not exist in database.', 'NOT_FOUND');
			}

			await prisma.user.update({
				where: { id: session.client_reference_id },
				data: { plantId: planRecord.id },
			});

			await prisma.subscription.upsert({
				where: { subscriptionId: subscription.id },
				update: {
					productId,
					priceId: plan.id,
					customerId: subscription.customer as string,
					endDate: new Date(subscription.current_period_end * 1000),
				},
				create: {
					subscriptionId: subscription.id,
					productId,
					priceId: plan.id,
					customerId: subscription.customer as string,
					endDate: new Date(subscription.current_period_end * 1000),
					userId: session.client_reference_id,
				},
			});

			return NextResponse.json(new SuccessResponse('Subscription created or updated successfully', 200).serialize());
		}

		case 'invoice.payment_succeeded': {
			const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
				expand: ['items.data.price.product'],
			});

			const plan = subscription.items.data[0]?.price;
			if (!plan) {
				throw new ErrorHandler('Plan Not Found', 'NOT_FOUND');
			}

			const productId = (plan.product as Stripe.Product).id;
			if (!productId) {
				throw new ErrorHandler('No product ID found for this subscription.', 'NOT_FOUND');
			}

			await prisma.subscription.update({
				where: { subscriptionId: subscription.id },
				data: {
					productId,
					priceId: plan.id,
					endDate: new Date(subscription.current_period_end * 1000),
				},
			});

			return NextResponse.json(new SuccessResponse('Subscription updated successfully on payment', 200).serialize());
		}

		case 'customer.subscription.trial_will_end': {
			const subscription = await stripe.subscriptions.retrieve(session.id, {
				expand: ['items.data.price.product'],
			});

			await prisma.subscription.update({
				where: {
					subscriptionId: subscription.id,
				},
				data: {
					updatedAt: new Date(),
					endDate: new Date(subscription.current_period_end * 1000),
				},
			});
			return NextResponse.json(new SuccessResponse('Trial will end soon; subscription updated.', 200).serialize());
		}

		case 'customer.subscription.deleted': {
			const subscription = event.data.object;

			if (!session.client_reference_id) {
				throw new ErrorHandler('Webhook: Client Id Error', 'INTERNAL_SERVER_ERROR');
			}

			await prisma.subscription.delete({
				where: { subscriptionId: subscription.id },
			});

			await prisma.user.update({
				where: { id: session.client_reference_id },
				data: { plantId: FREE_PLAN_ID },
			});

			return NextResponse.json(new SuccessResponse('Subscription canceled', 200).serialize());
		}
	}
	return NextResponse.json(new SuccessResponse('Webhook event processed', 200).serialize());
}
