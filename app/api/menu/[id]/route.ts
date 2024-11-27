/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type DefaultMenuType } from '@/app/(site)/menus/components/new-menu-sheet';
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const id = params.id;

		if (!id) {
			throw new ErrorHandler('Menu ID is required', 'BAD_REQUEST');
		}

		const menu = await prisma.menu.findUnique({
			where: {
				id,
			},
			include: {
				ratings: {
					select: {
						value: true,
					},
				},
			},
		});

		if (menu === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		const ratingData = await prisma.rating.aggregate({
			where: {
				menuId: id,
			},
			_avg: {
				value: true,
			},
		});

		const menuWithAverageRating = {
			...menu,
			averageRating: ratingData._avg.value !== null ? Number(ratingData._avg.value.toFixed(1)) : null,
		};

		return NextResponse.json(new SuccessResponse<DefaultMenuType>('Fetched Menu Successfully', 200, menuWithAverageRating).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
