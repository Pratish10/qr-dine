'use client';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { DashboardCard } from './dashboard-card';
import { useRecoilValue } from 'recoil';
import { restaurantList, restaurantStatus } from '@/recoil/restaurant/atom';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { tableList, tableStatus } from '@/recoil/tables/atom';
import { menuList, menuStatus } from '@/recoil/menus/atom';
import { Skeleton } from '@/components/ui/skeleton';

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
	const restaurantData = useRecoilValue(restaurantList) ?? [];
	const categoryList = useRecoilValue(categories) ?? [];
	const tables = useRecoilValue(tableList) ?? [];
	const menus = useRecoilValue(menuList) ?? [];

	const resStatus = useRecoilValue(restaurantStatus);
	const catStatus = useRecoilValue(categoryStatus);
	const tabStatus = useRecoilValue(tableStatus);
	const menStatus = useRecoilValue(menuStatus);

	const isLoading = [resStatus, catStatus, tabStatus, menStatus].some((item) => item === 'loading');

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
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				{isLoading ? (
					<>
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
					</>
				) : (
					<>
						<DashboardCard title='Total Restaurants' content={restaurantData.length} delay={0.1} />
						<DashboardCard title='Total Menus' content={menus.length} delay={0.2} />
						<DashboardCard title='Total Tables' content={tables.length} delay={0.3} />
						<DashboardCard title='Total Categories' content={categoryList.length} delay={0.4} />
					</>
				)}
			</div>
		</motion.div>
	);
};
