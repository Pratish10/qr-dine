'use client';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { TableColumn } from './columns';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { useGetTables } from '@/hooks/tables/use-get-table';
import { TableStatus, type Table } from '@prisma/client';
import { useEffect, useState } from 'react';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import { useDeleteTables } from '@/hooks/tables/use-delete-tables';

const options = [
	{ label: TableStatus.Vacant, value: TableStatus.Vacant },
	{ label: TableStatus.Occupied, value: TableStatus.Occupied },
];

const Tables = (): JSX.Element => {
	const { id } = useRecoilValue(restaurant);
	const { data, isLoading, isRefetching, isSuccess } = useGetTables(id);
	const { mutate, isPending } = useDeleteTables();
	const [table, setTable] = useState<Table[]>([]);
	const { onOpen } = useTableSheetController();

	useEffect(() => {
		if (isSuccess || !isRefetching) {
			if (data !== undefined && 'status' in data && data.status) {
				setTable(data?.data ?? []);
			}
		}
	}, [isSuccess, isRefetching, data]);

	const onDelete = (row: Array<Row<Table>>): void => {
		const ids = row.map((item: { original: Table }) => item.original.id);
		mutate(ids);
	};
	return (
		<div className='my-9'>
			<Card className='p-1 dark:bg-gray-900'>
				<CardHeader className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
					<div>
						<CardTitle>Tables</CardTitle>
						<CardDescription>Manage your tables</CardDescription>
					</div>
					<Button
						variant='green'
						className='mt-2 sm:mt-0 sm:ml-auto'
						size='sm'
						onClick={() => {
							onOpen(undefined);
						}}
					>
						<PlusCircle className='mr-2' size={20} />
						Add Table
					</Button>
				</CardHeader>
				<CardContent>
					{isLoading || isRefetching ? (
						<div className='flex justify-center items-center h-full'>
							<Loader2 className='h-6 w-6 animate-spin' />
						</div>
					) : (
						<DataTable
							columns={TableColumn}
							data={table}
							searchKey='tableNumber'
							facedFilterKey={'tableStatus'}
							disabled={isPending}
							onDelete={(row) => {
								onDelete(row);
							}}
							options={options}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Tables;
