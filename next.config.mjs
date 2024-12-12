/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'files.edgestore.dev',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'quickchart.io',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				pathname: '**',
			},
		],
	},
	async headers() {
		const END_POINT = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CLIENT_URL : 'http://localhost:3001';
		return [
			{
				source: '/api/(.*)',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: END_POINT },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, OPTIONS, PUT, DELETE',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
				],
			},
		];
	},
};

export default nextConfig;
