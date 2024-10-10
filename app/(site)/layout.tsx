import { Navbar } from '@/components/Navbar'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): JSX.Element {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
