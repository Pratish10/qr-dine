'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Utensils, CreditCard, BarChart, Check } from 'lucide-react';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { useTheme } from 'next-themes';

export function LandingPage(): JSX.Element {
	const { theme } = useTheme();

	const features = [
		{ icon: Smartphone, title: 'QR Code Menus', description: 'Create dynamic QR code menus for each table in your restaurant.' },
		{ icon: Utensils, title: 'Easy Ordering', description: 'Customers can browse and order directly from their smartphones.' },
		{ icon: CreditCard, title: 'Seamless Payments', description: 'Integrate with popular payment gateways for hassle-free transactions.' },
		{ icon: BarChart, title: 'Real-time Analytics', description: "Get insights into your restaurant's performance with detailed analytics." },
	];

	return (
		<div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-gray-50'>
									Welcome to <span className='text-green-600'>Food QR Dine</span>
								</h1>
								<p className='mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl'>
									Revolutionize your dining experience with our QR code-based menu and ordering system.
								</p>
							</div>
							<div className='space-x-4'>
								<Link href={APP_PATHS.REGISTER}>
									<Button size='lg' variant='green'>
										Get Started
									</Button>
								</Link>
								<Button
									variant='outline'
									size='lg'
									className='text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-gray-800'
								>
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section id='features' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							Features
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className='h-full bg-white dark:bg-gray-800'>
										<CardHeader>
											<feature.icon className='h-8 w-8 mb-2 text-green-600' />
											<CardTitle className='text-gray-900 dark:text-gray-50'>{feature.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className='text-gray-600 dark:text-gray-300'>{feature.description}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section id='how-it-works' className='w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							How It Works
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<motion.div
								className='flex flex-col items-center text-center'
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div className='w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mb-4'>
									1
								</div>
								<h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-gray-50'>Scan QR Code</h3>
								<p className='text-gray-600 dark:text-gray-300'>Customers scan the QR code on their table</p>
								{/* TODO  add description for steps */}
							</motion.div>
							<motion.div
								className='flex flex-col items-center text-center'
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<div className='w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mb-4'>
									2
								</div>
								<h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-gray-50'>Browse & Order</h3>
								<p className='text-gray-600 dark:text-gray-300'>View the menu and place orders directly from their device</p>
								{/* TODO  add description for steps */}
							</motion.div>
							<motion.div
								className='flex flex-col items-center text-center'
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<div className='w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mb-4'>
									3
								</div>
								<h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-gray-50'>Pay & Enjoy</h3>
								<p className='text-gray-600 dark:text-gray-300'>Complete the payment and enjoy their meal</p>
								{/* TODO  add description for steps */}
							</motion.div>
						</div>
					</div>
				</section>

				<section id='pricing' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							Pricing
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<Card className='bg-white dark:bg-gray-800'>
								<CardHeader>
									<CardTitle className='text-gray-900 dark:text-gray-50'>Starter</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-4xl font-bold mb-4 text-green-600'>
										$29<span className='text-base font-normal'>/month</span>
									</p>
									<ul className='mb-6 space-y-2'>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Up to 50 menu items</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Basic analytics</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Email support</span>
										</li>
									</ul>
									<Button variant='green' className='w-full'>
										Choose Plan
									</Button>
								</CardContent>
							</Card>
							<Card className='bg-white dark:bg-gray-800 border-green-600'>
								<CardHeader>
									<CardTitle className='text-gray-900 dark:text-gray-50'>Pro</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-4xl font-bold mb-4 text-green-600'>
										$79<span className='text-base font-normal'>/month</span>
									</p>
									<ul className='mb-6 space-y-2'>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Unlimited menu items</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Advanced analytics</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Priority support</span>
										</li>
									</ul>
									<Button variant='green' className='w-full'>
										Choose Plan
									</Button>
								</CardContent>
							</Card>
							<Card className='bg-white dark:bg-gray-800'>
								<CardHeader>
									<CardTitle className='text-gray-900 dark:text-gray-50'>Enterprise</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-4xl font-bold mb-4 text-green-600'>Custom</p>
									<ul className='mb-6 space-y-2'>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Custom features</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>Dedicated account manager</span>
										</li>
										<li className='flex items-center'>
											<Check className='h-4 w-4 mr-2 text-green-600' />{' '}
											<span className='text-gray-600 dark:text-gray-300'>24/7 phone support</span>
										</li>
									</ul>
									<Button variant='green' className='w-full'>
										Contact Sales
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section className='w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800 text-white'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Ready to Transform Your Restaurant?</h2>
							<p className='mx-auto max-w-[700px] text-lg md:text-xl text-green-100'>
								Join thousands of restaurants already using Food QR Dine to streamline their operations and enhance customer
								experience.
							</p>
							<div className='w-full max-w-sm space-y-2'>
								<Link href={APP_PATHS.REGISTER}>
									<Button type='submit'>Get Started</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
