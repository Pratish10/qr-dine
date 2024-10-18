/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { NextResponse } from 'next/server';

export interface RestaurantType {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	fullName: string;
	branchName: string;
	userId: string;
	restaurantId: string;
}

export async function GET(): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const user = await getCurrentUser();

		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);

		if (!existingUser) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const restaurants: RestaurantType[] = await prisma.restaurant.findMany({
			where: { userId: existingUser.id },
			select: {
				id: true,
				restaurantId: true,
				fullName: true,
				branchName: true,
				createdAt: true,
				updatedAt: true,
				userId: true,
				ClientName: true,
			},
			orderBy: {
				updatedAt: 'asc',
			},
		});

		return NextResponse.json(new SuccessResponse<RestaurantType[]>('Fetch Restaurants Successfully', 200, restaurants).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
