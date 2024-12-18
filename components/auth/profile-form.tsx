'use client';

import { useForm } from 'react-hook-form';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ProfileSchema } from '@/schemas/schema';
import { type ProfileSchemaType } from '@/schemas/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Edit2, Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Switch } from '@/components/ui/switch';
import { updateUser } from '@/actions/user/update-user';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';

export const ProfileForm = (): JSX.Element => {
	const [isPending, startTransition] = useTransition();
	const [editForm, setEditForm] = useState(false);
	const { update, data } = useSession();

	const avatarFallBack = (data?.user?.name ?? 'Unknown')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.join('');

	const form = useForm<ProfileSchemaType>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: data?.user?.name ?? '',
			isTwoFactorEnabled: data?.user?.isTwoFactorEnabled ?? false,
		},
	});

	const submitHandler = (values: ProfileSchemaType): void => {
		if (editForm) {
			startTransition(() => {
				void updateUser(values)
					.then((res) => {
						if (res.status) {
							toast.success(res.message);
							setEditForm(false);
						} else {
							toast.error(res.message);
							setEditForm(false);
						}
					})
					.then(async () => await update());
			});
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className='h-[calc(100vh-4rem)]'
		>
			<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-6 sm:p-10 max-h-[calc(100vh-2rem)] overflow-y-auto'>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Profile</h1>
						<Button
							size='sm'
							onClick={() => {
								setEditForm(!editForm);
							}}
							variant={editForm ? 'destructive' : 'outline'}
							className='relative overflow-hidden group'
						>
							<AnimatePresence mode='wait' initial={false}>
								{editForm ? (
									<motion.span
										key='cancel'
										className='flex items-center'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X className='w-4 h-4 mr-2' />
										Cancel
									</motion.span>
								) : (
									<motion.span
										key='edit'
										className='flex items-center'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Edit2 className='w-4 h-4 mr-2' />
										Edit
									</motion.span>
								)}
							</AnimatePresence>
						</Button>
					</div>

					<Form {...form}>
						<form
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onSubmit={form.handleSubmit(submitHandler)}
							className='space-y-8'
						>
							<div className='flex flex-col sm:flex-row gap-8'>
								<div className='w-full sm:w-1/3'>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className='bg-green-100 dark:bg-green-700 p-6 rounded-xl shadow-md flex flex-col items-center justify-center relative overflow-hidden'
									>
										<Avatar className='w-32 h-32 border-4 border-white dark:border-gray-800 shadow-lg'>
											<AvatarImage src={data?.user?.image ?? ''} />
											<AvatarFallback className='text-3xl font-bold bg-green-500 text-white'>{avatarFallBack}</AvatarFallback>
										</Avatar>
										<h2 className='mt-4 text-xl font-semibold text-gray-800 dark:text-white'>{data?.user?.name ?? 'Unknown'}</h2>
										<p className='text-sm text-gray-500 dark:text-gray-300'>{data?.user?.email ?? 'Unknown'}</p>
										<span className='mt-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full uppercase'>
											{_.capitalize(data?.user?.plan ?? 'Unknown')}
										</span>
									</motion.div>
								</div>

								<div className='w-full sm:w-2/3 space-y-6'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isPending || !editForm}
														className='bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='isTwoFactorEnabled'
										render={({ field }) => (
											<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm'>
												<div className='space-y-0.5'>
													<FormLabel>Two-Factor Authentication</FormLabel>
													<FormDescription>
														Enhance your account security by enabling two-factor authentication.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														disabled={isPending || !editForm}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className='flex justify-end'>
								<Button type='submit' disabled={isPending || !editForm} className='bg-green-500 hover:bg-green-600 text-white'>
									{isPending ? (
										<span className='flex items-center'>
											<Loader2 className='w-4 h-4 mr-2 animate-spin' />
											Updating...
										</span>
									) : (
										<span className='flex items-center'>
											<Check className='w-4 h-4 mr-2' />
											Save Changes
										</span>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</motion.div>
	);
};
