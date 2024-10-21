/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import FormInputField from '@/components/SharedComponent/form-input-field';
import { AddMenuSchema } from '@/schemas/schema';
import { type AddMenuSchemaTypeWithOptionalId, type AddMenuSchemaType } from '@/schemas/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Availability, MenuType } from '@prisma/client';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from '@/components/ui/command';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, CircleX, Loader2 } from 'lucide-react';
import { type FileState, MultiFileDropzone } from './multiFileDropZone';
import { useEdgeStore } from '@/lib/edgestore';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAddMenu } from '@/hooks/menus/use-add-menu';
import { type DefaultMenuType } from './new-menu-sheet';
import { useRecoilValue } from 'recoil';
import { categories } from '@/recoil/categories/atom';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';
import Image from 'next/image';
import { usePatchMenu } from '@/hooks/menus/use-patch-menu';

interface AddMenuProps extends DefaultMenuType {
	isEdit: boolean;
}

export const AddMenu = ({
	amount,
	availability,
	category,
	description,
	image,
	isFeatured,
	name,
	restaurantId,
	type,
	isEdit,
	id,
}: AddMenuProps): JSX.Element => {
	const { onClose } = useMenuSheetController();
	const cat = useRecoilValue(categories);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, startTransition] = useTransition();
	const [fileStates, setFileStates] = useState<FileState[]>([]);
	const { edgestore } = useEdgeStore();
	const { mutate: addMenu, isPending: isAdding } = useAddMenu();
	const { mutate: patchMenu, isPending: isPatching } = usePatchMenu();
	const [editor, setEditor] = useState<boolean>(isEdit);
	const [images, setImages] = useState<string[]>(image ?? []);

	function updateFileProgress(key: string, progress: FileState['progress']): void {
		setFileStates((fileStates) => {
			const newFileStates = structuredClone(fileStates);
			const fileState = newFileStates.find((fileState) => fileState.key === key);
			if (fileState) {
				fileState.progress = progress;
			}
			return newFileStates;
		});
	}

	const form = useForm<AddMenuSchemaType>({
		resolver: zodResolver(AddMenuSchema),
		defaultValues: {
			amount,
			availability,
			category,
			description,
			image: images,
			isFeatured,
			name,
			restaurantId,
			type,
		},
	});

	useEffect(() => {
		if (images.length === 0) {
			setEditor(false);
		}
		form.setValue('image', images);
	}, [images.length]);

	const submitHandler = (values: AddMenuSchemaTypeWithOptionalId): void => {
		if (!editor) {
			startTransition(() => {
				addMenu(values, {
					onSuccess: () => {
						toast.success('Menu Successfully Added!');
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
				patchMenu(
					{ ...values, id },
					{
						onSuccess: () => {
							toast.success('Menu Successfully Added!');
							onClose();
						},
						onError: (error: any) => {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
							toast.error(error.response.data.message ?? error.message);
						},
					}
				);
			});
		}
	};

	const onDeleteImage = async (imgUrl: string): Promise<void> => {
		const updatedImages = images.filter((item) => item !== imgUrl);
		setImages(updatedImages);
		await edgestore.publicFiles.delete({
			url: imgUrl,
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 p-6'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onSubmit={form.handleSubmit(submitHandler)}
			>
				<div className='space-y-4'>
					{editor ? (
						<div>
							{images.map((item, index) => (
								<div key={index} className='relative'>
									<span
										className='absolute top-0 right-0'
										onClick={() => {
											void onDeleteImage(item);
										}}
									>
										<CircleX className='cursor-pointer bg-white rounded-full text-black' size={35} />
									</span>
									<Image src={item} alt={item} width={400} height={400} />
								</div>
							))}
						</div>
					) : (
						<FormField
							control={form.control}
							name='image'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<MultiFileDropzone
											value={fileStates}
											onChange={(files) => {
												setFileStates(files);
											}}
											onFilesAdded={async (addedFiles) => {
												await Promise.all(
													addedFiles.map(async (addedFileState) => {
														try {
															const res = await edgestore.publicFiles.upload({
																file: addedFileState.file,
																onProgressChange: async (progress) => {
																	updateFileProgress(addedFileState.key, progress);
																	if (progress === 100) {
																		await new Promise((resolve) => setTimeout(resolve, 1000));
																		updateFileProgress(addedFileState.key, 'COMPLETE');
																	}
																},
															});
															const currentImages = form.getValues('image') || [];

															form.setValue('image', [...currentImages, res.url]);
														} catch (err) {
															updateFileProgress(addedFileState.key, 'ERROR');
														}
													})
												);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<FormInputField<AddMenuSchemaType>
						name='name'
						label='Dish Name'
						placeholder='Enter dish name'
						control={form.control}
						disabled={isAdding || isPatching}
						type='text'
					/>
					<FormInputField<AddMenuSchemaType>
						name='amount'
						label='Price'
						placeholder='Enter price in INR'
						control={form.control}
						disabled={isAdding || isPatching}
						type='number'
					/>

					{/* Category Select with Popover */}
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Category</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='outline'
												role='combobox'
												className={cn('w-[250px] justify-between', !field.value && 'text-muted-foreground')}
											>
												{field.value ? cat.find((item) => item.value === field.value)?.label : 'Select category'}
												<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-[250px] p-0 z-[9999]'>
										<Command>
											<CommandInput placeholder='Search category...' />
											<CommandList>
												<CommandEmpty>No category found.</CommandEmpty>
												<CommandGroup>
													{cat.map((item) => (
														<CommandItem
															value={item.label}
															key={item.value}
															onSelect={() => {
																form.setValue('category', item.value);
															}}
														>
															<Check
																className={cn(
																	'mr-2 h-4 w-4',
																	item.value === field.value ? 'opacity-100' : 'opacity-0'
																)}
															/>
															{item.label}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Dish Type */}
					<FormField
						control={form.control}
						name='type'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dish Type</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} disabled={isAdding || isPatching} {...field}>
										<SelectTrigger className='w-[200px]'>
											<SelectValue placeholder='Select a type' />
										</SelectTrigger>
										<SelectContent className='z-[9999]'>
											<SelectGroup>
												<SelectLabel>Type</SelectLabel>
												<SelectItem value={MenuType.Vegeterian}>Vegeterian</SelectItem>
												<SelectItem value={MenuType.nonVegeterian}>Non Vegeterian</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Availability */}
					<FormField
						control={form.control}
						name='availability'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Availability</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} disabled={isAdding || isPatching} {...field}>
										<SelectTrigger className='w-[200px]'>
											<SelectValue placeholder='Select availability' />
										</SelectTrigger>
										<SelectContent className='z-[9999]'>
											<SelectGroup>
												<SelectItem value={Availability.Available}>Available</SelectItem>
												<SelectItem value={Availability.notAvailable}>Not Available</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description  */}
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dish Description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder='Enter Dish Description'
										className='w-full p-2 border rounded-md disabled:opacity-50'
										rows={4}
										disabled={isAdding || isPatching}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Submit Button */}
				<div className='flex justify-end pt-4'>
					<Button variant='green' type='submit' disabled={isAdding || isPatching}>
						{isAdding || isPatching ? (
							<span className='flex items-center'>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Please wait
							</span>
						) : editor ? (
							'Edit Menu'
						) : (
							'Add Menu'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
