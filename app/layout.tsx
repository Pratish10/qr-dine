import type { Metadata } from 'next';
import '@/app/globals.css';
import { Poppins } from 'next/font/google';
import { Providers } from '@/app/providers';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import SessionProvider from '@/app/session-provider';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'QR Dine | Smart QR Code Menus for Restaurants',
	description:
		'QR Dine revolutionizes restaurant dining with QR code-based digital menus and ordering systems. Enhance customer experience, streamline operations, and boost efficiency for your restaurant.',
	keywords: ['QR code menu', 'digital restaurant menu', 'contactless ordering', 'restaurant technology', 'food ordering system'],
	authors: [{ name: 'QR Dine Team' }],
	creator: 'QR Dine',
	publisher: 'QR Dine',
	viewport: 'width=device-width, initial-scale=1',
	robots: 'index, follow',
};

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
				<NextTopLoader
					color='#17a34a'
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					easing='ease'
					speed={200}
					shadow='0 0 10px #17a34a,0 0 5px #17a34a'
				/>
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
