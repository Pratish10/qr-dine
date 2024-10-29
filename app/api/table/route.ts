/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { generateUniqueFourDigitNumber } from '@/lib/generateUniqueFourDigitNumber';
import { getRestaurantByRestaurantId } from '@/lib/restaurant/restaurant';
import { SuccessResponse } from '@/lib/success';
import { getTableByTableNumber } from '@/lib/table/getTableByTableNumber';
import { AddTableSchema } from '@/schemas/schema';
import { type ServerActionReturnType } from '@/types/api.types';
import { canAddTable } from '@/utils/permissions';
import { type Table } from '@prisma/client';
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

		const tables: Table[] = await prisma.table.findMany({
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
		return NextResponse.json(new SuccessResponse<Table[]>('Fetched Menus Successfully', 200, tables).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}

export async function POST(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const body = await req.json();

		const user = await getCurrentUser();
		const validatedFields = AddTableSchema.safeParse(body);

		if (!validatedFields.success) {
			throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
		}

		const { restaurantId, tableNumber, tableQrCode, tableSize, tableStatus } = validatedFields.data;

		const exisitngTable = await getTableByTableNumber(tableNumber);

		if (exisitngTable !== null) {
			throw new ErrorHandler('Table Number already Exists', 'BAD_REQUEST');
		}

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

		const tableId = `T-${generateUniqueFourDigitNumber()}`;

		const tables = await prisma.table.findMany({
			where: {
				restaurantId: {
					equals: restaurantId,
				},
			},
		});

		if (canAddTable(user, tables)) {
			await prisma.table.create({
				data: {
					tableId,
					tableNumber,
					tableQrCode,
					tableSize,
					tableStatus,
					restaurant: {
						connect: { id: restaurantId },
					},
				},
			});

			return NextResponse.json(new SuccessResponse('Succesfully Table Menu', 200).serialize());
		} else {
			throw new ErrorHandler(
				'You’ve reached the limit of your current plan. To add more tables and unlock additional features, please upgrade to a higher plan.',
				'INSUFFICIENT_PERMISSIONS'
			);
		}
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

		const deleteResult = await prisma.table.deleteMany({
			where: {
				id: {
					in: body,
				},
			},
		});

		if (deleteResult.count === 0) {
			throw new ErrorHandler('No menus found to delete', 'NOT_FOUND');
		}

		return NextResponse.json(new SuccessResponse('Successfully Deleted Tables', 200).serialize());
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

		const { id, ...updateData } = body;

		if (!id) {
			throw new ErrorHandler('Table ID is required', 'BAD_REQUEST');
		}

		const validatedFields = AddTableSchema.safeParse(updateData);
		if (!validatedFields.success) {
			throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
		}

		const existingTable = await prisma.table.findUnique({
			where: { id },
		});

		if (!existingTable) {
			throw new ErrorHandler('Table not found', 'NOT_FOUND');
		}

		const updatedTable = await prisma.table.update({
			where: { id },
			data: {
				...validatedFields.data,
				updatedAt: new Date(),
			},
		});

		return NextResponse.json(new SuccessResponse('Successfully Updated Menu', 200, updatedTable).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
