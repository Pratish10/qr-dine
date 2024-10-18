import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddTableSchema } from '@/schemas/schema';
import { type AddTableSchemaType } from '@/schemas/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TableStatus } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { type DefaultTableType } from './new-table-sheet';
import { useAddTable } from '@/hooks/tables/use-add-table';
import { toast } from 'sonner';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import FormInputField from '@/components/SharedComponent/form-input-field';

export const AddTable = ({ restaurantId, tableNumber, tableQrCode, tableSize, tableStatus }: DefaultTableType): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, startTransition] = useTransition();
	const { mutate, isPending } = useAddTable();
	const { onClose } = useTableSheetController();

	const form = useForm<AddTableSchemaType>({
		resolver: zodResolver(AddTableSchema),
		defaultValues: { restaurantId, tableNumber, tableQrCode, tableSize, tableStatus },
	});

	const submitHandler = (values: AddTableSchemaType): void => {
		startTransition(() => {
			mutate(values, {
				onSuccess: () => {
					toast.success('Table Successfully Added!');
					onClose();
				},
				onError: (error: any) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					toast.error(error.response.data.message ?? error.message);
				},
			});
		});
	};

	return (
		<>
			<Form {...form}>
				<form
					className='space-y-6 p-6'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
				>
					{/* <div className='col-span-3 sm:col-span-1 border rounded-md p-4 flex flex-col items-center justify-center relative group'>
						<div className='flex flex-col items-center'>
							<Image src={table?.tableQrCode ?? ''} alt='TableQr' width='400' height='400' />
							<div className='mt-2 text-center'>
								<p className='text-sm text-gray-500'>Scan the qr code in order to see the menus</p>
							</div>
						</div>
					</div> */}

					<div className='space-y-4'>
						<FormInputField<AddTableSchemaType>
							name='tableNumber'
							control={form.control}
							disabled={isPending}
							label='Enter Table Number'
							type='text'
							placeholder='Enter table Number'
						/>
						<FormInputField<AddTableSchemaType>
							name='tableSize'
							control={form.control}
							disabled={isPending}
							label='Table Size'
							type='text'
							placeholder='Enter Size of Table'
						/>

						<FormField
							control={form.control}
							name='tableStatus'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Table Status</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} disabled={isPending} {...field}>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Change TAble Status' />
											</SelectTrigger>
											<SelectContent className='z-[9999]'>
												<SelectGroup>
													<SelectLabel>Table Status</SelectLabel>
													<SelectItem value={TableStatus.Vacant}>Vacant</SelectItem>
													<SelectItem value={TableStatus.Occupied}>Occupied</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end pt-4'>
							<Button variant='green' type='submit' disabled={isPending}>
								{isPending ? (
									<span className='flex items-center'>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Please wait
									</span>
								) : (
									'Add'
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
