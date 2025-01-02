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
import { EarningsChart } from '@/components/Dashboard/EarningsChart';
import { TableStatus } from '@/components/Dashboard/TableStatus';
import { MenuItemCountChart } from '@/components/Dashboard/MenuItemCountChart';
import { dailyEarning, dailyEarningStatus } from '@/recoil/dailyEarning/atom';
import { earnings, earningStatus } from '@/recoil/earnings/atom';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
	const earningsData = useRecoilValue(earnings);
	const earningStat = useRecoilValue(earningStatus);
	const dailyEarnings = useRecoilValue(dailyEarning);

	const resStatus = useRecoilValue(restaurantStatus);
	const catStatus = useRecoilValue(categoryStatus);
	const tabStatus = useRecoilValue(tableStatus);
	const menStatus = useRecoilValue(menuStatus);

	const dailyEarningsStat = useRecoilValue(dailyEarningStatus);

	const isMediumToXL = useMediaQuery('(min-width: 768px) and (max-width: 1535px)');

	const isLoading = [resStatus, catStatus, tabStatus, menStatus].some((item) => item === 'loading');

	const tableData = [
		{
			Vacant: tables.filter((tab) => tab.tableStatus === 'Vacant').length,
			Occupied: tables.filter((tab) => tab.tableStatus === 'Occupied').length,
		},
	];

	const categorizedMenu = categoryList.map((cat) => ({
		id: cat.id,
		name: cat.category,
		itemCount: menus.filter((men) => men.category === cat.category).length ?? 0,
	}));

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
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
							<Skeleton className='h-20' />
							<Skeleton className='h-20' />
							<Skeleton className='h-20' />
							<Skeleton className='h-20' />
							<Skeleton className='h-20' />
						</div>
						<Skeleton className='h-80' />
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							<div className='w-full'>
								<Skeleton className='h-72' />
							</div>
							<div className='w-full'>
								<Skeleton className='h-72' />
							</div>
						</div>
					</>
				) : (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
							<DashboardCard title='Daily Earnings' content={dailyEarnings} icon='dollar' loader={dailyEarningsStat} />
							<DashboardCard title='Total Tables' content={tables.length ?? 0} icon='table' loader={tabStatus} />
							<DashboardCard title='Total Categories' content={categoryList.length ?? 0} icon='category' loader={catStatus} />
							<DashboardCard title='Total Menus' content={menus.length ?? 0} icon='menu' loader={menStatus} />
							<DashboardCard title='Restaurants' content={restaurantData.length ?? 0} icon='restaurant' loader={resStatus} />
						</div>

						<EarningsChart data={earningsData} loader={earningStat} />
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							<div className='w-full'>
								<MenuItemCountChart data={categorizedMenu} />
							</div>
							<div className='w-full'>
								<TableStatus data={tableData} />
							</div>
						</div>
					</>
				)}
			</>
		</motion.div>
	);
};

export default Dashboard;
