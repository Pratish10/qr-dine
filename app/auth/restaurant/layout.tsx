/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppBar } from '@/components/AppBar';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { type ReactNode } from 'react';

export default async function RestaurantLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
	const user = await getCurrentUser();
	return (
		<div>
			{children}
			{user && <AppBar />}
		</div>
	);
}
