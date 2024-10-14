import { auth } from '@/auth';
import { type Session } from 'next-auth';

export const useAuthenticatedStatus = async (): Promise<Session | null> => {
	const session = await auth();

	return session;
};
