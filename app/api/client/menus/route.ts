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

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const menus: Menu[] = await prisma.menu.findMany({
			where: {
				restaurantId: {
					equals: id,
				},
				availability: {
					equals: 'Available',
				},
			},
			orderBy: {
				updatedAt: 'asc',
			},
		});

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<Menu[]>('Fetched Menus Successfully', 200, menus).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
