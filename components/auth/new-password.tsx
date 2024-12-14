/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import { NewPasswordSchema } from '@/schemas/schema';
import { type NewPasswordType } from '@/schemas/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { newPassword } from '@/actions/user/new-password';
import { AuthCard } from './auth-card';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import APP_PATHS from '@/config/path.config';
import FormInputField from '../SharedComponent/form-input-field';

export const NewPasswordForm = (): JSX.Element => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, startTransition] = useTransition();

	const searchParams = useSearchParams();
	const token = searchParams.get('token') ?? '';

	const form = useForm<NewPasswordType>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	});

	const submitHandler = (values: NewPasswordType): void => {
		setError('');
		setSuccess('');

		startTransition(() => {
			void newPassword({ values, token }).then((res) => {
				if (res.status) {
					setSuccess(res.message);
				} else {
					setError(res.message);
				}
			});
		});
	};
	return (
		<AuthCard
			headerLabel='QR Dine'
			backButtonTo={APP_PATHS.LOGIN}
			backButtonLabel='Back to Login Page'
			cardTitle='Reset your password'
			HomeLabel='Back To Home'
			toHome={APP_PATHS.HOME}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)} className='space-y-6'>
					<div className='space-y-4'>
						<FormError message={error} />
						<FormSuccess message={success} />
						<FormInputField<NewPasswordType>
							name='password'
							label='New Password'
							placeholder='******'
							control={form.control}
							disabled={isPending}
							type='password'
						/>
					</div>
					<Button size='sm' variant='green' type='submit' className='w-full' disabled={isPending}>
						Reset Password
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
};
