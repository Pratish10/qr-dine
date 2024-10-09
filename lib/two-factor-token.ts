import prisma from "@/db";

export const getTwoFacTokenByToken = async (token: string) => {
  try {
    const tokenFactorToken = await prisma.twofactorToken.findUnique({
      where: { token },
    });
    return tokenFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFacTokenByEmail = async (email: string) => {
  try {
    const tokenFactorToken = await prisma.twofactorToken.findUnique({
      where: { email },
    });
    return tokenFactorToken;
  } catch {
    return null;
  }
};
