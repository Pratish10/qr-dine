import Link from 'next/link';
import { ThemeSelect } from './theme-select';
import { Button } from '@/components/ui/button';
import APP_PATHS from '@/config/path.config';
import { UserButton } from '@/components/auth/UserButton';
import React from 'react';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import _ from 'lodash';

export const Navbar = async (): Promise<React.JSX.Element> => {
	const user = await getCurrentUser();
	return (
		<nav className='flex items-center border-b-2 h-16'>
			<div className='container flex items-center justify-between h-full'>
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
					<span className='hidden font-bold sm:inline-block'>QR Dine</span>
				</Link>
				{user === undefined && (
					<nav className='flex items-center justify-center flex-1 space-x-6 text-sm font-medium'>
						<Link href='#features'>Features</Link>
						<Link href='#how-it-works'>How It Works</Link>
						<Link href='#pricing'>Pricing</Link>
					</nav>
				)}

				<div className='flex items-center space-x-4'>
					<ThemeSelect />
					{user === undefined ? (
						<React.Fragment>
							<Link href={APP_PATHS.LOGIN}>
								<Button variant='green'>Login</Button>
							</Link>
							<Link href={APP_PATHS.REGISTER}>
								<Button variant='green'>Register</Button>
							</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<UserButton />
							<div className='hidden md:flex flex-col justify-center items-start'>
								<p>{user?.name}</p>
								<p className='text-slate-600 text-xs'>{_.capitalize(user?.plan)}</p>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</nav>
	);
};
