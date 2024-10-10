import { auth } from '@/auth'
import { type User } from 'next-auth'

export const useCurrentSession = async (): Promise<User | undefined> => {
    const session = await auth()
    return session?.user
}
