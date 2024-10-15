import { type RestaurantType } from '@/app/api/restaurant/route';
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export const useGetRestaurants = (): UseQueryResult<ServerActionReturnType<RestaurantType[]>, Error> => {
	const query = useQuery({
		queryKey: ['restaurants'],
		queryFn: async () => {
			try {
				const response = await axios.get('/api/restaurant');
				return response.data;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
