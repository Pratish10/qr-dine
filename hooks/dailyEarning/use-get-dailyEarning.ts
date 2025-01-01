/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { dailyEarning, dailyEarningStatus } from '@/recoil/dailyEarning/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetDailyEarning = (restaurantId: string): UseQueryResult<ServerActionReturnType<string>, Error> => {
	const setDailyEarnings = useSetRecoilState(dailyEarning);
	const setStatus = useSetRecoilState(dailyEarningStatus);

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: [{ restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`/api/dailyEarnings?id=${restaurantId}`);
				const data: string = response.data?.data;

				setDailyEarnings(data);

				setStatus('success');
				return response.data as ServerActionReturnType<string>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
