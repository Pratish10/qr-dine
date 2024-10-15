'use client';
import { RestaurantSchema } from '@/schemas/schema';
import { type RestaurantSchemaType } from '@/schemas/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createRestaurant } from '@/actions/restaurant/create-restaurant';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';
import FormInputField from '@/components/SharedComponent/form-input-field';

interface User {
	id: string;
	name: string;
	email: string;
	image: string | null;
	isTwoFactorEnabled: boolean;
}

interface UserButtonType {
	user?: User;
}

export const RestaurantForm = ({ user }: UserButtonType): React.JSX.Element => {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

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
			userId: user?.id,
			// Payment default values
			cardNumber: '',
			expiryDate: '',
			cvv: '',
			accountName: '',
		},
	});

	const submitHandler = (values: RestaurantSchemaType): void => {
		setError('');
		setSuccess('');
		startTransition(() => {
			void createRestaurant(values).then(res => {
				if (res.status) {
					toast.success(res.message);
					router.push(APP_PATHS.DASHBOARD);
				} else {
					setError(res.message);
				}
			});
		});
	};

	const handleNext = (): void => {
		if (step === 1) {
			setStep(2);
		}
	};

	const handlePrevious = (): void => {
		if (step === 2) setStep(1);
	};

	return (
		<Form {...form}>
			<form
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onSubmit={form.handleSubmit(submitHandler)}
				className='space-y-4'
			>
				<FormError message={error} />
				<FormSuccess message={success} />

				{step === 1 && (
					<>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<FormInputField<RestaurantSchemaType>
								name='fullName'
								label='Restaurant Name'
								placeholder='Restaurant Name'
								control={form.control}
								disabled={isPending}
							/>
							<FormInputField
								name='branchName'
								label='Branch Name'
								placeholder='Branch Name'
								control={form.control}
								disabled={isPending}
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
								name='pinCode'
								label='Pin Code'
								placeholder='Pin Code'
								type='number'
								control={form.control}
								disabled={isPending}
							/>
							<FormInputField<RestaurantSchemaType>
								name='city'
								label='City'
								placeholder='City'
								control={form.control}
								disabled={isPending}
							/>
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<FormInputField<RestaurantSchemaType>
								name='state'
								label='State'
								placeholder='State'
								control={form.control}
								disabled={isPending}
							/>
							<FormInputField<RestaurantSchemaType>
								name='country'
								label='Country'
								placeholder='Country'
								control={form.control}
								disabled={isPending}
							/>
						</div>

						{/* Next Button */}
						<div className='flex justify-end'>
							<Button type='button' onClick={handleNext} className='w-1/2' disabled={isPending}>
								Next
							</Button>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<FormInputField<RestaurantSchemaType>
								name='cardNumber'
								label='Card Number'
								placeholder='Card Number'
								type='number'
								control={form.control}
								disabled={isPending}
							/>
							<FormInputField name='expiryDate' label='Expiry Date' placeholder='MM/YY' control={form.control} disabled={isPending} />
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<FormInputField<RestaurantSchemaType>
								name='cvv'
								label='CVV'
								placeholder='CVV'
								type='number'
								control={form.control}
								disabled={isPending}
							/>
							<FormInputField<RestaurantSchemaType>
								name='accountName'
								label='Account Name'
								placeholder='Account Name'
								control={form.control}
								disabled={isPending}
							/>
						</div>

						{/* Previous and Submit buttons */}
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<Button type='button' onClick={handlePrevious} className='w-full' disabled={isPending}>
								Previous
							</Button>
							<Button type='submit' className='w-full' disabled={isPending}>
								Submit
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};
