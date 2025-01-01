import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';

interface RestaurantListProps {
	data: Array<{ id: number; name: string; location: string; rating: number }>;
}

export function RestaurantList({ data }: RestaurantListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Restaurants</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead className='text-right'>Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((restaurant) => (
							<TableRow key={restaurant.id}>
								<TableCell>{restaurant.name}</TableCell>
								<TableCell>{restaurant.location}</TableCell>
								<TableCell className='text-right'>
									<span className='flex items-center justify-end'>
										{restaurant.rating.toFixed(1)}
										<Star className='h-4 w-4 ml-1 text-yellow-400 fill-yellow-400' />
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
