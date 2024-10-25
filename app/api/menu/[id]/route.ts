/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type DefaultMenuType } from '@/app/(site)/menus/components/new-menu-sheet';
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const user = await getCurrentUser();
		const id = params.id;

		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);

		if (existingUser === null) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		if (!id) {
			throw new ErrorHandler('Menu ID is required', 'BAD_REQUEST');
		}

		const menu = await prisma.menu.findUnique({
			where: {
				id,
			},
			select: {
				name: true,
				amount: true,
				category: true,
				description: true,
				type: true,
				availability: true,
				image: true,
				isFeatured: true,
				restaurantId: true,
				id: true,
			},
		});

		if (menu === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<DefaultMenuType>('Fetched Menu Successfully', 200, menu).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
