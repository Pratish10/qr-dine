/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MdErrorOutline } from 'react-icons/md';

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps): JSX.Element | null => {
	if (!message) return null;
	return (
		<div className='bg-red-200 p-3 flex items-center gap-x-2 text-sm text-red-600'>
			<MdErrorOutline className='h-5 w-5' />
			{message}
		</div>
	);
};
