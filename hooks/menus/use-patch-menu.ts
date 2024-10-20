import { type AddMenuSchemaType } from '@/schemas/types';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

export const usePatchMenu = (): UseMutationResult<
	void,
	Error,
	{
		name: string;
		description: string;
		type: 'Vegeterian' | 'nonVegeterian';
		availability: 'Available' | 'notAvailable';
		category: string;
		amount: string;
		image: string[];
		restaurantId: string;
		isFeatured?: boolean | undefined;
	},
	unknown
> => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (values: AddMenuSchemaType) => {
			await axios.patch('/api/menu', values);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['menus'] });
		},
	});
	return mutation;
};
