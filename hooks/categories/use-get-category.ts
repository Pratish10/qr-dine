/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type CategoryType } from '@/app/api/categories/route';
import { ErrorHandler } from '@/lib/error';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetCategories = (restaurantId: string): UseQueryResult<ServerActionReturnType<CategoryType[]>, Error> => {
	const setStatus = useSetRecoilState(categoryStatus);
	const setCategories = useSetRecoilState(categories);

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['categories', { restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`/api/categories?id=${restaurantId}`);
				const categoryData: CategoryType[] = response.data?.data;

				if (Array.isArray(categoryData)) {
					setCategories(categoryData);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<CategoryType[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
