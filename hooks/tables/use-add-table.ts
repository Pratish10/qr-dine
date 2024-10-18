import { type AddTableSchemaType } from '@/schemas/types';
import { type TableStatus } from '@prisma/client';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

export const useAddTable = (): UseMutationResult<
	void,
	Error,
	{
		tableNumber: string;
		tableStatus: TableStatus;
		tableQrCode: string;
		tableSize: string;
		restaurantId: string;
	},
	unknown
> => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (values: AddTableSchemaType) => {
			await axios.post('/api/table', values);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['tables'] });
		},
	});
	return mutation;
};
