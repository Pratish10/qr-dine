'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterUserSchema } from '@/schemas/schema';
import { type RegisterUserType } from '@/schemas/types';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { register } from '@/actions/user/register';
import { AuthCard } from './auth-card';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import APP_PATHS from '@/config/path.config';
import { Loader2 } from 'lucide-react';
import FormInputField from '../SharedComponent/form-input-field';

export const RegisterForm = (): JSX.Element => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const [isPending, startTransition] = useTransition();

	const form = useForm<RegisterUserType>({
		resolver: zodResolver(RegisterUserSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const submitHandler = (values: RegisterUserType): void => {
		setError('');
		setSuccess('');

		startTransition(() => {
			void register(values).then(res => {
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
			isSocialbutton
			headerLabel='Register'
			cardTitle='Food Ordering System'
			backButtonLabel='Already have an account?'
			backButtonTo={APP_PATHS.LOGIN}
			HomeLabel='Back To Home'
			toHome={APP_PATHS.HOME}
		>
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormError message={error} />
						<FormSuccess message={success} />
						<FormInputField<RegisterUserType>
							name='name'
							label='Name'
							placeholder='John Doe'
							control={form.control}
							disabled={isPending}
							type='name'
						/>
						<FormInputField<RegisterUserType>
							name='email'
							label='Email'
							placeholder='example@example.com'
							control={form.control}
							disabled={isPending}
							type='email'
						/>
						<FormInputField<RegisterUserType>
							name='password'
							label='Password'
							placeholder='******'
							control={form.control}
							disabled={isPending}
							type='password'
						/>
					</div>
					<Button type='submit' className='w-full' disabled={isPending}>
						{isPending ? (
							<span className='flex items-center'>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Please wait
							</span>
						) : (
							'Register'
						)}
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
};
