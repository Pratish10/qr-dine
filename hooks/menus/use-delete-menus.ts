import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useDeleteMenu = (): UseMutationResult<void, Error, string[], unknown> => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (values: string[]) => {
			await axios.delete('/api/menu', {
				data: values,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['menus'] });
			toast.success('Successfully deleted records');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			toast.error(error.response.data.message ?? error.message);
		},
	});
	return mutation;
};
