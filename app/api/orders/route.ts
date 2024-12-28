/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Order } from '@prisma/client';
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

		const orders: Order[] = await prisma.order.findMany({
			where: {
				restaurantId: {
					equals: id,
				},
			},
			include: {
				orderItems: true,
				customer: true,
			},
			orderBy: {
				updatedAt: 'asc',
			},
		});

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<Order[]>('Fetched Orders Successfully', 200, orders).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
