'use client';

import { type Session } from 'next-auth';
import { SessionProvider as NextSessionProvider, getSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

export default function SessionProvider({ children }: { children: ReactNode }): JSX.Element {
	// updating session using the states and effects
	const [session, setSession] = useState<Session | null>(null);
	const pathName = usePathname();

	const fetchSession = useCallback(async () => {
		try {
			const sessionData = await getSession();
			setSession(sessionData);
		} catch (error) {
			setSession(null);
		}
	}, []);

	useEffect(() => {
		void fetchSession().finally();
	}, [fetchSession, pathName]);

	return <NextSessionProvider session={session}>{children}</NextSessionProvider>;
}
