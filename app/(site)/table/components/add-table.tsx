import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddTableSchema } from '@/schemas/schema';
import { type AddTableSchemaType } from '@/schemas/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TableStatus } from '@prisma/client';
import { Link, Loader2 } from 'lucide-react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { type DefaultTableType } from './new-table-sheet';
import { useAddTable } from '@/hooks/tables/use-add-table';
import { toast } from 'sonner';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import FormInputField from '@/components/SharedComponent/form-input-field';
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { usePatchTable } from '@/hooks/tables/use-patch-table';
import { extractTextFromUrl } from '@/lib/utils';

interface AddTableProps extends DefaultTableType {
	isEdit: boolean;
}

export const AddTable = ({ restaurantId, tableNumber, tableQrCode, tableSize, tableStatus, isEdit, id }: AddTableProps): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, startTransition] = useTransition();
	const { mutate: addTable, isPending: isAdding } = useAddTable();
	const { mutate: editTable, isPending: isPatching } = usePatchTable();
	const { onClose } = useTableSheetController();

	const form = useForm<AddTableSchemaType>({
		resolver: zodResolver(AddTableSchema),
		defaultValues: { restaurantId, tableNumber, tableQrCode, tableSize, tableStatus, id },
	});

	const submitHandler = (values: AddTableSchemaType): void => {
		if (isEdit) {
			startTransition(() => {
				editTable(values, {
					onSuccess: () => {
						toast.success('Table Successfully Edited!');
						onClose();
					},
					onError: (error: any) => {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						toast.error(error.response.data.message ?? error.message);
					},
				});
			});
		} else {
			startTransition(() => {
				addTable(values, {
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
		}
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
					<div className='p-4 bg-white shadow-md rounded-lg'>
						<div className='mb-4 text-center'>
							<p className='text-sm text-gray-500'>
								Click the{' '}
								<a
									href={extractTextFromUrl(tableQrCode) ?? ''}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 hover:underline'
								>
									link
								</a>{' '}
								or scan the QR code below to see the menu.
							</p>
						</div>
						<div className='flex justify-center'>
							<Image
								id='table-qr-code'
								src={tableQrCode ?? ''}
								alt='Table QR Code'
								width={400}
								height={400}
								className='rounded-lg shadow-md'
							/>
						</div>
					</div>
				)}

				<div className='space-y-4'>
					<FormInputField<AddTableSchemaType>
						name='tableNumber'
						control={form.control}
						disabled={isAdding || isPatching}
						label='Enter Table Number'
						type='text'
						placeholder='Enter table Number'
					/>
					<FormInputField<AddTableSchemaType>
						name='tableSize'
						control={form.control}
						disabled={isAdding || isPatching}
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
									<Select onValueChange={field.onChange} disabled={isAdding || isPatching} {...field}>
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
						<Button size='sm' variant='green' type='submit' disabled={isAdding || isPatching}>
							{isAdding || isPatching ? (
								<span className='flex items-center'>
									<Loader2 className='h-4 w-4 animate-spin' />
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
	);
};
