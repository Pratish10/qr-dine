import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import APP_PATHS from '@/config/path.config';

export function Footer(): JSX.Element {
	const date = new Date();
	return (
		<footer className='bg-gray-50 dark:bg-gray-900'>
			<div className='container px-4 md:px-6 py-12 mx-auto'>
				<div className='sm:flex sm:items-center sm:justify-between'>
					<span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
						© {date.getFullYear().toString()}{' '}
						<Link href={APP_PATHS.HOME} className='hover:underline'>
							QR Dine™
						</Link>
						. All Rights Reserved.
					</span>
					<div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
						<Link
							href='https://www.facebook.com/pratish.ninawe/'
							className='text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
						>
							<Facebook className='w-5 h-5' />
							<span className='sr-only'>Facebook page</span>
						</Link>
						<Link
							href='https://www.instagram.com/pratish.10/'
							className='text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
						>
							<Instagram className='w-5 h-5' />
							<span className='sr-only'>Instagram page</span>
						</Link>
						<Link
							href='https://x.com/Pratish1086241'
							className='text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
						>
							<Twitter className='w-5 h-5' />
							<span className='sr-only'>Twitter page</span>
						</Link>
						<Link
							href='https://www.linkedin.com/in/pratish-ninawe-6199b2220/'
							className='text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
						>
							<Linkedin className='w-5 h-5' />
							<span className='sr-only'>LinkedIn account</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
