import { type AddCategorySchemaType } from '@/schemas/types';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

export const useAddCategory = (): UseMutationResult<
	void,
	Error,
	{
		category: string[];
		restaurantId: string;
	},
	unknown
> => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (values: AddCategorySchemaType) => {
			await axios.post('/api/category', values);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});
	return mutation;
};
