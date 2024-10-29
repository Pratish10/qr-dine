/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useCategoryController } from '@/hooks/use-category-controller';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { AddCategorySchema } from '@/schemas/schema';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { type AddCategorySchemaType } from '@/schemas/types';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAddCategory } from '@/hooks/categories/use-add-category';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const CategoryModal = (): JSX.Element => {
	const { isOpen, onClose } = useCategoryController();
	const { id } = useRecoilValue(restaurant);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, startTransition] = useTransition();
	const { mutate, isPending } = useAddCategory();

	const form = useForm<AddCategorySchemaType>({
		resolver: zodResolver(AddCategorySchema),
		defaultValues: {
			category: [],
			restaurantId: id,
		},
	});

	const addCategory = (value: string): void => {
		if (value) {
			const currentCategories = form.getValues('category');
			if (!currentCategories.includes(value)) {
				form.setValue('category', [...currentCategories, value]);
			}
		}
	};

	const handleCategoryInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter' && e.currentTarget.value && e.shiftKey) {
			e.preventDefault();
			addCategory(e.currentTarget.value);
			e.currentTarget.value = '';
		}
	};

	const removeCategory = (index: number): void => {
		const currentCategories = form.getValues('category');
		form.setValue(
			'category',
			currentCategories.filter((_, i) => i !== index)
		);
	};

	const submitHandler = (values: AddCategorySchemaType): void => {
		startTransition(() => {
			mutate(values, {
				onSuccess: () => {
					toast.success('Categories Successfully Added!');
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
		<Dialog open={isOpen} onOpenChange={onClose}>
			<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
				<DialogContent className='w-full'>
					<Form {...form}>
						<form
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onSubmit={form.handleSubmit(submitHandler)}
							className='grid gap-4 py-4'
						>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categories</FormLabel>
										<FormControl>
											<Input
												placeholder='Type category and press Shift + Enter to add'
												onKeyPress={handleCategoryInputKeyPress}
												disabled={isPending}
											/>
										</FormControl>
										<div className='flex flex-wrap gap-2 mt-2'>
											{field.value.map((category, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.9 }}
													transition={{ duration: 0.2 }}
												>
													<Badge className='flex space-x-2 font-light'>
														<span>{category}</span>
														<span
															onClick={() => {
																removeCategory(index);
															}}
															className='text-red-500 cursor-pointer'
														>
															<X size={12} />
														</span>
													</Badge>
												</motion.div>
											))}
										</div>
										<FormMessage />
										<FormDescription>Press Shift + Enter to add categories.</FormDescription>
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type='submit' size={'sm'} variant='green' className='w-full' disabled={isPending}>
									{isPending ? <Loader2 className='h-8 w-8 animate-spin' /> : 'Add Categories'}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</motion.div>
		</Dialog>
	);
};
