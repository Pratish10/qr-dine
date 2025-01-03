/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export interface CategoryType {
	id: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
	restaurantId: string;
}

export async function GET(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const categories: CategoryType[] = await prisma.category.findMany({
			where: { restaurantId: id },
			orderBy: {
				category: 'asc',
			},
		});

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<CategoryType[]>('Fetched Categories Successfully', 200, categories).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
