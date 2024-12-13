'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { HeroSection } from './Home/HeroSection';
import { FeaturesSection } from './Home/FeatureSection';
import { HowItWorksSection } from './Home/HowItWorksSection';
import { PricingSection } from './Home/PriceSection';
import { CTASection } from './Home/CTASection';

export default function LandingPage(): JSX.Element {
	const { theme } = useTheme();
	const { scrollYProgress } = useScroll();
	const lightBackgroundColor = useTransform(
		scrollYProgress,
		[0, 0.2, 0.4, 0.6, 0.8, 1],
		['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e']
	);

	const darkBackgroundColor = useTransform(
		scrollYProgress,
		[0, 0.2, 0.4, 0.6, 0.8, 1],
		['#022c22', '#064e3b', '#065f46', '#047857', '#059669', '#10b981']
	);

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

	return (
		<motion.div
			className='min-h-screen overflow-hidden transition-colors duration-300'
			style={{ backgroundColor: theme === 'dark' ? darkBackgroundColor : lightBackgroundColor }}
		>
			<div className='fixed inset-0 pointer-events-none z-0'>
				<div className="absolute inset-0 bg-[url('/qr-pattern.svg')] opacity-5 dark:opacity-10" />
				<div
					className='absolute inset-0 bg-gradient-radial from-green-300/20 to-transparent dark:from-green-700/20 dark:to-transparent'
					style={{
						background:
							theme === 'dark'
								? 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.15), transparent 80%)'
								: 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(6, 78, 59, 0.15), transparent 80%)',
					}}
				/>
			</div>
			<div className='relative z-10'>
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<PricingSection />
				<CTASection />
			</div>
		</motion.div>
	);
}
