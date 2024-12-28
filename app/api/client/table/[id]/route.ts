/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Table } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const id = params.id;

		if (!id) {
			throw new ErrorHandler('Table ID is required', 'BAD_REQUEST');
		}

		const tableResult = await prisma.table.findUnique({
			where: {
				tableId: id,
			},
		});

		if (tableResult === null) {
			throw new ErrorHandler('Data not found', 'NOT_FOUND');
		}

		const table: Table = tableResult;

		return NextResponse.json(new SuccessResponse<Table>('Fetched Table Successfully', 200, table).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
