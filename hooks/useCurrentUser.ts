import { type User } from 'next-auth'
import { useSession } from 'next-auth/react'

export const useCurrentUser = (): User | undefined => {
    const session = useSession()

    return session?.data?.user
}
