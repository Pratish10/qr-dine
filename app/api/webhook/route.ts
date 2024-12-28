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

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_KEY_PRODUCT ?? '');
	} catch (error) {
		throw new ErrorHandler('Web Hook Error', 'NOT_FOUND');
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === 'checkout.session.completed') {
		await prisma.order.update({
			where: {
				id: session?.metadata?.orderId,
			},
			data: {
				isPaid: true,
			},
			include: {
				orderItems: true,
			},
		});

		await prisma.table.update({
			where: {
				tableId: session?.metadata?.tableId,
			},
			data: {
				tableStatus: 'Vacant',
			},
		});
	}

	return NextResponse.json(new SuccessResponse('Order Placed successfully', 200).serialize());
}
