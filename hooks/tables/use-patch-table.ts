import { type AddTableSchemaType } from '@/schemas/types';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

export const usePatchTable = (): UseMutationResult<
	void,
	Error,
	{
		tableNumber: string;
		tableSize: string;
		tableStatus: 'Vacant' | 'Occupied';
		tableQrCode: string;
		restaurantId: string;
	},
	unknown
> => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (values: AddTableSchemaType) => {
			await axios.patch('/api/table', values);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['tables'] });
		},
	});
	return mutation;
};
