import prisma from '@/db';
import { type Customer } from '@prisma/client';

export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
	try {
		const customer = await prisma.customer.findUnique({
			where: { email },
		});
		return customer;
	} catch {
		return null;
	}
};
