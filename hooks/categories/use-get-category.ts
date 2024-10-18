/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type CategoryType } from '@/app/api/categories/route';
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCategories = (restaurantId: string): UseQueryResult<ServerActionReturnType<CategoryType[]>, Error> => {
	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['categories', { restaurantId }],
		queryFn: async () => {
			try {
				const response = await axios.get(`/api/categories?id=${restaurantId}`);
				return response.data as ServerActionReturnType<CategoryType[]>;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
