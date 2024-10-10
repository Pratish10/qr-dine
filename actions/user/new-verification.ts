'use server'

import prisma from '@/db'
import { withServerActionAsyncCatcher } from '@/lib/async-catch'
import { ErrorHandler } from '@/lib/error'
import { SuccessResponse } from '@/lib/success'
import { getUserByEmail } from '@/lib/user'
import { getVerificationTokenByToken } from '@/lib/verification-token'
import { type ServerActionReturnType } from '@/types/api.types'

export const newVerification = withServerActionAsyncCatcher<
    string,
    ServerActionReturnType
>(async (token) => {
    const existingToken = await getVerificationTokenByToken(token)
    if (existingToken == null) {
        throw new ErrorHandler('Token does not exists!', 'BAD_REQUEST')
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        throw new ErrorHandler('Your Token has Expired', 'BAD_REQUEST')
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (existingUser == null) {
        throw new ErrorHandler('Email does not exists!', 'BAD_REQUEST')
    }

    try {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: { emailVerified: new Date(), email: existingUser.email },
        })

        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        })

        return new SuccessResponse('Email Verified', 201).serialize()
    } catch {
        throw new ErrorHandler('Internal Server Error', 'INTERNAL_SERVER_ERROR')
    }
})
