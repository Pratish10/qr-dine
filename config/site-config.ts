import { type Metadata } from 'next';

const TITLE = 'QR Dine | Smart QR Code Menus for Restaurants';
const DESCRIPTION =
	'QR Dine revolutionizes restaurant dining with QR code-based digital menus and ordering systems. Enhance customer experience, streamline operations, and boost efficiency for your restaurant.';

const BASE_URL = 'https://qr-dine.vercel.app';

export const siteConfig: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: '/favicon.ico',
	},
	applicationName: 'QR Dine',
	creator: 'Pratish',
	twitter: {
		creator: '@Pratish1086241',
		title: TITLE,
		description: DESCRIPTION,
		card: 'summary_large_image',
	},
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		siteName: 'QR Dine',
		url: BASE_URL,
		locale: 'en_US',
		type: 'website',
	},
	category: 'Food',
	alternates: {
		canonical: BASE_URL,
	},
	keywords: ['QR code menu', 'digital restaurant menu', 'contactless ordering', 'restaurant technology', 'food ordering system'],
	metadataBase: new URL(BASE_URL),
};
