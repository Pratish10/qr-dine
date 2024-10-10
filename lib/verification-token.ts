import prisma from '@/db'

export const getVerificationTokenByEmail = async (
    email: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
} | null> => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { email },
        })
        return verificationToken
    } catch {
        return null
    }
}
export const getVerificationTokenByToken = async (
    token: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
} | null> => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        })
        return verificationToken
    } catch {
        return null
    }
}
