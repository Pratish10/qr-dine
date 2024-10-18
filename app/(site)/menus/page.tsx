'use client';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMenus } from '@/hooks/menus/use-get-menus';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { useEffect, useState } from 'react';
import { type Menu } from '@prisma/client';
import { useSheetController } from '@/hooks/use-sheet-controller';
import { useDeleteMenu } from '@/hooks/menus/use-delete-menus';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';

const Menus = (): JSX.Element => {
	const { id } = useRecoilValue(restaurant);
	const { data, isLoading, isRefetching, refetch, isSuccess } = useGetMenus(id);
	const { mutate, isPending } = useDeleteMenu();
	const [menus, setMenus] = useState<Menu[]>([]);
	const { onOpen } = useSheetController();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (id) {
			void refetch();
		}
	}, [id]);

	useEffect(() => {
		if (isSuccess || !isRefetching) {
			if (data !== undefined && 'status' in data && data.status) {
				setMenus(data?.data ?? []);
			}
		}
	}, [isSuccess, isRefetching, data]);

	const onDelete = (row: Row[]): void => {
		const ids = row.map((item: { original: Menu }) => item.original.id);
		mutate(ids);
	};

	return (
		<div className='my-9'>
			<Card className='p-1'>
				<CardHeader className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
					<div>
						<CardTitle>Menus</CardTitle>
						<CardDescription>Manage your menus</CardDescription>
					</div>
					<Button
						className='mt-2 sm:mt-0 sm:ml-auto'
						size='sm'
						onClick={() => {
							onOpen(undefined);
						}}
					>
						<PlusCircle className='mr-2' size={20} />
						Add Menu
					</Button>
				</CardHeader>
				<CardContent>
					{isLoading || isRefetching ? (
						<div className='flex justify-center items-center h-full'>
							<Loader2 className='h-6 w-6 animate-spin' />
						</div>
					) : (
						<DataTable
							columns={columns}
							data={menus}
							searchKey='name'
							disabled={isPending}
							onDelete={(row) => {
								onDelete(row);
							}}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Menus;
