import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { columns, type Menu } from './columns';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const data: Menu[] = [
	{
		id: 'cm2a6yqpv0001pui0rri02h2r',
		name: 'paneer',
		description: 'ffsdsfsdfs',
		type: 'Vegeterian',
		image: 'https://utfs.io/f/ee4934f6-b13e-40ef-af99-f759f68d417b-2db1s3.png',
		category: 'Main Course',
		amount: '599',
		createdAt: '2024-10-15T08:38:55.172Z',
		updatedAt: '2024-10-15T08:38:55.172Z',
		isFeatured: false,
		availability: 'Available',
	},
	{
		id: 'cm2a266h80003602tk0y7k10z',
		name: 'Chicken momos',
		description: 'dsadadadadada',
		type: 'nonVegeterian',
		image: 'https://utfs.io/f/201e2b52-c339-4668-b705-25593d996b1a-2db1s3.png',
		category: 'Sides',
		amount: '1000',
		createdAt: '2024-10-15T06:24:44.109Z',
		updatedAt: '2024-10-15T06:24:44.109Z',
		isFeatured: false,
		availability: 'notAvailable',
	},
];

const Menus = (): JSX.Element => {
	return (
		<div className='my-9'>
			<Card className='p-1'>
				<CardHeader className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
					<div>
						<CardTitle>Menus</CardTitle>
						<CardDescription>Manage your menus</CardDescription>
					</div>
					<Sheet>
						<SheetTrigger>
							<Button className='mt-2 sm:mt-0 sm:ml-auto' size='sm'>
								<PlusCircle className='mr-2' size={20} />
								Add Menu
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Add Menu</SheetTitle>
								<SheetDescription>Menu Form</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={data} searchKey='name' disabled />
				</CardContent>
			</Card>
		</div>
	);
};

export default Menus;
