/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { earnings, earningStatus } from '@/recoil/earnings/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type EarningsData } from '@/types/data.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetEarnings = (restaurantId: string, date?: string): UseQueryResult<ServerActionReturnType<EarningsData>, Error> => {
	const setStatus = useSetRecoilState(earningStatus);
	const setEarningsData = useSetRecoilState(earnings);

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: [{ restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const queryParams = new URLSearchParams({ id: restaurantId });
				if (date) {
					queryParams.append('date', date);
				}

				const response = await axios.get(`/api/earnings?${queryParams.toString()}`);
				const earningData: EarningsData = response.data?.data;

				if (earningData && !Array.isArray(earningData) && typeof earningData === 'object') {
					setEarningsData(earningData);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<EarningsData>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
