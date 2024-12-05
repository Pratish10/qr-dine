import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialButtons } from './social-buttons';
import Link from 'next/link';
import { Button } from '../ui/button';
import React from 'react';

interface AuthCardProps {
	children: React.ReactNode;
	cardTitle?: string;
	headerLabel: string;
	isSocialbutton?: boolean;
	backButtonLabel: string;
	backButtonTo: string;
	HomeLabel?: string;
	toHome?: string;
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
}: AuthCardProps): JSX.Element => {
	return (
		<div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
			<Card className='w-[500px] shadow-2xl'>
				<CardHeader>
					<CardTitle>
						<div className='flex flex-col items-center justify-center space-y-6'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-6 w-6 text-green-600'
							>
								<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
								<path d='M7 2v20' />
								<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
							</svg>
							<h1 className='text-muted-foreground text-xl font-bold'>{headerLabel}</h1>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				{(isSocialbutton ?? false) && (
					<React.Fragment>
						<CardContent>
							<div className='relative'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-300' />
								</div>
								<div className='relative flex justify-center text-sm'>
									<span className='bg-white dark:bg-black px-2 text-muted-foreground text-sm'>Or continue with</span>
								</div>
							</div>
						</CardContent>

						<CardContent>
							<SocialButtons />
						</CardContent>
					</React.Fragment>
				)}
				<CardFooter className='flex justify-center flex-col'>
					<Button variant='link' size='sm' asChild>
						<Link href={backButtonTo}>{backButtonLabel}</Link>
					</Button>
					<Button variant='link' size='sm' asChild>
						<Link href={toHome ?? ''}>{HomeLabel ?? ''}</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
