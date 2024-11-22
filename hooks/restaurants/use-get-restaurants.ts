import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { defaultRestaurant, restaurant, restaurantList, restaurantStatus } from '@/recoil/restaurant/atom';
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { type RestaurantType } from '@/app/api/restaurant/route';

export const useGetRestaurants = (): UseQueryResult<ServerActionReturnType<RestaurantType[]>, Error> => {
	const setStatus = useSetRecoilState(restaurantStatus);
	const setRestaurantList = useSetRecoilState(restaurantList);
	const setRestaurant = useSetRecoilState(restaurant);

	const query = useQuery({
		queryKey: ['restaurants'],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get('/api/restaurant');
				const restaurantData: RestaurantType[] = response.data?.data;

				if (Array.isArray(restaurantData)) {
					setRestaurantList(restaurantData);
					setRestaurant(restaurantData[0] ?? defaultRestaurant);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<RestaurantType[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
