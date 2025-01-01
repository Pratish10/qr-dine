'use client';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { motion } from 'framer-motion';

interface MenuItemCountChartProps {
	data: Array<{ name: string; itemCount: number }>;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export function MenuItemCountChart({ data }: MenuItemCountChartProps): JSX.Element {
	const chartConfig = {
		name: {
			label: 'name',
			color: '#10B981', // Green theme color
		},
		label: {
			color: 'hsl(var(--background))',
		},
	} satisfies ChartConfig;

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			transition={{ duration: 0.5 }}
			className='rounded-xl shadow-lg col-span-2'
		>
			<Card className='w-full h-full bg-white dark:bg-gray-800'>
				<CardHeader>
					<CardTitle>Menu Item Counts</CardTitle>
				</CardHeader>
				<CardContent className='h-[300px] overflow-hidden'>
					<ChartContainer config={chartConfig} className='w-full h-full'>
						<BarChart data={data} layout='vertical' margin={{ top: 16, right: 16, left: 16, bottom: 16 }} className='w-full h-full'>
							<CartesianGrid horizontal={false} stroke='#E5E7EB' strokeDasharray='3 3' className='dark:stroke-gray-600' />
							<YAxis
								dataKey='name'
								type='category'
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
								hide
							/>
							<XAxis dataKey='itemCount' type='number' hide />
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
							<Bar dataKey='itemCount' layout='vertical' fill='#10B981' radius={4} className='dark:fill-green-600'>
								<LabelList dataKey='name' position='insideLeft' offset={8} className='fill-white dark:fill-gray-100' fontSize={12} />
								<LabelList
									dataKey='itemCount'
									position='right'
									offset={8}
									className='fill-gray-900 dark:fill-gray-100'
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</motion.div>
	);
}
