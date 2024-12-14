/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type FC } from 'react';
import { MdErrorOutline } from 'react-icons/md';

interface FormErrorProps {
	message?: string;
}

export const FormError: FC<FormErrorProps> = ({ message }) => {
	if (!message) return null;

	return (
		<div
			className='p-3 flex items-center gap-x-2 text-sm rounded-md shadow-md
		  bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200'
			role='alert'
			aria-live='assertive'
		>
			<MdErrorOutline className='h-5 w-5' />
			<span>{message}</span>
		</div>
	);
};
