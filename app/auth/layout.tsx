import { Navbar } from '@/components/Navbar';
import { Suspense } from 'react';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<div className='h-screen'>
			<Suspense>
				<Navbar />
				{children}
			</Suspense>
		</div>
	);
}
