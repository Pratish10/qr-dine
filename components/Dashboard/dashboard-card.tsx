'use client';

import { motion } from 'framer-motion';
import { School, SquareMenu, Sofa, Boxes } from 'lucide-react';

interface DashboardCardProps {
	title: string;
	content: string | number;
	icon: 'restaurant' | 'menu' | 'table' | 'category';
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const iconComponents = {
	restaurant: School,
	menu: SquareMenu,
	table: Sofa,
	category: Boxes,
};

export function DashboardCard({ title, content, icon }: DashboardCardProps): JSX.Element {
	const IconComponent = iconComponents[icon];

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			transition={{ duration: 0.5 }}
			className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center space-x-4'
		>
			<div className='bg-green-100 dark:bg-green-900 p-3 rounded-full'>
				<IconComponent className='w-6 h-6 text-green-600 dark:text-green-400' />
			</div>
			<div className='flex-1'>
				<h2 className='text-sm font-medium text-gray-500 dark:text-gray-400'>{title}</h2>
				<p className='text-2xl font-bold text-gray-900 dark:text-white'>{content}</p>
			</div>
		</motion.div>
	);
}
