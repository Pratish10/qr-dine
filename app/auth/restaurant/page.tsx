'use client';
import { RestaurantForm } from '@/components/auth/restaurant-form';
import { getRandomQuote } from '@/utils/quotes';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Restaurant = (): JSX.Element => {
	const quote = getRandomQuote();

	return (
		<div className='min-h-screen flex flex-col lg:flex-row'>
			{/* Left Column - Image and Quote */}
			<motion.div
				className='relative lg:flex flex-col bg-muted w-full lg:w-1/2 h-64 lg:h-screen'
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Image src='/restaurant.jpg' sizes='100vw' fill alt='Restaurant' className='absolute inset-0 w-full h-full object-cover z-10' />

				<div className='relative z-20 flex flex-col justify-end h-full p-6 lg:p-10 bg-gradient-to-t from-black to-transparent'>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
						<blockquote className='space-y-2'>
							<p className='text-sm lg:text-lg text-white dark:text-slate-400 font-semibold italic'>&ldquo;{quote.quote}&rdquo;</p>
							<footer className='text-xs lg:text-sm text-white dark:text-slate-400 font-semibold'>{quote.author}</footer>
						</blockquote>
					</motion.div>
				</div>
			</motion.div>

			{/* Right Column - Restaurant Form */}
			<div className='flex-1 flex items-center justify-center p-4 lg:p-10 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800'>
				<div className='w-full max-w-md'>
					<h1 className='text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white'>Register Restaurant</h1>
					<RestaurantForm />
				</div>
			</div>
		</div>
	);
};

export default Restaurant;
