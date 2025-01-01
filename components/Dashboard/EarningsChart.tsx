'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Loader2 } from 'lucide-react';
import { type RequestStatus } from '@/types/api.types';
import { type EarningsData } from '@/types/data.types';

interface EarningsChartProps {
	data: EarningsData | null;
	loader?: RequestStatus;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export function EarningsChart({ data, loader }: EarningsChartProps): JSX.Element {
	const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

	if (data === null) {
		return (
			<div className='flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner'>
				<AlertCircle className='w-12 h-12 text-gray-400 dark:text-gray-500 mb-4' />
				<div className='text-lg font-medium text-gray-600 dark:text-gray-300'>No Data Found</div>
				<p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>There is no data available to display at this time.</p>
			</div>
		);
	}

	const chartData = data[timeFrame];
	const xDataKey = timeFrame === 'monthly' ? 'month' : 'day';

	const chartTitle = {
		daily: 'Daily Earnings',
		weekly: 'Weekly Earnings',
		monthly: 'Monthly Earnings',
	}[timeFrame];

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			transition={{ duration: 0.5 }}
			className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 col-span-2'
		>
			<Card className='w-full h-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-sm font-medium text-gray-500 dark:text-gray-400'>{chartTitle}</CardTitle>
					<Select
						value={timeFrame}
						onValueChange={(value) => {
							setTimeFrame(value as 'daily' | 'weekly' | 'monthly');
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select time frame' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='daily'>Daily</SelectItem>
							<SelectItem value='weekly'>Weekly</SelectItem>
							<SelectItem value='monthly'>Monthly</SelectItem>
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent className='h-[300px]'>
					{loader === 'loading' ? (
						<div className='flex items-center justify-center h-full'>
							<Loader2 className='h-8 w-8 animate-spin text-green-600 dark:text-green-400' />
						</div>
					) : (
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart data={chartData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey={xDataKey} tick={{ fill: 'currentColor' }} stroke='currentColor' />
								<YAxis tick={{ fill: 'currentColor' }} stroke='currentColor' />
								<Tooltip
									contentStyle={{
										backgroundColor: 'rgba(0, 0, 0, 0.8)',
										border: 'none',
										borderRadius: '4px',
										color: 'white',
									}}
								/>
								<Area type='monotone' dataKey='amount' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
							</AreaChart>
						</ResponsiveContainer>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
