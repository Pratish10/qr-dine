import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getDomain(): string | undefined {
	if (process.env.NODE_ENV === 'production') {
		return process.env.NEXTAUTH_URL;
	} else {
		return 'http://localhost:3000';
	}
}

export function encodeToUrl(str: string): string {
	return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);
}

export function extractTextFromUrl(url: string): string | null {
	const parsedUrl = new URL(url);
	return parsedUrl.searchParams.get('text');
}
