import prisma from '@/db'

export const getPasswordResetTokenByEmail = async (
    email: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
} | null> => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: { email },
        })

        return passwordResetToken
    } catch {
        return null
    }
}

export const getPasswordResetTokenByToken = async (
    token: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
} | null> => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        })

        return passwordResetToken
    } catch {
        return null
    }
}
