/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import prisma from '@/db'
import { getUserById } from '@/lib/auth/user'
import { getTwoFactorConfirmationByUserId } from '@/lib/auth/two-factor-confirmation'
import APP_PATHS from '@/config/path.config'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: APP_PATHS.HOME,
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id ?? '')

            if (existingUser?.emailVerified === null) return false

            if (existingUser?.isTwoFactorEnabled) {
                const twoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                await prisma.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                })
            }

            return true
        },
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if ('isTwoFactorEnabled' in token && session.user) {
                session.user.isTwoFactorEnabled =
                    token.isTwoFactorEnabled as boolean
            }

            //   if (token.role && session.user) {
            //     session.user.role = token.role
            //   }

            if (session.user) {
                session.user.name = token.name
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.name = existingUser.name
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            //   token.role = existingUser.role
            return token
        },
    },
    //   secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    ...authConfig,
})
