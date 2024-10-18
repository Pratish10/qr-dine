/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type RestaurantType } from '@/app/api/restaurant/route';
import { ErrorHandler } from '@/lib/error';
import { restaurant, restaurantList } from '@/recoil/restaurant/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetRestaurants = (): UseQueryResult<ServerActionReturnType<RestaurantType[]>, Error> => {
	const setDefaultRestaurant = useSetRecoilState(restaurant);
	const setRestaurantList = useSetRecoilState(restaurantList);
	const query = useQuery({
		queryKey: ['restaurants'],
		queryFn: async () => {
			try {
				const response = await axios.get('/api/restaurant');
				setDefaultRestaurant(response.data.data[0]);
				setRestaurantList(response.data.data);
				return response.data as ServerActionReturnType<RestaurantType[]>;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
