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
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface AddTableProps extends DefaultTableType {
	isEdit: boolean;
}

export const AddTable = ({ restaurantId, tableNumber, tableQrCode, tableSize, tableStatus, isEdit }: AddTableProps): JSX.Element => {
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

	const downloadsAsPDF = async (): Promise<void> => {
		try {
			const imageElement = document.getElementById('table-qr-code');

			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (imageElement) {
				const canvas = await html2canvas(imageElement);
				const imgData = canvas.toDataURL('image/png');

				// eslint-disable-next-line new-cap
				const pdf = new jsPDF();
				const imgWidth = 190;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;

				pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
				pdf.save(`qr-code-table-${tableNumber}.pdf`);
			}
		} catch (error) {
			toast.error('Failed to download PDF');
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					className='space-y-6 p-6'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
				>
					{isEdit && (
						<Button
							variant='green'
							size='sm'
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={async () => {
								await downloadsAsPDF();
							}}
						>
							Download QR Code
						</Button>
					)}

					{isEdit && (
						<div>
							<Image id='table-qr-code' src={tableQrCode ?? ''} alt='TableQr' width={400} height={400} />
							<div className='mt-2 text-center'>
								<p className='text-sm text-gray-500'>Scan the qr code in order to see the menus</p>
							</div>
						</div>
					)}

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
								) : isEdit ? (
									'Edit Table'
								) : (
									'Add Table'
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
