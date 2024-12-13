'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import APP_PATHS from '@/config/path.config';

export function CTASection(): JSX.Element {
	const { data } = useSession();
	return (
		<section className='relative overflow-hidden py-20 sm:py-28 bg-green-600 dark:bg-green-800'>
			<div className='absolute inset-0'>
				<motion.svg
					className='absolute left-full transform translate-x-1/2'
					width={404}
					height={404}
					fill='none'
					viewBox='0 0 404 404'
					aria-hidden='true'
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<defs>
						<pattern id='85737c0e-0916-41d7-917f-596dc7edfa27' x={0} y={0} width={20} height={20} patternUnits='userSpaceOnUse'>
							<rect x={0} y={0} width={4} height={4} className='text-green-500' fill='currentColor' />
						</pattern>
					</defs>
					<rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
				</motion.svg>
				<motion.svg
					className='absolute right-full bottom-0 transform -translate-x-1/2'
					width={404}
					height={404}
					fill='none'
					viewBox='0 0 404 404'
					aria-hidden='true'
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<defs>
						<pattern id='85737c0e-0916-41d7-917f-596dc7edfa27' x={0} y={0} width={20} height={20} patternUnits='userSpaceOnUse'>
							<rect x={0} y={0} width={4} height={4} className='text-green-500' fill='currentColor' />
						</pattern>
					</defs>
					<rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
				</motion.svg>
			</div>
			<div className='container px-4 md:px-6'>
				<motion.div
					className='relative z-10 mx-auto max-w-4xl text-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				>
					<h2 className='font-display text-4xl font-medium tracking-tight text-white sm:text-5xl'>Ready to Transform Your Restaurant?</h2>
					<p className='mt-4 text-lg tracking-tight text-green-100 dark:text-green-200'>
						Join thousands of restaurants already using QR Dine to streamline their operations and enhance customer experience.
					</p>
					<motion.div className='mt-8 flex justify-center' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link href={data !== null ? APP_PATHS.DASHBOARD : APP_PATHS.REGISTER}>
							<Button
								size='lg'
								variant='secondary'
								className='group bg-white text-green-600 hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
							>
								Get Started Today
								<motion.span
									className='ml-2'
									initial={{ x: 0 }}
									animate={{ x: 5 }}
									transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
								>
									<ArrowRight className='h-5 w-5' />
								</motion.span>
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
