/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { getCategoryById } from '@/lib/category/getCategoryById';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { getRestaurantByRestaurantId } from '@/lib/restaurant/restaurant';
import { SuccessResponse } from '@/lib/success';
import { AddCategorySchema } from '@/schemas/schema';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Category } from '@prisma/client';
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

		const categories: Category[] = await prisma.category.findMany({
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
		return NextResponse.json(new SuccessResponse<Category[]>('Fetched Categories Successfully', 200, categories).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const body = await req.json();

		const user = await getCurrentUser();
		const validatedFields = AddCategorySchema.safeParse(body);

		if (!validatedFields.success) {
			throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
		}

		const { category, restaurantId } = validatedFields.data;

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

		await prisma.category.create({
			data: {
				category,
				restaurant: {
					connect: { id: restaurantId },
				},
			},
		});

		return NextResponse.json(new SuccessResponse('Succesfully Added Category', 200).serialize());
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

		const deleteResult = await prisma.category.deleteMany({
			where: {
				id: {
					in: body,
				},
			},
		});

		if (deleteResult.count === 0) {
			throw new ErrorHandler('No category found to delete', 'NOT_FOUND');
		}

		return NextResponse.json(new SuccessResponse('Successfully Deleted Categories', 200).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}

export async function PATCH(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const body = await req.json();

		const user = await getCurrentUser();
		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);
		if (!existingUser) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const { id, category } = body;

		if (!id) {
			throw new ErrorHandler('Category ID is required', 'BAD_REQUEST');
		}

		const existingCategory = await getCategoryById(id as string);

		if (!existingCategory) {
			throw new ErrorHandler('Category not found', 'NOT_FOUND');
		}

		const updatedCategory = await prisma.menu.update({
			where: { id },
			data: {
				category,
				updatedAt: new Date(),
			},
		});

		return NextResponse.json(new SuccessResponse('Successfully Updated Category', 200, updatedCategory).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
