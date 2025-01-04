/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { plans } from '@/recoil/plans/atom';
import { useRecoilValue } from 'recoil';
import { type planTypes } from '@prisma/client';
import { createSubscription } from '@/actions/stripe/createSubscription';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';

export function PricingSection(): JSX.Element {
	const router = useRouter();
	const planData = useRecoilValue(plans);
	const { data } = useSession();
	const handleSubscription = async (planType: planTypes): Promise<void> => {
		await createSubscription(planType).catch((err: any) => {
			toast.error(err.message as string);
		});
	};

	const onSubscribeClick = (planType: planTypes): void => {
		if (data) {
			void handleSubscription(planType);
		} else {
			router.push(APP_PATHS.REGISTER);
		}
	};

	return (
		<section id='pricing' className='py-20 sm:py-32 bg-white dark:bg-gray-900'>
			<div className='container px-4 md:px-6'>
				<motion.div
					className='mx-auto max-w-2xl md:text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className='font-display text-3xl tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
						Choose the plan that&apos;s right for you
					</h2>
					<p className='mt-4 text-lg tracking-tight text-gray-600 dark:text-gray-300'>
						We offer flexible pricing options to suit businesses of all sizes.
					</p>
				</motion.div>
				<motion.div
					className='mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 grid grid-cols-1 gap-8 lg:grid-cols-3'
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
					{planData.map((plan) => (
						<motion.div
							key={plan.id}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
						>
							<Card className='flex flex-col h-full overflow-hidden bg-white dark:bg-gray-800 shadow-lg'>
								<CardHeader className='bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-t-lg p-6 mb-6'>
									<CardTitle className='text-2xl font-bold text-white'>{plan.name}</CardTitle>
								</CardHeader>
								<CardContent className='flex-grow'>
									<p className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
										₹{plan.price}
										<span className='text-base font-normal text-gray-600 dark:text-gray-400'>/month</span>
									</p>
									<ul className='space-y-6'>
										{plan.description.map((item, index) => (
											<motion.li
												key={index}
												className='flex items-center'
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
											>
												<Check className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
												<span className='text-gray-600 dark:text-gray-300'>{item}</span>
											</motion.li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Button
										variant='default'
										className='w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
										onClick={() => {
											onSubscribeClick(plan.type);
										}}
										disabled={data?.user?.plan === plan.type}
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
	);
}
