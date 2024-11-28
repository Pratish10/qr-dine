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
		const page = parseInt(searchParams.get('page') ?? '1', 10);
		const limit = parseInt(searchParams.get('limit') ?? '8', 10);
		const type = searchParams.get('type');
		const availability = searchParams.get('availability');
		const category = searchParams.get('category');
		const rating = parseInt(searchParams.get('rating') ?? '0', 10);

		if (!id) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const offset = (page - 1) * limit;

		const filters: any = {
			restaurantId: id,
		};

		if (type) {
			filters.type = type;
		}

		if (availability) {
			filters.availability = availability;
		}

		if (category) {
			filters.category = {
				in: category
					.split(',')
					.map((c) => c.trim())
					.filter((c) => c !== ''),
			};
		}

		const menus = await prisma.menu.findMany({
			where: filters,
			skip: offset,
			take: limit,
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

				if (rating > 0 && (ratingData._avg.value ?? 0) < rating) {
					return null;
				}

				return {
					...menu,
					averageRating: ratingData._avg.value !== null ? Number(ratingData._avg.value.toFixed(1)) : null,
				};
			})
		);

		const filteredMenus = menusWithAverageRating.filter((menu) => menu !== null);

		return NextResponse.json(new SuccessResponse<Menu[]>('Fetched Menus Successfully', 200, filteredMenus).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
