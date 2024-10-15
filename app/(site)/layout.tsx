/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppBar } from '@/components/AppBar';
import { Navbar } from '@/components/Navbar';
import { getCurrentUser } from '@/hooks/getCurrentUser';

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): Promise<JSX.Element> {
	const user = await getCurrentUser();

	return (
		<div className='h-screen'>
			<Navbar />
			{user && <AppBar />}
			<div className='container'>{children}</div>
		</div>
	);
}
