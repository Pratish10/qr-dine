/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Menu } from '@prisma/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

export const useGetMenus = (restaurantId: string): UseQueryResult<ServerActionReturnType<Menu[]>, Error> => {
	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['menus', { restaurantId }],
		queryFn: async () => {
			try {
				const response = await axios.get(`/api/menu?id=${restaurantId}`);
				return response.data as ServerActionReturnType<Menu[]>;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
