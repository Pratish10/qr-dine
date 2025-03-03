/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserSchema } from '@/schemas/schema';
import { type LoginUserType } from '@/schemas/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import React, { useState, useTransition } from 'react';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login as LoginAction } from '@/actions/user/login';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { type ServerActionReturnType } from '@/types/api.types';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import FormInputField from '../SharedComponent/form-input-field';

export const LoginForm = (): JSX.Element => {
	const router = useRouter();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

	const [isPending, startTransition] = useTransition();

	const searchParams = useSearchParams();

	const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Another account already exists with the same email address' : '';

	const form = useForm<LoginUserType>({
		resolver: zodResolver(LoginUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const submitHandler = (values: LoginUserType): void => {
		setError('');
		setSuccess('');

		startTransition(() => {
			void LoginAction(values)
				.then((res: ServerActionReturnType) => {
					if (res.status) {
						if (
							res.data &&
							// @ts-expect-error - Ignore TypeScript error for using 'in' on res.data
							'twoFactor' in res.data &&
							res.data.twoFactor
						) {
							setShowTwoFactor(true);
							setSuccess(res.message);
						} else {
							toast.success(res.message);
							// @ts-expect-error - Ignore TypeScript error for using 'in' on res.data
							router.push(res.data.redirectTo as string);
						}
					} else {
						setError(res.message);
					}
				})
				.catch(() => {
					setError('Something Went Wrong!');
				});
		});
	};

	return (
		<AuthCard
			isSocialButton
			headerLabel='Login to QR Dine'
			backButtonLabel="Don't have an account? Register"
			backButtonTo={APP_PATHS.REGISTER}
			HomeLabel='Back to Home'
			toHome={APP_PATHS.HOME}
		>
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(submitHandler)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormError message={error ?? urlError} />
						<FormSuccess message={success} />
						{showTwoFactor && (
							<div className='flex items-center justify-center'>
								<FormField
									control={form.control}
									name='code'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='flex items-center justify-center'>Two Factor Code</FormLabel>
											<FormControl>
												<InputOTP maxLength={6} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
													</InputOTPGroup>
													<InputOTPSeparator />
													<InputOTPGroup>
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
						{!showTwoFactor && (
							<React.Fragment>
								<FormInputField<LoginUserType>
									name='email'
									label='Email'
									placeholder='example@example.com'
									control={form.control}
									disabled={isPending}
									type='email'
								/>
								<FormInputField<LoginUserType>
									name='password'
									label='Password'
									placeholder='******'
									control={form.control}
									disabled={isPending}
									type='password'
								/>
								<div className='flex justify-end'>
									<Button className='px-0 font-normal bg-transparent' variant='link' size='sm' asChild>
										<Link href={APP_PATHS.RESET_PASSWORD} className='text-right'>
											Forgot Password?
										</Link>
									</Button>
								</div>
							</React.Fragment>
						)}
					</div>
					<Button size='sm' variant='green' type='submit' className='w-full' disabled={isPending}>
						{isPending ? (
							<span className='flex items-center'>
								<Loader2 className='h-4 w-4 animate-spin' />
							</span>
						) : showTwoFactor ? (
							'Confirm'
						) : (
							'Login'
						)}
					</Button>
					<Button
						size='sm'
						variant='green'
						className='w-full'
						disabled={isPending}
						onClick={() => {
							form.setValue('email', 'jacklmyntrix16@gmail.com');
							form.setValue('password', 'admin123456');
						}}
					>
						Fill Dummy Credentials
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
};
