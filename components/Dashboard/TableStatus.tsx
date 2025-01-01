/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { tableList } from '@/recoil/tables/atom';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';

interface TableStatusProps {
	Vacant: number;
	Occupied: number;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export function TableStatus({ data }: { data: TableStatusProps[] }): JSX.Element {
	const tables = useRecoilValue(tableList) ?? [];

	const chartConfig = {
		Vacant: {
			label: 'Vacant',
			color: '#10B981',
		},
		Occupied: {
			label: 'Occupied',
			color: '#047857',
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
					<CardTitle>Table Status</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className='mx-auto aspect-square w-full max-w-[250px]'>
						<RadialBarChart data={data} endAngle={180} innerRadius={80} outerRadius={130}>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy ?? 0) - 16}
														className='fill-foreground text-2xl font-bold dark:fill-white'
													>
														{tables.length.toLocaleString()}
													</tspan>
													<tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 4} className='fill-muted-foreground dark:fill-white'>
														Tables
													</tspan>
												</text>
											);
										}
										return null;
									}}
								/>
							</PolarRadiusAxis>
							<RadialBar dataKey='Vacant' stackId='a' cornerRadius={5} fill='#10B981' className='stroke-transparent stroke-2' />
							<RadialBar dataKey='Occupied' fill='#047857' stackId='a' cornerRadius={5} className='stroke-transparent stroke-2' />
						</RadialBarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</motion.div>
	);
}
