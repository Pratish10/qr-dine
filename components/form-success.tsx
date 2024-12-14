/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MdOutlineCheckCircle } from 'react-icons/md';
import { type FC } from 'react';

interface FormSuccessProps {
	message?: string;
}

export const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
	if (!message) return null;

	return (
		<div
			className='p-3 flex items-center gap-x-2 text-sm rounded-md shadow-md
        bg-green-200 text-green-600 dark:bg-green-800 dark:text-green-200'
			role='alert'
			aria-live='polite'
		>
			<MdOutlineCheckCircle className='h-5 w-5' />
			<span>{message}</span>
		</div>
	);
};
