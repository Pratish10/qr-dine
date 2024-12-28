/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const id = params.id;

		if (!id) {
			throw new ErrorHandler('Order ID is required', 'BAD_REQUEST');
		}

		const order = await prisma.order.findUnique({
			where: {
				id,
			},
			include: {
				orderItems: true,
				customer: true,
			},
		});

		if (order === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		return NextResponse.json(new SuccessResponse('Fetched Order Successfully', 200, order).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
