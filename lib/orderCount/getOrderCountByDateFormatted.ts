import prisma from '@/db';
import { type OrderCount } from '@prisma/client';

export const getOrderCountByDateFormatted = async (dateFormatted: string): Promise<OrderCount | null> => {
	try {
		const orderCount = await prisma.orderCount.findUnique({
			where: { date: dateFormatted },
		});
		return orderCount;
	} catch {
		return null;
	}
};
