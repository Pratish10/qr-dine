/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import APP_PATHS from '@/config/path.config';
import { UserButton } from './auth/UserButton';
import _ from 'lodash';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DialogBox } from './DialogBox';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }): JSX.Element => (
	<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
		<Link
			href={href}
			onClick={onClick}
			className='text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors'
		>
			{label}
		</Link>
	</motion.div>
);

const NavLinkMobile = ({
	href,
	label,
	onClick,
	delay = 0.1,
	className,
}: {
	href: string;
	label: string;
	className?: string;
	onClick?: () => void;
	delay?: number;
}): JSX.Element => (
	<motion.div
		initial='initial'
		animate='animate'
		exit='exit'
		transition={{ duration: 0.3, delay }}
		className={clsx('hover:underline transition-all duration-200 hover:text-green-600 cursor-pointer text-3xl', className)}
	>
		<Link href={href} onClick={onClick}>
			{label}
		</Link>
	</motion.div>
);

export const Navbar = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const { theme, setTheme } = useTheme();
	const user = useCurrentUser();
	const [scrolled, setScrolled] = useState(false);
	const pathName = usePathname();

	useEffect(() => {
		const handleScroll = (): void => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleMenu = (): void => {
		setIsOpen(!isOpen);
	};

	return (
		<motion.nav
			className={clsx(
				scrolled || pathName === APP_PATHS.RESTAURANT ? 'bg-white dark:bg-gray-900 shadow-lg' : 'bg-transparent',
				'fixed w-full z-50 transition-all duration-300'
			)}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<Link href={APP_PATHS.HOME} className='flex items-center space-x-2'>
						<motion.svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-8 w-8 text-green-600'
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.5 }}
						>
							<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
							<path d='M7 2v20' />
							<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
						</motion.svg>
						<span className='font-bold text-xl text-gray-900 dark:text-white'>QR Dine</span>
					</Link>

					<div className='hidden md:flex items-center space-x-4'>
						<NavLink href={`${APP_PATHS.HOME}#features`} label='Features' />
						<NavLink href={`${APP_PATHS.HOME}#how-it-works`} label='How It Works' />
						<NavLink href={`${APP_PATHS.HOME}#pricing`} label='Pricing' />

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								setTheme(theme === 'dark' ? 'light' : 'dark');
							}}
							className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'
						>
							{theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
						</motion.button>
						{user ? (
							<>
								<UserButton />
								<div className='hidden md:flex flex-col justify-center items-start'>
									<p>{user?.name}</p>
									<p className='text-slate-600 text-xs'>{_.capitalize(user?.plan)}</p>
								</div>
							</>
						) : (
							<>
								<Link href={APP_PATHS.LOGIN}>
									<Button size='sm' variant='green'>
										Login
									</Button>
								</Link>
								<Link href={APP_PATHS.REGISTER}>
									<Button size='sm' variant='green'>
										Register
									</Button>
								</Link>
							</>
						)}
					</div>

					<div className='md:hidden'>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={toggleMenu}
							className='text-gray-700 dark:text-gray-200'
						>
							{isOpen ? <X /> : <Menu />}
						</motion.button>
					</div>
				</div>
			</div>

			<Sheet
				onOpenChange={() => {
					setIsOpen(!isOpen);
				}}
				open={isOpen}
			>
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle className='my-4'>
							<Link href={APP_PATHS.HOME} className='flex items-center space-x-2'>
								<motion.svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-8 w-8 text-green-600'
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
									<path d='M7 2v20' />
									<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
								</motion.svg>
								<span className='font-bold text-xl text-gray-900 dark:text-white'>QR Dine</span>
							</Link>
						</SheetTitle>
						<SheetDescription className='text-start'>
							<NavLinkMobile
								href={APP_PATHS.HOME + '#features'}
								label='Features'
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								delay={0.1}
							/>
							<NavLinkMobile
								href={APP_PATHS.HOME + '#how-it-works'}
								label='How It Works'
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								delay={0.2}
							/>
							<NavLinkMobile
								href={APP_PATHS.HOME + '#pricing'}
								label='Pricing'
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								delay={0.3}
							/>
							{user && (
								<NavLinkMobile
									href={APP_PATHS.PROFILE}
									label='Profile'
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									delay={0.4}
								/>
							)}

							<motion.div
								initial='initial'
								animate='animate'
								exit='exit'
								transition={{ duration: 0.3, delay: 0.5 }}
								className='hover:underline transition-all duration-200 hover:text-gray-600 cursor-pointer text-3xl'
								onClick={() => {
									setTheme(theme === 'light' ? 'dark' : 'light');
								}}
							>
								{theme === 'light' ? 'Dark Theme' : 'Light Theme'}
							</motion.div>
							{user && (
								<motion.div
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{ duration: 0.3, delay: 0.6 }}
									className='hover:underline transition-all duration-200 hover:text-red-600 cursor-pointer text-3xl'
									onClick={() => {
										setShowDialog(true);
									}}
								>
									Logout
								</motion.div>
							)}
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
			<DialogBox
				header='Logout'
				content={<React.Fragment>Are you sure you want to logout?</React.Fragment>}
				show={showDialog}
				onClose={() => {
					setShowDialog(false);
				}}
				onAction={() => {
					void (async () => {
						await signOut();
					})();
				}}
				onActionButtonLabel='Logout'
			/>
		</motion.nav>
	);
};
