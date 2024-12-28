/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { ordersList, orderStatus } from '@/recoil/orders/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Order } from '@prisma/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetOrders = (restaurantId: string): UseQueryResult<ServerActionReturnType<Order[]>, Error> => {
	const setStatus = useSetRecoilState(orderStatus);
	const setOrdersList = useSetRecoilState(ordersList);

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['orders', { restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`/api/orders?id=${restaurantId}`);
				const orderData: Order[] = response.data?.data;

				if (Array.isArray(orderData)) {
					setOrdersList(orderData);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<Order[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
