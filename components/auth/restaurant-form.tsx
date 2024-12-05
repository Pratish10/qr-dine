'use client';
import { RestaurantSchema } from '@/schemas/schema';
import { type RestaurantSchemaType } from '@/schemas/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createRestaurant } from '@/actions/restaurant/create-restaurant';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';
import FormInputField from '@/components/SharedComponent/form-input-field';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { restaurantList } from '@/recoil/restaurant/atom';
import { useSetRecoilState } from 'recoil';
import { type RestaurantType } from '@/app/api/restaurant/route';

export const RestaurantForm = (): JSX.Element => {
	const { data } = useSession();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const setRestaurantList = useSetRecoilState(restaurantList);

	const form = useForm<RestaurantSchemaType>({
		resolver: zodResolver(RestaurantSchema),
		defaultValues: {
			fullName: '',
			branchName: '',
			address: '',
			pinCode: '',
			city: '',
			country: '',
			state: '',
			userId: data?.user?.id ?? undefined,
			upiID: '',
			clientName: '',
		},
	});

	const submitHandler = (values: RestaurantSchemaType): void => {
		startTransition(() => {
			void createRestaurant(values).then((res) => {
				if (res.status) {
					const resData = res.data as RestaurantType;
					toast.success(res.message);
					const newRestaurant: RestaurantType = {
						id: resData.id,
						restaurantId: resData.restaurantId,
						fullName: resData.fullName,
						branchName: resData.branchName,
						createdAt: resData.createdAt,
						updatedAt: resData.updatedAt,
						userId: resData.userId,
						ClientName: resData.ClientName,
					};

					setRestaurantList((prevList: any) => [...prevList, newRestaurant]);
					router.push(APP_PATHS.DASHBOARD);
				} else {
					toast.error(res.message);
				}
			});
		});
	};

	return (
		<Form {...form}>
			<form
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onSubmit={form.handleSubmit(submitHandler)}
				className='space-y-4'
			>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<FormInputField<RestaurantSchemaType>
						name='fullName'
						label='Restaurant Name'
						placeholder='Restaurant Name'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
					<FormInputField
						name='branchName'
						label='Branch Name'
						placeholder='Branch Name'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
				</div>
				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Restaurant Address</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Address'
									className='w-full p-2 border rounded-md disabled:opacity-50'
									rows={4}
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<FormInputField<RestaurantSchemaType>
						name='clientName'
						label='Name'
						placeholder='Enter your name'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
					<FormInputField<RestaurantSchemaType>
						name='upiID'
						label='UPI ID'
						placeholder='Enter your upi id'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
				</div>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<FormInputField<RestaurantSchemaType>
						name='pinCode'
						label='Pin Code'
						placeholder='Pin Code'
						control={form.control}
						disabled={isPending}
						type='number'
					/>
					<FormInputField<RestaurantSchemaType>
						name='city'
						label='City'
						placeholder='City'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
				</div>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<FormInputField<RestaurantSchemaType>
						name='state'
						label='State'
						placeholder='State'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
					<FormInputField<RestaurantSchemaType>
						name='country'
						label='Country'
						placeholder='Country'
						control={form.control}
						disabled={isPending}
						type='text'
					/>
				</div>

				<div className='flex justify-end'>
					<Button size='sm' type='submit' disabled={isPending}>
						{isPending ? (
							<span className='flex items-center'>
								<Loader2 className='h-4 w-4 animate-spin' />
							</span>
						) : (
							'Submit'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
