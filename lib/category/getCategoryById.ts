import prisma from '@/db';
import { type Category } from '@prisma/client';

export const getCategoryById = async (id: string): Promise<Category | null> => {
	try {
		const category = await prisma.category.findUnique({
			where: { id },
		});
		return category;
	} catch {
		return null;
	}
};
