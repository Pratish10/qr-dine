/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { generateOrderNumber } from '@/lib/generateOrderNumber';
import { stripe } from '@/lib/stripe/stripe';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type FormattedOrderData } from '@/types/data.types';
import { NextResponse, type NextRequest } from 'next/server';
import type Stripe from 'stripe';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'http://localhost:3001',
	'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(): Promise<NextResponse<unknown>> {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const {
			cartItems,
			customer,
			restaurantId,
			tableId,
		}: {
			cartItems: FormattedOrderData['cartItems'];
			customer: FormattedOrderData['customer'];
			restaurantId: FormattedOrderData['restaurantId'];
			tableId: FormattedOrderData['tableId'];
		} = await req.json();

		const orderNumber = await generateOrderNumber();

		if (!restaurantId) {
			throw new ErrorHandler('Please Scan the QR Code again', 'BAD_REQUEST');
		}

		const order = await prisma.order.create({
			data: {
				restaurantId,
				tableId,
				orderNumber,
				customer: { connect: { id: customer.id } },
				orderItems: {
					create: cartItems.map((cart) => {
						const calculatedAmount = parseFloat(cart.calculatedAmount);
						if (isNaN(calculatedAmount)) {
							throw new ErrorHandler('Invalid calculated amount', 'BAD_REQUEST');
						}
						return {
							menuId: cart.menuId,
							quantity: cart.quantity,
							unitPrice: Math.round((calculatedAmount / cart.quantity) * 100),
							totalPrice: Math.round(calculatedAmount * 100),
						};
					}),
				},
			},
		});

		const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((cart) => {
			const calculatedAmount = parseFloat(cart.calculatedAmount);
			if (isNaN(calculatedAmount)) {
				throw new ErrorHandler('Invalid calculated amount', 'BAD_REQUEST');
			}
			return {
				quantity: cart.quantity,
				price_data: {
					currency: 'INR',
					product_data: {
						name: cart.name,
					},
					unit_amount: Math.round((calculatedAmount / cart.quantity) * 100),
				},
			};
		});

		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			mode: 'payment',
			currency: 'INR',
			phone_number_collection: {
				enabled: true,
			},
			customer_email: customer?.email,
			success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${order.id}`,
			cancel_url: process.env.NEXT_PUBLIC_CLIENT_URL,
			metadata: {
				orderId: order.id,
				tableId: tableId ?? '',
			},
		});

		return NextResponse.json(new SuccessResponse('Successfully Added Order', 200, { url: session.url }).serialize(), { headers: corsHeaders });
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
