import { Navbar } from '@/components/Navbar'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): JSX.Element {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div>{children}</div>
        </div>
    )
}
