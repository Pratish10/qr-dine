'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import { ResetSchema } from '@/schemas/schema';
import { type ResetSchemaType } from '@/schemas/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/actions/user/reset-password';
import { AuthCard } from './auth-card';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import APP_PATHS from '@/config/path.config';
import FormInputField from '../SharedComponent/form-input-field';

export const ResetForm = (): JSX.Element => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, startTransition] = useTransition();

	const form = useForm<ResetSchemaType>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	});

	const submitHandler = (values: ResetSchemaType): void => {
		setError('');
		setSuccess('');

		startTransition(() => {
			void resetPassword(values).then((res) => {
				if (res.status) {
					setSuccess(res.message);
				} else {
					setError(res.message);
				}
			});
		});
	};

	return (
		<AuthCard headerLabel='QR Dine' cardTitle='Reset Password' backButtonLabel='Back' backButtonTo={APP_PATHS.HOME}>
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormError message={error} />
						<FormSuccess message={success} />
						<FormInputField<ResetSchemaType>
							name='email'
							label='Email'
							placeholder='example@example.com'
							control={form.control}
							disabled={isPending}
							type='email'
						/>
					</div>
					<Button size='sm' variant='green' type='submit' className='w-full' disabled={isPending}>
						Send reset email
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
};
