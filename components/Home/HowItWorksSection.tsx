'use client';

import { motion } from 'framer-motion';
import { QrCode, Menu, CreditCard } from 'lucide-react';

const steps = [
	{ icon: QrCode, title: 'Scan QR Code', description: 'Customers scan the QR code on their table' },
	{ icon: Menu, title: 'Browse & Order', description: 'View the menu and place orders directly from their device' },
	{ icon: CreditCard, title: 'Pay & Enjoy', description: 'Complete the payment and enjoy their meal' },
];

export function HowItWorksSection(): JSX.Element {
	return (
		<section id='how-it-works' className='py-20 sm:py-32 bg-green-50 dark:bg-gray-900'>
			<div className='container px-4 md:px-6'>
				<motion.div
					className='mx-auto max-w-2xl md:text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className='font-display text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl'>How It Works</h2>
					<p className='mt-4 text-lg tracking-tight text-gray-600 dark:text-gray-300'>
						QR Dine simplifies the dining experience for both customers and restaurant owners.
					</p>
				</motion.div>
				<motion.div
					className='mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								delayChildren: 0.3,
								staggerChildren: 0.2,
							},
						},
					}}
				>
					<div className='relative'>
						<dl className='grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-3'>
							{steps.map((step, index) => (
								<motion.div
									key={index}
									className='relative flex flex-col items-center'
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									<motion.div
										className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 dark:bg-green-500 text-white'
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<step.icon className='h-8 w-8' />
									</motion.div>
									<dt className='text-lg font-semibold leading-7 text-gray-900 dark:text-white'>{step.title}</dt>
									<dd className='mt-2 text-base leading-7 text-gray-600 dark:text-gray-300 text-center'>{step.description}</dd>
								</motion.div>
							))}
						</dl>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
