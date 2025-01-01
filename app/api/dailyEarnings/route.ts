/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const user = await getCurrentUser();

		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);

		if (!existingUser) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const date = new Date();

		const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
		const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

		const todaysOrder = await prisma.order.findMany({
			where: {
				restaurantId: {
					equals: id,
				},
				orderDate: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			select: {
				orderItems: true,
			},
		});

		const totalEarnings = todaysOrder
			.map((order) => order.orderItems.reduce((total, orderItem) => total + orderItem.totalPrice, 0))
			.reduce((total, price) => total + price, 0);

		const formattedEarnings = new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
		}).format(totalEarnings / 100);

		return NextResponse.json(new SuccessResponse<string>('Fetched Daily Earnings Successfully', 200, formattedEarnings).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
