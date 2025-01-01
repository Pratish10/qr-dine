import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MenuPopularityChartProps {
	data: Array<{ name: string; popularity: number; averagePrice: number }>;
}

export function MenuPopularityChart({ data }: MenuPopularityChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Menu Popularity vs. Average Price</CardTitle>
			</CardHeader>
			<CardContent className='h-[300px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
						<CartesianGrid />
						<XAxis type='number' dataKey='averagePrice' name='Average Price' unit='$' />
						<YAxis type='number' dataKey='popularity' name='Popularity' unit='%' />
						<Tooltip cursor={{ strokeDasharray: '3 3' }} />
						<Scatter name='Menus' data={data} fill='#10B981' />
					</ScatterChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
