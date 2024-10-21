import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		const listener = (): void => {
			setMatches(media.matches);
		};

		// Set initial state
		listener();
		media.addListener(listener);
		return () => {
			media.removeListener(listener);
		};
	}, [query]);

	return matches;
};
