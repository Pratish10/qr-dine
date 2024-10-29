'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import APP_PATHS from '@/config/path.config';

const NotFound = (): JSX.Element => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-green-100'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border border-green-300'
			>
				<h1 className='text-4xl font-bold text-green-600'>Oops! Page Not Found</h1>
				<p className='mt-4 text-lg text-gray-700'>It seems we can&apos;t find the page you&apos;re looking for.</p>
				<Link href={APP_PATHS.DASHBOARD}>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={clsx(
							'mt-6 px-4 py-2 text-white bg-green-600 rounded-lg shadow transition duration-300',
							'hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300'
						)}
					>
						Go to Dashboard
					</motion.button>
				</Link>
			</motion.div>
		</div>
	);
};

export default NotFound;
