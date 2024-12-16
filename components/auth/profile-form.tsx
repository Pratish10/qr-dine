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
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Switch } from '@/components/ui/switch';
import { updateUser } from '@/actions/user/update-user';
import { motion } from 'framer-motion';
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
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='h-[calc(100vh-4rem)]'
		>
			<div className='flex justify-end items-center py-4'>
				<Button
					size='sm'
					onClick={() => {
						setEditForm(!editForm);
					}}
					variant='outline'
					className='py-2 border border-black'
					disabled={isPending}
				>
					{isPending ? (
						<span className='flex items-center'>
							<Loader2 className='h-4 w-4 animate-spin' />
						</span>
					) : (
						'Edit'
					)}
				</Button>
			</div>

			<Form {...form}>
				<form
					className='grid grid-cols-3 gap-4'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
				>
					<div className='col-span-3 sm:col-span-1 border rounded-md p-4 flex flex-col items-center justify-center relative group dark:bg-gray-900'>
						<div className='flex flex-col items-center'>
							<Avatar className='border border-black w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
								<AvatarImage src={data?.user?.image ?? ''} />
								<AvatarFallback>{avatarFallBack}</AvatarFallback>
							</Avatar>
							<div className='mt-2 text-center'>
								<p className='font-bold'>{data?.user?.name ?? 'Unknown'}</p>
								<p className='text-sm text-gray-500'>{data?.user?.email ?? 'Unknown'}</p>
								<p className='text-sm text-gray-500'>{_.capitalize(data?.user?.plan) ?? 'Unknown'}</p>
							</div>
						</div>
					</div>

					<div className='col-span-3 sm:col-span-2 border rounded-md p-4 dark:bg-gray-900'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-3'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} disabled={isPending || !editForm} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-3'>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex items-center justify-between p-3 border rounded-lg'>
										<div className='space-y-0.5'>
											<FormLabel>Enable 2FA</FormLabel>
											<FormDescription>Enable two-factor authentication for extra security.</FormDescription>
										</div>
										<FormControl>
											<Switch disabled={isPending || !editForm} checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className='flex justify-end mt-10'>
							<Button size='sm' variant='green' type='submit' disabled={isPending || !editForm}>
								{isPending ? (
									<span className='flex items-center'>
										<Loader2 className='h-4 w-4 animate-spin' />
									</span>
								) : (
									'Update'
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</motion.div>
	);
};
