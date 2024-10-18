/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppBar } from '@/components/AppBar';
import { Navbar } from '@/components/Navbar';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import AuthenticatedLayout from './authenticated-layout';
import { SheetProvider } from './sheet-provider';

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): Promise<JSX.Element> {
	const user = await getCurrentUser();

	return (
		<div className='h-screen'>
			<Navbar />
			{user ? (
				<AuthenticatedLayout>
					<AppBar />
					<SheetProvider />
					{children}
				</AuthenticatedLayout>
			) : (
				<div>{children}</div>
			)}
		</div>
	);
}
