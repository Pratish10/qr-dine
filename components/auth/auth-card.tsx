/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialButtons } from './social-buttons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useMousePosition } from '@/hooks/useMousePosition';

interface AuthCardProps {
	children: React.ReactNode;
	cardTitle?: string;
	headerLabel: string;
	isSocialButton?: boolean;
	backButtonLabel: string;
	backButtonTo: string;
	HomeLabel?: string;
	toHome?: string;
}

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const logoVariants = {
	hover: { rotate: 360, transition: { duration: 0.5 } },
};

export const AuthCard = ({
	children,
	cardTitle,
	headerLabel,
	isSocialButton,
	backButtonLabel,
	backButtonTo,
	toHome,
	HomeLabel,
}: AuthCardProps): JSX.Element => {
	useMousePosition();
	const { theme } = useTheme();
	return (
		<motion.div
			className='flex justify-center items-center min-h-screen'
			style={{
				background:
					theme === 'dark'
						? 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.15), transparent 80%)'
						: 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(6, 78, 59, 0.15), transparent 80%)',
			}}
		>
			<motion.div initial='hidden' animate='visible' variants={cardVariants}>
				<Card className='w-full max-w-[800px] shadow-2xl bg-white dark:bg-gray-800'>
					<CardHeader>
						<CardTitle>
							<div className='flex flex-col items-center justify-center space-y-6'>
								<motion.svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-12 w-12 text-green-600 dark:text-green-400'
									variants={logoVariants}
									whileHover='hover'
								>
									<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
									<path d='M7 2v20' />
									<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
								</motion.svg>
								<motion.h1
									className='text-2xl font-bold text-gray-800 dark:text-white'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									{headerLabel}
								</motion.h1>
							</div>
						</CardTitle>
						<h1 className='flex flex-col items-center justify-center space-y-6'>{cardTitle}</h1>
					</CardHeader>
					<CardContent>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
							{children}
						</motion.div>
					</CardContent>
					{isSocialButton && (
						<React.Fragment>
							<CardContent>
								<div className='relative'>
									<div className='absolute inset-0 flex items-center'>
										<div className='w-full border-t border-gray-300 dark:border-gray-600' />
									</div>
									<div className='relative flex justify-center text-sm'>
										<span className='bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400'>Or continue with</span>
									</div>
								</div>
							</CardContent>
							<CardContent>
								<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
									<SocialButtons />
								</motion.div>
							</CardContent>
						</React.Fragment>
					)}
					<CardFooter className='flex justify-center flex-col space-y-2'>
						<Button variant='link' size='sm' asChild>
							<Link href={backButtonTo}>{backButtonLabel}</Link>
						</Button>
						{HomeLabel && toHome && (
							<Button variant='link' size='sm' asChild>
								<Link href={toHome}>{HomeLabel}</Link>
							</Button>
						)}
					</CardFooter>
				</Card>
			</motion.div>
		</motion.div>
	);
};
