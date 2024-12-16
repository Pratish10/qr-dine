'use client';

import { motion } from 'framer-motion';
import { RestaurantSwitcher } from './restaurant-switcher';
import APP_PATHS from '@/config/path.config';

interface DashboardHeaderProps {
	greeting: string;
	userName: string;
}

export function DashboardHeader({ greeting, userName }: DashboardHeaderProps): JSX.Element {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col sm:flex-row justify-between items-center gap-4'
		>
			<div>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
					{greeting}, <span className='text-green-600 dark:text-green-400'>{userName}</span>
				</h1>
				<p className='text-gray-600 dark:text-gray-400 mt-1'>Welcome to your Restaurant Dashboard</p>
			</div>
			<div className='flex flex-col sm:flex-row items-center gap-4'>
				<RestaurantSwitcher />
				<motion.a
					href={APP_PATHS.RESTAURANT}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'
				>
					Add Restaurant
				</motion.a>
			</div>
		</motion.div>
	);
}
