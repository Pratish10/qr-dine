/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import Link from 'next/link';
import { ThemeSelect } from './theme-select';
import { Button } from '@/components/ui/button';
import APP_PATHS from '@/config/path.config';
import { UserButton } from '@/components/auth/UserButton';
import React, { useState } from 'react';
import _ from 'lodash';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { DialogBox } from './DialogBox';
import { signOut } from 'next-auth/react';
import useScroll from '@/hooks/use-scroll';

const linkVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

const NavLink = ({
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
		variants={linkVariants}
		initial='initial'
		animate='animate'
		exit='exit'
		transition={{ duration: 0.3, delay }}
		className={clsx('hover:underline transition-all duration-200 hover:text-green-600 cursor-pointer', className)}
	>
		<Link href={href} onClick={onClick}>
			{label}
		</Link>
	</motion.div>
);

export const renderBrand = (): JSX.Element => (
	<Link href={APP_PATHS.HOME} className='flex items-center space-x-3'>
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
		<span className='font-bold'>QR Dine</span>
	</Link>
);

export const Navbar = (): JSX.Element => {
	const user = useCurrentUser();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const isSmallScreen = useMediaQuery('(max-width: 1024px)');
	const { setTheme, theme } = useTheme();
	const size = useScroll();

	return (
		<nav
			className={clsx(
				'flex items-center h-14 fixed top-0 left-0 w-full z-10',
				size.scrollY > 100 && 'dark:bg-black bg-white border-b-2 dark:border-b-gray-600'
			)}
		>
			<div className='container flex items-center justify-between h-full'>
				{renderBrand()}
				{isSmallScreen ? (
					<Button
						size='icon'
						variant='link'
						onClick={() => {
							if (isSmallScreen) {
								setIsMenuOpen(!isMenuOpen);
							}
						}}
					>
						{isMenuOpen ? <X /> : <Menu />}
					</Button>
				) : (
					<>
						{user === undefined && (
							<nav className='flex items-center justify-center flex-1 space-x-6 text-sm font-medium'>
								<NavLink
									href={APP_PATHS.HOME + '#features'}
									label='Features'
									onClick={() => {
										if (isSmallScreen) {
											setIsMenuOpen(!isMenuOpen);
										}
									}}
									delay={0.1}
								/>
								<NavLink
									href={APP_PATHS.HOME + '#how-it-works'}
									label='How It Works'
									onClick={() => {
										if (isSmallScreen) {
											setIsMenuOpen(!isMenuOpen);
										}
									}}
									delay={0.2}
								/>
								<NavLink
									href={APP_PATHS.HOME + '#pricing'}
									label='Pricing'
									onClick={() => {
										if (isSmallScreen) {
											setIsMenuOpen(!isMenuOpen);
										}
									}}
									delay={0.3}
								/>
							</nav>
						)}

						<div className='flex items-center space-x-4'>
							<ThemeSelect />
							{user === undefined ? (
								<>
									<Link href={APP_PATHS.LOGIN}>
										<Button variant='green'>Login</Button>
									</Link>
									<Link href={APP_PATHS.REGISTER}>
										<Button variant='green'>Register</Button>
									</Link>
								</>
							) : (
								<>
									<UserButton />
									<div className='hidden md:flex flex-col justify-center items-start'>
										<p>{user?.name}</p>
										<p className='text-slate-600 text-xs'>{_.capitalize(user?.plan)}</p>
									</div>
								</>
							)}
						</div>
					</>
				)}
			</div>
			<Sheet
				onOpenChange={() => {
					if (isSmallScreen) {
						setIsMenuOpen(!isMenuOpen);
					}
				}}
				open={isMenuOpen}
			>
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle className='my-4'>{renderBrand()}</SheetTitle>
						<SheetDescription className='text-start'>
							<NavLink
								href={APP_PATHS.HOME + '#features'}
								label='Features'
								onClick={() => {
									if (isSmallScreen) {
										setIsMenuOpen(!isMenuOpen);
									}
								}}
								delay={0.1}
								className='text-3xl'
							/>
							<NavLink
								href={APP_PATHS.HOME + '#how-it-works'}
								label='How It Works'
								onClick={() => {
									if (isSmallScreen) {
										setIsMenuOpen(!isMenuOpen);
									}
								}}
								delay={0.2}
								className='text-3xl'
							/>
							<NavLink
								href={APP_PATHS.HOME + '#pricing'}
								label='Pricing'
								onClick={() => {
									if (isSmallScreen) {
										setIsMenuOpen(!isMenuOpen);
									}
								}}
								delay={0.3}
								className='text-3xl'
							/>
							{user && (
								<NavLink
									href={APP_PATHS.PROFILE}
									label='Profile'
									onClick={() => {
										if (isSmallScreen) {
											setIsMenuOpen(!isMenuOpen);
										}
									}}
									delay={0.4}
									className='text-3xl'
								/>
							)}

							<motion.div
								variants={linkVariants}
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
									variants={linkVariants}
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
		</nav>
	);
};
