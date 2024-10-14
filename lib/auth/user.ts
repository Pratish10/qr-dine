import prisma from '@/db';

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
} | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
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
} | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		return user;
	} catch {
		return null;
	}
};
