'use client';

import APP_PATHS from '@/config/path.config';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { useGetMenus } from '@/hooks/menus/use-get-menus';
import { useGetOrders } from '@/hooks/orders/use-get-orders';
import { useGetRestaurants } from '@/hooks/restaurants/use-get-restaurants';
import { useGetTables } from '@/hooks/tables/use-get-table';
import { restaurant, restaurantList } from '@/recoil/restaurant/atom';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface AuthenticatedLayoutProps {
	children: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps): JSX.Element => {
	const router = useRouter();
	const pathName = usePathname();
	const restaurantData = useRecoilValue(restaurantList);
	const { id } = useRecoilValue(restaurant);

	const { data: resData, isLoading: isRestaurantsLoading, isSuccess: isRestaurantsSuccess } = useGetRestaurants();

	useEffect(() => {
		if (isRestaurantsSuccess && (!restaurantData || restaurantData.length === 0)) {
			router.push(APP_PATHS.RESTAURANT);
		}
	}, [isRestaurantsSuccess, restaurantData, router]);

	useGetMenus(id ?? '');
	useGetCategories(id ?? '');
	useGetTables(id ?? '');
	useGetOrders(id ?? '');

	useEffect(() => {
		if (isRestaurantsSuccess && restaurantData?.length === 0) {
			router.push(APP_PATHS.RESTAURANT);
		}
	}, [isRestaurantsSuccess, resData, router]);

	if (isRestaurantsLoading) {
		return (
			<div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
				<Loader2 className='h-8 w-8 animate-spin' />
			</div>
		);
	}

	return <div className={clsx(pathName !== '/' && 'container')}>{children}</div>;
};

export default AuthenticatedLayout;
