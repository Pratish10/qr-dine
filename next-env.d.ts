/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

import { type UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

// We can extend the session user type provided by next auth in this way
declare module 'next-auth' {
    interface User {
        role: UserRole
        isTwoFactorEnabled: boolean
    }
    interface Session extends DefaultSession {
        user?: User
    }
}
