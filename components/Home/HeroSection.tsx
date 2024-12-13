'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Smartphone } from 'lucide-react';
import { useSession } from 'next-auth/react';
import APP_PATHS from '@/config/path.config';

export function HeroSection(): JSX.Element {
	const { data } = useSession();
	return (
		<section className='relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36'>
			<motion.div
				className='container px-4 md:px-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
			>
				<div className='lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20'>
					<div className='relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6'>
						<motion.h1
							className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							Revolutionize Your Dining Experience with{' '}
							<span className='text-green-600 dark:text-green-400 relative'>
								QR Dine
								<motion.span
									className='absolute bottom-0 left-0 w-full h-2 bg-green-400 dark:bg-green-600'
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ delay: 1, duration: 0.8 }}
								/>
							</span>
						</motion.h1>
						<motion.p
							className='mt-6 text-lg text-gray-600 dark:text-gray-300'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.8 }}
						>
							Empower your customers with contactless ordering and seamless payments. Boost efficiency and enhance the dining experience
							with our QR code-based menu system.
						</motion.p>
						<motion.div
							className='mt-8 flex flex-wrap gap-x-6 gap-y-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}
						>
							<Link href={data !== null ? APP_PATHS.DASHBOARD : APP_PATHS.REGISTER}>
								<Button size='lg' variant='default' className='group'>
									Get Started
									<motion.span
										className='ml-2'
										initial={{ x: 0 }}
										whileHover={{ x: 5 }}
										transition={{ type: 'spring', stiffness: 400, damping: 10 }}
									>
										<ArrowRight className='h-5 w-5' />
									</motion.span>
								</Button>
							</Link>
							<Link href='#how-it-works'>
								<Button size='lg' variant='outline'>
									How It Works
								</Button>
							</Link>
						</motion.div>
					</div>
					<div className='relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6'>
						<motion.div
							className='absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0'
							initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
						>
							<svg viewBox='0 0 1026 1026' fill='none' aria-hidden='true' className='absolute inset-0 h-full w-full animate-spin-slow'>
								<path
									d='M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z'
									stroke='#22c55e'
									strokeOpacity='0.7'
								/>
								<path d='M513 1025C230.23 1025 1 795.77 1 513' stroke='url(#:R65m:-gradient-1)' strokeLinecap='round' />
								<defs>
									<linearGradient id=':R65m:-gradient-1' x1='1' y1='513' x2='1' y2='1025' gradientUnits='userSpaceOnUse'>
										<stop stopColor='#4ade80' />
										<stop offset='1' stopColor='#22c55e' stopOpacity='0' />
									</linearGradient>
								</defs>
							</svg>
						</motion.div>
						<motion.div
							className='relative'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
						>
							<div className='relative mx-auto w-[366px] h-[366px] rounded-full bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10'>
								<div className='absolute inset-0 flex items-center justify-center'>
									<Smartphone className='h-32 w-32 text-green-600 dark:text-green-400' />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
