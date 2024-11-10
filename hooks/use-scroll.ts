import { useEffect, useState } from 'react';

const useScroll = (): {
	scrollX: number;
	scrollY: number;
} => {
	const [scrollX, setScrollX] = useState(0);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const updateScrollPosition = (): void => {
				setScrollX(window.scrollX);
				setScrollY(window.scrollY);
			};

			window.addEventListener('scroll', updateScrollPosition);
			updateScrollPosition();

			return () => {
				window.removeEventListener('scroll', updateScrollPosition);
			};
		}
	}, []);

	return { scrollX, scrollY };
};

export default useScroll;
