'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Utensils, CreditCard, BarChart } from 'lucide-react';

const features = [
	{ icon: Smartphone, title: 'QR Code Menus', description: 'Create dynamic QR code menus for each table in your restaurant.' },
	{ icon: Utensils, title: 'Easy Ordering', description: 'Customers can browse and order directly from their smartphones.' },
	{ icon: CreditCard, title: 'Seamless Payments', description: 'Integrate with popular payment gateways for hassle-free transactions.' },
	{ icon: BarChart, title: 'Real-time Analytics', description: "Get insights into your restaurant's performance with detailed analytics." },
];

export function FeaturesSection(): JSX.Element {
	return (
		<section id='features' className='py-20 sm:py-32'>
			<div className='container px-4 md:px-6'>
				<motion.div
					className='mx-auto max-w-2xl md:text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className='font-display text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
						Everything you need to serve your customers better
					</h2>
					<p className='mt-4 text-lg tracking-tight text-gray-600 dark:text-gray-300'>
						QR Dine provides a comprehensive suite of tools to streamline your restaurant operations and enhance customer experience.
					</p>
				</motion.div>
				<motion.div
					className='mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
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
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Card className='relative overflow-hidden group bg-white dark:bg-gray-800'>
								<CardHeader className='pb-0'>
									<motion.div
										className='absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
										initial={false}
										animate={{ opacity: 0 }}
										whileHover={{ opacity: 0.1 }}
									/>
									<feature.icon className='h-12 w-12 text-green-600 dark:text-green-400 mb-4 relative z-10' />
									<CardTitle className='text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 relative z-10'>
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='mt-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 relative z-10'>
										{feature.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
