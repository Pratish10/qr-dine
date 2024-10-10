import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { SocialButtons } from './social-buttons'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

interface AuthCardProps {
    children: React.ReactNode
    cardTitle: string
    headerLabel: string
    isSocialbutton?: boolean
    backButtonLabel: string
    backButtonTo: string
    HomeLabel: string
    toHome: string
}

export const AuthCard = ({
    children,
    cardTitle,
    headerLabel,
    isSocialbutton,
    backButtonLabel,
    backButtonTo,
    toHome,
    HomeLabel,
}: AuthCardProps): React.JSX.Element => {
    return (
        <div
            className="flex justify-center items-center"
            style={{ height: 'calc(100vh - 4rem)' }}
        >
            <Card className="w-[500px] shadow-2xl">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <h1 className="text-3xl font-bold">{cardTitle}</h1>
                            <p className="text-muted-foreground text-sm">
                                {headerLabel}
                            </p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {(isSocialbutton ?? false) && (
                    <React.Fragment>
                        <CardContent>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-black px-2 text-muted-foreground text-sm">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        <CardContent>
                            <SocialButtons />
                        </CardContent>
                    </React.Fragment>
                )}
                <CardFooter className="flex justify-center flex-col">
                    <Button variant="link" size="sm" asChild>
                        <Link href={backButtonTo}>{backButtonLabel}</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                        <Link href={toHome}>{HomeLabel}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
