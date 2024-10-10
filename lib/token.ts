import { v4 as uuidv4 } from 'uuid'
import prisma from '@/db'
import { getVerificationTokenByEmail } from '@/lib/verification-token'
import { getPasswordResetTokenByEmail } from '@/lib/password-reset-token'
import crypto from 'crypto'
import { getTwoFacTokenByEmail } from '@/lib/two-factor-token'

export const generateVerificationToken = async (
    email: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
}> => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken != null) {
        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return verificationToken
}

export const generatePasswordResetToken = async (
    email: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
}> => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken != null) {
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id },
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return passwordResetToken
}

export const generateTwoFactorToken = async (
    email: string
): Promise<{
    id: string
    email: string
    token: string
    expires: Date
}> => {
    const token = crypto.randomInt(1_00_000, 9_99_999).toString()
    //  expires the token in 5 minutes
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const existingToken = await getTwoFacTokenByEmail(email)

    if (existingToken !== null) {
        await prisma.twofactorToken.delete({
            where: { id: existingToken.id },
        })
    }

    const twofactorToken = await prisma.twofactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return twofactorToken
}
