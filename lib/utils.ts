import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getDomain(): string | undefined {
	if (process.env.NODE_ENV === 'production') {
		// eslint-disable-next-line no-console
		console.log('LOGGER', process.env.NEXTAUTH_URL, process.env.NEXT_PUBLIC_URL);
		return process.env.NEXTAUTH_URL;
	} else {
		return 'http://localhost:3000';
	}
}
