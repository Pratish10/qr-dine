/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Menu } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');
		const categories = searchParams.get('categories');

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const categoryArray = categories ? categories.split(',') : null;

		const menus: Menu[] = await prisma.menu.findMany({
			where: {
				restaurantId: id,
				availability: 'Available',
				...(categoryArray && { category: { in: categoryArray } }),
			},
			orderBy: {
				updatedAt: 'asc',
			},
		});

		return NextResponse.json(new SuccessResponse<Menu[]>('Fetched Menus Successfully', 200, menus).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
