import prisma from '@/db';

export const getTwoFacTokenByToken = async (
	token: string
): Promise<{
	id: string;
	email: string;
	token: string;
	expires: Date;
} | null> => {
	try {
		const tokenFactorToken = await prisma.twofactorToken.findUnique({
			where: { token },
		});
		return tokenFactorToken;
	} catch {
		return null;
	}
};

export const getTwoFacTokenByEmail = async (
	email: string
): Promise<{
	id: string;
	email: string;
	token: string;
	expires: Date;
} | null> => {
	try {
		const tokenFactorToken = await prisma.twofactorToken.findUnique({
			where: { email },
		});
		return tokenFactorToken;
	} catch {
		return null;
	}
};
