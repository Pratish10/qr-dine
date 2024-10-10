'use server'

import { generatePasswordResetToken } from '@/lib/token'
import { sendPasswordResetEmail } from '@/lib/mail'
import { withServerActionAsyncCatcher } from '@/lib/async-catch'
import { type ResetSchemaType } from '@/schemas/types'
import { type ServerActionReturnType } from '@/types/api.types'
import { ResetSchema } from '@/schemas/schema'
import { getUserByEmail } from '@/lib/user'
import { SuccessResponse } from '@/lib/success'
import { ErrorHandler } from '@/lib/error'

export const resetPassword = withServerActionAsyncCatcher<
    ResetSchemaType,
    ServerActionReturnType
>(async (data) => {
    const validatedFields = ResetSchema.safeParse(data)

    if (!validatedFields.success) {
        throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST')
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser == null) {
        throw new ErrorHandler('Email not found!', 'BAD_REQUEST')
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return new SuccessResponse('Reset email Sent!', 201).serialize()
})
