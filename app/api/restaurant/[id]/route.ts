/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Restaurant } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const id = params.id;

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const restaurant = await prisma.restaurant.findUnique({
			where: {
				id,
			},
		});

		if (restaurant === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<Restaurant>('Fetched Restaurant Successfully', 200, restaurant).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
