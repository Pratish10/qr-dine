/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Category } from '@prisma/client';
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
			throw new ErrorHandler('Category ID is required', 'BAD_REQUEST');
		}

		const category = await prisma.category.findUnique({
			where: {
				id,
			},
		});

		if (category === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		// Return success response with categories
		return NextResponse.json(new SuccessResponse<Category>('Fetched Category Successfully', 200, category).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
