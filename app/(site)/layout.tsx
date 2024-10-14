import { AppBar } from '@/components/AppBar';
import { Navbar } from '@/components/Navbar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<div className='h-screen'>
			<Navbar />
			<AppBar />
			<div className='container'>{children}</div>
		</div>
	);
}
