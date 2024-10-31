/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Table } from '@prisma/client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { tableList, tableStatus } from '@/recoil/tables/atom';

export const useGetTables = (restaurantId: string): UseQueryResult<ServerActionReturnType<Table[]>, Error> => {
	const setStatus = useSetRecoilState(tableStatus);
	const setTables = useSetRecoilState(tableList);

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['tables', { restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`/api/table?id=${restaurantId}`);
				const tableData: Table[] = response.data?.data;

				if (Array.isArray(tableData)) {
					setTables(tableData);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<Table[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
