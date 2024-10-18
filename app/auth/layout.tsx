export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return <div className='h-screen bg-gradient-to-r from-green-600 via-green-400 to-green-600'>{children}</div>;
}
