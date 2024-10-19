import prisma from '@/db';
import { type Plan } from '@prisma/client';

export const getUserByEmail = async (
	email: string
): Promise<{
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	encryptedPassword: string | null;
	isTwoFactorEnabled: boolean;
	plan: Plan;
} | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			include: {
				plan: true,
			},
		});
		return user;
	} catch {
		return null;
	}
};
export const getUserById = async (
	id: string
): Promise<{
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	encryptedPassword: string | null;
	isTwoFactorEnabled: boolean;
	plan: Plan;
} | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				plan: true,
			},
		});
		return user;
	} catch {
		return null;
	}
};
