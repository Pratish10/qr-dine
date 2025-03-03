/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { defaultRestaurant, restaurant, restaurantList } from '@/recoil/restaurant/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { type RestaurantType } from '@/app/api/restaurant/route';
import { useGetEarnings } from '@/hooks/earnings/use-get-earnings';
import { useGetMenus } from '@/hooks/menus/use-get-menus';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { useGetTables } from '@/hooks/tables/use-get-table';
import { useGetOrders } from '@/hooks/orders/use-get-orders';
import { useGetDailyEarning } from '@/hooks/dailyEarning/use-get-dailyEarning';

export function RestaurantSwitcher(): JSX.Element {
	const restaurantData = useRecoilValue(restaurantList) ?? [];
	const [open, setOpen] = useState(false);
	const [res, setRes] = useRecoilState(restaurant);
	const { id } = useRecoilValue(restaurant);

	const { refetch: refetchEarnings } = useGetEarnings(id ?? '');
	const { refetch: refetchMenus } = useGetMenus(id ?? '');
	const { refetch: refetchCategories } = useGetCategories(id ?? '');
	const { refetch: refetchTables } = useGetTables(id ?? '');
	const { refetch: refetchOrders } = useGetOrders(id ?? '');
	const { refetch: refetchDailyEarning } = useGetDailyEarning(id ?? '');

	const onSelectRestaurant = (branchName: string): void => {
		const restaurant = restaurantData.find((item: RestaurantType) => item.branchName === branchName);

		if (restaurant && res.branchName !== restaurant.branchName) {
			setRes(restaurant);
		} else {
			setRes(defaultRestaurant);
		}
		setOpen(false);
	};

	useEffect(() => {
		if (id) {
			void refetchEarnings();
			void refetchMenus();
			void refetchCategories();
			void refetchTables();
			void refetchOrders();
			void refetchDailyEarning();
		}
	}, [id]);

	const restaurants = restaurantData?.map((item: RestaurantType) => ({ label: item.fullName, value: item.branchName })) ?? [];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button size='sm' variant='outline' role='combobox' aria-expanded={open} className='w-[300px] justify-between'>
					{res.branchName
						? restaurants.find((item: { value: string; label: string }) => item.value === res.branchName)?.label
						: 'Search by Branch Name...'}

					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[300px] p-0'>
				<Command>
					<CommandInput placeholder='Search by Branch Name...' />
					<CommandList>
						<CommandEmpty>
							<div className='flex justify-center items-center h-[100px]'>No Restaurants found.</div>
						</CommandEmpty>
						<CommandGroup>
							{restaurants.map((item: { value: string; label: string }) => (
								<CommandItem key={item.value} value={item.value} onSelect={onSelectRestaurant}>
									<Check className={cn('mr-2 h-4 w-4', res.branchName === item.value ? 'opacity-100' : 'opacity-0')} />
									<div className='flex flex-col'>
										<h5 className='flex items-center'>
											<strong>Name: </strong>
											<span className='ml-1'>{item.label}</span>
										</h5>
										<p>
											<strong>Branch Name: </strong>
											<span className='ml-1'>{item.value}</span>
										</p>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
