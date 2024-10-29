'use client';
import { motion } from 'framer-motion';

interface DashboardCardProps {
	title: string;
	content: string | number;
	delay: number;
}

const cardVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

export const DashboardCard = ({ title, content, delay }: DashboardCardProps): JSX.Element => {
	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			transition={{ duration: 0.3, delay }}
			className='shadow-md rounded-lg p-6 dark:bg-gray-800 dark:text-white bg-white text-black'
		>
			<h2 className='text-lg'>{title}</h2>
			<p className='text-2xl font-bold'>{content}</p>
		</motion.div>
	);
};
