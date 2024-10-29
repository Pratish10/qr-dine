'use client';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { DashboardCard } from './dashboard-card';
import { useRecoilValue } from 'recoil';
import { restaurantList } from '@/recoil/restaurant/atom';

const getGreeting = (): 'Good Morning' | 'Good Afternoon' | 'Good Evening' => {
	const hours = new Date().getHours();
	if (hours < 12) {
		return 'Good Morning';
	} else if (hours < 18) {
		return 'Good Afternoon';
	} else {
		return 'Good Evening';
	}
};

export const DashboardPage = (): React.JSX.Element => {
	const { data } = useSession();
	const greeting = getGreeting();
	const restaurantData = useRecoilValue(restaurantList);

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
			className='flex flex-col p-4'
		>
			<h1 className='font-bold text-2xl mb-4'>
				{greeting}, <span className='text-green-600'>{data?.user?.name}</span>
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<DashboardCard title='Total Restaurants' content={restaurantData.length} delay={0.1} />
				<DashboardCard title='Total Menus' content={150} delay={0.2} />
				<DashboardCard title='Total Tables' content={25} delay={0.3} />
			</div>
		</motion.div>
	);
};
