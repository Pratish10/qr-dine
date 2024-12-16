'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, RefreshCcw, Search, Coffee, Pizza, Apple, Beef, IceCreamCone } from 'lucide-react';
import APP_PATHS from '@/config/path.config';

const icons = [Search, Coffee, Pizza, Apple, Beef, IceCreamCone];

const NotFound = (): JSX.Element => {
	const [currentIcon, setCurrentIcon] = useState(0);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	const iconVariants = {
		hidden: { scale: 0, rotate: -180 },
		visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
		exit: { scale: 0, rotate: 180 },
	};

	const changeIcon = (): void => {
		setCurrentIcon((prev) => (prev + 1) % icons.length);
	};

	const CurrentIcon = icons[currentIcon];

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12'>
			<motion.div variants={containerVariants} initial='hidden' animate='visible' className='max-w-2xl w-full text-center'>
				<motion.div variants={itemVariants} className='mb-8'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIcon}
							variants={iconVariants}
							initial='hidden'
							animate='visible'
							exit='exit'
							className='mx-auto w-32 h-32 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center'
						>
							<CurrentIcon className='w-16 h-16 text-green-600 dark:text-green-200' />
						</motion.div>
					</AnimatePresence>
				</motion.div>
				<motion.h1 variants={itemVariants} className='text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl'>
					404: Page Not Found
				</motion.h1>
				<motion.p variants={itemVariants} className='mt-4 text-xl text-gray-600 dark:text-gray-300'>
					Oops! Looks like this page is on a lunch break. Maybe it&apos;s enjoying some QR Dine cuisine?
				</motion.p>
				<motion.div variants={itemVariants} className='mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
					<Link href={APP_PATHS.DASHBOARD} passHref>
						<motion.p
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300'
						>
							<Home className='mr-2 h-5 w-5' aria-hidden='true' />
							Back to Dashboard
						</motion.p>
					</Link>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={changeIcon}
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:text-green-200 dark:bg-green-800 dark:hover:bg-green-700 transition-colors duration-300'
					>
						<RefreshCcw className='mr-2 h-5 w-5' aria-hidden='true' />
						Try Another Icon
					</motion.button>
				</motion.div>
				<motion.p variants={itemVariants} className='mt-8 text-sm text-gray-500 dark:text-gray-400'>
					Don&apos;t worry, our chefs are cooking up a solution. In the meantime, why not explore our delicious dashboard?
				</motion.p>
			</motion.div>
		</div>
	);
};

export default NotFound;
