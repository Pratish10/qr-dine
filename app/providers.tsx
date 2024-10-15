import React from 'react';
import { ThemeProvider } from './theme-provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { QueryProvider } from './query-provider';

export const Providers = async ({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> => {
	const session = await auth();

	return (
		<QueryProvider>
			<SessionProvider session={session}>
				<ThemeProvider attribute='class' defaultTheme='light'>
					{children}
				</ThemeProvider>
			</SessionProvider>
		</QueryProvider>
	);
};
