'use client';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { restaurantList, restaurantStatus } from '@/recoil/restaurant/atom';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { tableList, tableStatus } from '@/recoil/tables/atom';
import { menuList, menuStatus } from '@/recoil/menus/atom';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardHeader } from '@/components/Dashboard/dashboard-header';
import { DashboardCard } from '@/components/Dashboard/dashboard-card';

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

const Dashboard = (): JSX.Element => {
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
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col gap-6 p-6'
		>
			<>
				<DashboardHeader greeting={greeting} userName={data?.user?.name ?? ''} />
				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
						<Skeleton className='h-20' />
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<DashboardCard title='Total Restaurants' content={restaurantData.length ?? 0} icon='restaurant' />
						<DashboardCard title='Total Menus' content={menus.length ?? 0} icon='menu' />
						<DashboardCard title='Total Tables' content={tables.length ?? 0} icon='table' />
						<DashboardCard title='Total Categories' content={categoryList.length ?? 0} icon='category' />
					</div>
				)}
			</>
		</motion.div>
	);
};

export default Dashboard;
