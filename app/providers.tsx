'use client';
import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { RecoilRoot } from 'recoil';
import { EdgeStoreProvider } from '@/lib/edgestore';

export const Providers = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
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
