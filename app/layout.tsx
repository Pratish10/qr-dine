import type { Metadata } from 'next';
import '@/app/globals.css';
import { Poppins } from 'next/font/google';
import { Providers } from '@/app/providers';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import SessionProvider from '@/app/session-provider';
import { siteConfig } from '@/config/site-config';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = siteConfig;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/app/logo.svg' type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/app/logo.svg' />
			</head>
			<body className={`${poppins.className} antialiased`}>
				<NextTopLoader color='#17a34a' height={3} showSpinner={false} />
				<Providers>
					<SessionProvider>
						{children}
						<Toaster closeButton richColors position='top-right' />
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
