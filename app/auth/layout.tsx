export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return <div className='h-screen'>{children}</div>;
}
