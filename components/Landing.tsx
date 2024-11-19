'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Utensils, CreditCard, BarChart, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { useRecoilValue } from 'recoil';
import { plans } from '@/recoil/plans/atom';
import { planTypes } from '@prisma/client';
import { createSubscription } from '@/actions/stripe/createSubscription';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export function LandingPage(): JSX.Element {
	const { data } = useSession();
	const planData = useRecoilValue(plans);

	const filteredPlanData = planData.filter((item) => item.type !== planTypes.free);

	const features = [
		{ icon: Smartphone, title: 'QR Code Menus', description: 'Create dynamic QR code menus for each table in your restaurant.' },
		{ icon: Utensils, title: 'Easy Ordering', description: 'Customers can browse and order directly from their smartphones.' },
		{ icon: CreditCard, title: 'Seamless Payments', description: 'Integrate with popular payment gateways for hassle-free transactions.' },
		{ icon: BarChart, title: 'Real-time Analytics', description: "Get insights into your restaurant's performance with detailed analytics." },
	];

	const subscription = async (planType: planTypes): Promise<void> => {
		await createSubscription(planType).catch((err: any) => {
			toast.error(err.message as string);
		});
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950'>
					<div className='container px-4 md:px-6'>
						<motion.div
							className='flex flex-col items-center space-y-4 text-center'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-50'>
									Welcome to <span className='text-green-600'>QR Dine</span>
								</h1>
								<p className='mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl'>
									Revolutionize your dining experience with our QR code-based menu and ordering system.
								</p>
							</div>
							<Link href={APP_PATHS.REGISTER}>
								<Button size='lg' variant='green'>
									Get Started
									<ArrowRight className='h-4 w-4 ml-2' />
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>

				<section id='features' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							Features
						</h2>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
							}}
						>
							{features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, ease: 'easeOut' }}
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
						</motion.div>
					</div>
				</section>

				<section id='how-it-works' className='w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							How It Works
						</h2>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-3 gap-8'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							variants={{
								hidden: { opacity: 0, y: 50 },
								visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
							}}
						>
							{['Scan QR Code', 'Browse & Order', 'Pay & Enjoy'].map((step, index) => (
								<motion.div
									className='flex flex-col items-center text-center'
									key={index}
									variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
									transition={{ duration: 0.6, ease: 'easeOut' }}
								>
									<div className='w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mb-4'>
										{index + 1}
									</div>
									<h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-gray-50'>{step}</h3>
									<p className='text-gray-600 dark:text-gray-300'>
										{index === 0
											? 'Customers scan the QR code on their table'
											: index === 1
												? 'View the menu and place orders directly from their device'
												: 'Complete the payment and enjoy their meal'}
									</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				<section id='pricing' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900'>
					<div className='container px-4 md:px-6'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-gray-50'>
							Pricing
						</h2>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 gap-8'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
							}}
						>
							{filteredPlanData.map((plan) => (
								<motion.div key={plan.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
									<Card className='bg-white dark:bg-gray-800 flex flex-col'>
										<CardHeader>
											<CardTitle className='text-gray-900 dark:text-gray-50'>{plan.name}</CardTitle>
										</CardHeader>
										<CardContent className='flex-grow'>
											<p className='text-4xl font-bold mb-4 text-green-600'>
												₹{plan.price}
												<span className='text-base font-normal'>/month</span>
											</p>
											<ul className='mb-6 space-y-2'>
												{plan.description.map((item, index) => (
													<li className='flex items-center' key={index}>
														<Check className='h-4 w-4 mr-2 text-green-600' />
														<span className='text-gray-600 dark:text-gray-300'>{item}</span>
													</li>
												))}
											</ul>
										</CardContent>
										<CardFooter>
											<Button
												size='sm'
												variant='green'
												className='w-full'
												disabled={data?.user?.plan === plan.type}
												onClick={() => {
													void subscription(plan.type);
												}}
											>
												{data?.user?.plan === plan.type ? 'Subscribed' : 'Get Started'}
											</Button>
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				<section className='w-full py-12 md:py-24 lg:py-32 bg-green-600'>
					<div className='container px-4 md:px-6'>
						<motion.div
							className='flex flex-col items-center space-y-4 text-center'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white'>
								Ready to Transform Your Restaurant?
							</h2>
							<Link href={APP_PATHS.REGISTER}>
								<Button size='lg' variant='outline'>
									Get Started
									<ArrowRight className='h-4 w-4 ml-2' />
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
		</div>
	);
}
