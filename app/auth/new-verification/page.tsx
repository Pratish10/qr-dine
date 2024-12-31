/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/user/new-verification';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import APP_PATHS from '@/config/path.config';
import { Loader2 } from 'lucide-react';
import { AuthCard } from '@/components/auth/auth-card';
const NewVerification = (): JSX.Element => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const searchParams = useSearchParams();

	const token = searchParams.get('token') ?? '';
	const onSubmit = useCallback(() => {
		if (success ?? error) return;
		if (!token) {
			setError('Token Missing!');
			return;
		}

		newVerification(token)
			.then((res) => {
				if (res.status) {
					setSuccess(res.message);
				} else {
					setError(res.message);
				}
			})
			.catch(() => {
				setError('Something Went Wrong!');
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);
	return (
		<AuthCard
			headerLabel='Confirming your verification'
			backButtonTo={APP_PATHS.LOGIN}
			backButtonLabel='Back to Login Page'
			HomeLabel='Back To Home'
			toHome={APP_PATHS.HOME}
		>
			<div className='flex items-center justify-center w-full'>
				{!success && !error && (
					<div>
						<Loader2 className='h-8 w-8 animate-spin' />
					</div>
				)}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</AuthCard>
	);
};

export default NewVerification;
