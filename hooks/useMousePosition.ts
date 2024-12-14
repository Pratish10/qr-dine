import { useEffect } from 'react';

export const useMousePosition = (): void => {
	useEffect(() => {
		const updateMousePosition = (e: MouseEvent): void => {
			document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
			document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
		};

		window.addEventListener('mousemove', updateMousePosition);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);
};
