/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Table } from '@prisma/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTables = (id: string): UseQueryResult<ServerActionReturnType<Table[]>, Error> => {
	// const setDefaultRestaurant = useSetRecoilState(restaurant);
	// const setRestaurantList = useSetRecoilState(restaurantList);
	const query = useQuery({
		queryKey: ['tables'],
		queryFn: async () => {
			try {
				const response = await axios.get(`/api/table?id=${id}`);
				// return response.data;
				// setDefaultRestaurant(response.data.data[0]);
				// setRestaurantList(response.data.data);
				return response.data as ServerActionReturnType<Table[]>;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
