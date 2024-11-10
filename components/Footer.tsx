import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import APP_PATHS from '@/config/path.config';

export function Footer(): JSX.Element {
	const date = new Date();

	return (
		<footer className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
				<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
					<div className='space-y-8 xl:col-span-1'>
						<Link href={APP_PATHS.HOME} className='flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-8 w-8 mr-2 text-green-600'
							>
								<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
								<path d='M7 2v20' />
								<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
							</svg>
							<span className='font-bold text-xl text-gray-900 dark:text-gray-100'>QR Dine</span>
						</Link>
						<p className='text-gray-600 dark:text-gray-300 text-base'>
							Revolutionizing the dining experience with QR code-based menus and ordering systems.
						</p>
						<div className='flex space-x-6'>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Facebook</span>
								<Facebook className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Twitter</span>
								<Twitter className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Instagram</span>
								<Instagram className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>LinkedIn</span>
								<Linkedin className='h-6 w-6' />
							</a>
							<a href='' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Email</span>
								<Mail className='h-6 w-6' />
							</a>
						</div>
					</div>
				</div>
				<div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8'>
					<p className='text-base text-gray-400 xl:text-center'>&copy; {date.getFullYear().toString()} QR Dine. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
