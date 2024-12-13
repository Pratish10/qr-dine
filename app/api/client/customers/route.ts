/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import { standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const { ratings, name, email } = await req.json();

		const existingCustomer = await getCustomerByEmail((email ?? '') as string);

		if (existingCustomer) {
			const createdRatings = await prisma.rating.createMany({
				data: ratings.map(({ rating, menuId }: { rating: number; menuId: string }) => ({
					value: rating,
					menuId,
				})),
			});

			return NextResponse.json(
				new SuccessResponse(`Welcome Back ${existingCustomer.name}`, 200, { customer: existingCustomer, createdRatings }).serialize()
			);
		} else {
			const [customer, createdRatings] = await prisma.$transaction(async (tx) => {
				const customer = await tx.customer.create({
					data: { name, email },
				});

				const ratingsData = ratings.map(({ rating, menuId }: { rating: number; menuId: string }) => ({
					value: rating,
					menuId,
				}));

				const createdRatings = await tx.rating.createMany({
					data: ratingsData,
				});

				return [customer, createdRatings];
			});

			return NextResponse.json(new SuccessResponse('Customer Registered and Ratings Added', 200, { customer, createdRatings }).serialize());
		}
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
