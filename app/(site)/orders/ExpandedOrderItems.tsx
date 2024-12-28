import React from 'react';
import { motion } from 'framer-motion';
import { OrderItem } from '@prisma/client';

interface ExpandedOrderItemsProps {
	orderItems: OrderItem[];
}

export const ExpandedOrderItems: React.FC<ExpandedOrderItemsProps> = ({ orderItems }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className='bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-2 w-full'
		>
			<h4 className='font-semibold mb-4 text-gray-800 dark:text-gray-200'>Detailed Order Items</h4>
			<ul className='space-y-4'>
				{orderItems.map((item) => (
					<motion.li
						key={item.id}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2 }}
						className='flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
					>
						<div className='flex items-center space-x-4 flex-1'>
							<span className='font-medium text-gray-700 dark:text-gray-300 w-16'>{item.quantity}x</span>
							<span className='text-gray-600 dark:text-gray-400 flex-1'>{item.menuId}</span>
						</div>
						<div className='text-right'>
							<div className='font-semibold text-gray-800 dark:text-gray-200'>₹{(item.totalPrice / 100).toFixed(2)}</div>
							<div className='text-sm text-gray-500 dark:text-gray-400'>₹{(item.totalPrice / item.quantity / 100).toFixed(2)} each</div>
						</div>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
};
