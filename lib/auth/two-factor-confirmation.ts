import prisma from '@/db';

export const getTwoFactorConfirmationByUserId = async (
	userId: string
): Promise<{
	id: string;
	userId: string;
} | null> => {
	try {
		const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
			where: { userId },
		});
		return twoFactorConfirmation;
	} catch {
		return null;
	}
};
