'use client';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { RecoilRoot } from 'recoil';
import { EdgeStoreProvider } from '@/lib/edgestore';

export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<RecoilRoot>
			<QueryProvider>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
				</ThemeProvider>
			</QueryProvider>
		</RecoilRoot>
	);
};
