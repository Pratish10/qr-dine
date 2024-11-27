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

		const menus = await prisma.menu.findMany({
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
			include: {
				ratings: {
					select: {
						value: true,
					},
				},
			},
		});

		const menusWithAverageRating = await Promise.all(
			menus.map(async (menu) => {
				const ratingData = await prisma.rating.aggregate({
					where: {
						menuId: menu.id,
					},
					_avg: {
						value: true,
					},
				});

				return {
					...menu,
					averageRating: ratingData._avg.value !== null ? Number(ratingData._avg.value.toFixed(1)) : null,
				};
			})
		);
		return NextResponse.json(new SuccessResponse<Menu[]>('Fetched Menus Successfully', 200, menusWithAverageRating).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
