/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { generateUniqueFourDigitNumber } from '@/lib/generateUniqueFourDigitNumber';
import { getRestaurantByRestaurantId } from '@/lib/restaurant/restaurant';
import { SuccessResponse } from '@/lib/success';
import { AddMenuSchema } from '@/schemas/schema';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Menu } from '@prisma/client';
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

		const menus: Menu[] = await prisma.menu.findMany({
			where: {
				restaurantId: {
					equals: id,
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

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const body = await req.json();

		const user = await getCurrentUser();
		const validatedFields = AddMenuSchema.safeParse(body);

		if (!validatedFields.success) {
			throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
		}

		const { amount, availability, category, description, image, name, type, restaurantId, isFeatured } = validatedFields.data;

		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);
		if (existingUser === null) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingRestaurant = await getRestaurantByRestaurantId(restaurantId);

		if (existingRestaurant === null) {
			throw new ErrorHandler('The Associated Restaurant not found', 'NOT_FOUND');
		}

		const menuId = `M-${generateUniqueFourDigitNumber()}`;

		await prisma.menu.create({
			data: {
				menuId,
				name,
				description,
				type,
				image,
				category,
				amount,
				availability,
				isFeatured: isFeatured ?? false,
				restaurant: {
					connect: { id: restaurantId },
				},
			},
		});

		return NextResponse.json(new SuccessResponse('Succesflly Added Menu', 200).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const body = await req.json();

		if (!Array.isArray(body) || body.length === 0) {
			throw new ErrorHandler('Invalid input: array of IDs is required', 'BAD_REQUEST');
		}

		const user = await getCurrentUser();
		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);
		if (!existingUser) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const deleteResult = await prisma.menu.deleteMany({
			where: {
				id: {
					in: body,
				},
			},
		});

		if (deleteResult.count === 0) {
			throw new ErrorHandler('No menus found to delete', 'NOT_FOUND');
		}

		return NextResponse.json(new SuccessResponse('Successfully Deleted Menus', 200).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
