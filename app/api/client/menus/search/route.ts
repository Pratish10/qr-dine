/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const { search } = Object.fromEntries(new URL(req.url).searchParams);

		if (!search) {
			return NextResponse.json(new SuccessResponse('Please provide a search query.', 400).serialize());
		}

		const menus = await prisma.menu.findMany({
			where: {
				OR: [
					{ name: { contains: search, mode: 'insensitive' } },
					{ description: { contains: search, mode: 'insensitive' } },
					{ category: { contains: search, mode: 'insensitive' } },
					{ amount: { contains: search, mode: 'insensitive' } },
				],
			},
			select: {
				id: true,
				menuId: true,
				name: true,
				type: true,
				category: true,
				amount: true,
				image: true,
			},
		});

		if (menus.length === 0) {
			return NextResponse.json(new SuccessResponse('No menus found matching your query.', 404).serialize());
		}

		return NextResponse.json(new SuccessResponse('Fetched Menus Successfully', 200, menus).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
