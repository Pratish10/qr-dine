import prisma from '@/db';
import { type Table } from '@prisma/client';

export const getTableByTableNumber = async (tableNumber: string): Promise<Table | null> => {
	try {
		const table = await prisma.table.findUnique({
			where: {
				tableNumber,
			},
		});

		return table;
	} catch {
		return null;
	}
};
