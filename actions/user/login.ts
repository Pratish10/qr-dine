'use server'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import {
    generateTwoFactorToken,
    generateVerificationToken,
} from '@/lib/auth/token'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { type LoginUserType } from '@/schemas/types'
import { LoginUserSchema } from '@/schemas/schema'
import { getUserByEmail } from '@/lib/auth/user'
import { getTwoFacTokenByEmail } from '@/lib/auth/two-factor-token'
import { getTwoFactorConfirmationByUserId } from '@/lib/auth/two-factor-confirmation'
import APP_PATHS from '@/config/path.config'
import prisma from '@/db'
import { withServerActionAsyncCatcher } from '@/lib/async-catch'
import { type ServerActionReturnType } from '@/types/api.types'
import { ErrorHandler } from '@/lib/error'
import { SuccessResponse } from '@/lib/success'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { getRestaurantsByUserId } from '@/lib/restaurant/restaurant'

export const login = withServerActionAsyncCatcher<
    LoginUserType,
    ServerActionReturnType
>(async (values) => {
    const validatedFields = LoginUserSchema.safeParse(values)

    if (!validatedFields.success) {
        throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST')
    }
    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser?.email == null || existingUser.encryptedPassword == null) {
        throw new ErrorHandler('Email does not exists!', 'BAD_REQUEST')
    }

    if (existingUser.emailVerified == null) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return new SuccessResponse(
            'A verification mail has been sent to your email id!',
            201
        ).serialize()
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email !== '') {
        if (code != null) {
            const twoFactorToken = await getTwoFacTokenByEmail(
                existingUser.email
            )

            if (twoFactorToken == null) {
                throw new ErrorHandler('Invalid Code', 'BAD_REQUEST')
            }

            if (twoFactorToken.token !== code) {
                throw new ErrorHandler('Invalide Code', 'BAD_REQUEST')
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if (hasExpired) {
                throw new ErrorHandler('Code Expired', 'BAD_REQUEST')
            }

            await prisma.twofactorToken.delete({
                where: { id: twoFactorToken.id },
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.email
            )

            if (existingConfirmation != null) {
                await prisma.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                })
            }

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            })
        } else {
            const twofactorToken = await generateTwoFactorToken(
                existingUser.email
            )
            await sendTwoFactorTokenEmail(
                twofactorToken.email,
                twofactorToken.token
            )

            return new SuccessResponse('2FA Code has been sent', 201, {
                twoFactor: true,
            }).serialize()
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: APP_PATHS.DASHBOARD,
        })
    } catch (error) {
        if (isRedirectError(error)) {
            // Handle redirect error, but also check for restaurants
            const restaurants = await getRestaurantsByUserId(existingUser?.id)

            if (restaurants == null || restaurants.length === 0) {
                return new SuccessResponse('SuccessFull Login!', 200, {
                    redirectError: true,
                    hasRestaurants: false,
                    redirectTo: APP_PATHS.RESTAURANT,
                }).serialize()
            }

            return new SuccessResponse('SuccessFull Login!', 200, {
                redirectError: true,
                hasRestaurants: true,
                redirectTo: APP_PATHS.DASHBOARD,
            }).serialize()
        }
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                throw new ErrorHandler('Invalid Credentials!', 'BAD_REQUEST')
            } else {
                throw new ErrorHandler('Something went wrong!', 'BAD_REQUEST')
            }
        }
        throw error
    }

    return new SuccessResponse(
        'A verification mail has been sent to your email id!',
        201
    ).serialize()
})
