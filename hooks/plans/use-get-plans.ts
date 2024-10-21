/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ErrorHandler } from '@/lib/error';
import { plans } from '@/recoil/plans/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Plan } from '@prisma/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetPlans = (): UseQueryResult<ServerActionReturnType<Plan[]>, Error> => {
	const setPlans = useSetRecoilState(plans);
	const query = useQuery({
		queryKey: ['plans'],
		queryFn: async () => {
			try {
				const response = await axios.get('/api/plan');
				setPlans(response.data.data);
				return response.data as ServerActionReturnType<Plan[]>;
			} catch (error: any) {
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
