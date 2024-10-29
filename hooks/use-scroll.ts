import { useEffect, useState } from 'react';

const useScroll = (): {
	scrollX: number;
	scrollY: number;
} => {
	const [windowSize, setWindowSize] = useState([window.scrollX, window.scrollY]);

	useEffect(() => {
		const windowSizeHandler = (): void => {
			setWindowSize([window.scrollX, window.scrollY]);
		};
		window.addEventListener('scroll', windowSizeHandler);

		return () => {
			window.removeEventListener('scroll', windowSizeHandler);
		};
	}, []);

	return { scrollX: windowSize[0], scrollY: windowSize[1] };
};

export default useScroll;
