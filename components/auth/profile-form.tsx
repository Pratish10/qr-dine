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

export const ProfileForm = (): JSX.Element => {
	const [isPending, startTransition] = useTransition();
	const [editForm, setEditForm] = useState<boolean>(false);
	const { update, data } = useSession();
	console.log(data);

	const avatarFallBack = (data?.user?.name ?? 'Unknown')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('');

	const form = useForm<ProfileSchemaType>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: data?.user?.name ?? undefined,
			isTwoFactorEnabled: data?.user?.isTwoFactorEnabled ?? undefined,
		},
	});

	const submitHandler = (values: ProfileSchemaType): void => {
		if (editForm) {
			startTransition(() => {
				void updateUser(values)
					.then(res => {
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
		<div style={{ height: 'calc(100vh - 4rem)' }}>
			<div className='flex justify-end items-center py-4'>
				<Button
					onClick={() => {
						setEditForm(!editForm);
					}}
					variant='outline'
					className='py-2 border border-black'
					disabled={isPending}
				>
					{isPending ? (
						<span className='flex items-center'>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Please wait
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
					<div className='col-span-3 sm:col-span-1 border rounded-md p-4 flex flex-col items-center justify-center relative group'>
						<div className='flex flex-col items-center'>
							<Avatar className='border border-black w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
								<AvatarImage src={data?.user?.image ?? ''} />
								<AvatarFallback>{avatarFallBack}</AvatarFallback>
							</Avatar>
							<div className='mt-2 text-center'>
								<p className='font-bold'>{data?.user?.name ?? 'Unknown'}</p>
								<p className='text-sm text-gray-500'>{data?.user?.email ?? 'Unknown'}</p>
							</div>
						</div>
					</div>

					<div className='col-span-3 sm:col-span-2 border rounded-md p-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 p-3 gap-4'>
							<FormField
								control={form.control}
								name='name'
								disabled={isPending || !editForm}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 p-3 gap-4'>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>Enable 2FA</FormLabel>
											<FormDescription>
												Enable two-factor authentication to add an extra layer of security to your account.
											</FormDescription>
										</div>
										<FormControl>
											<Switch disabled={isPending || !editForm} checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						{/* <div className='flex justify-start mt-4'>
							<Button className='px-0 font-normal bg-transparent' variant='link' size='sm' asChild>
								<Link href={APP_PATHS.RESET_PASSWORD}>Forgot Password?</Link>
							</Button>
						</div> */}
						<div className='flex justify-end my-10'>
							<Button type='submit' disabled={isPending || !editForm}>
								{isPending ? (
									<span className='flex items-center'>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Please wait
									</span>
								) : (
									'Update'
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};
