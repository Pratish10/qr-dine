/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppBar } from '@/components/AppBar';
import { Navbar } from '@/components/Navbar';
import { useCurrentSession } from '@/hooks/useCurrentSession';

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): Promise<JSX.Element> {
	const user = await useCurrentSession();

	return (
		<div className='h-screen'>
			<Navbar />
			{user && <AppBar />}
			<div className='container'>{children}</div>
		</div>
	);
}
