import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, time: number): T {
	const [debounce, setDebounce] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounce(value);
		}, time);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, time]);

	return debounce;
}
