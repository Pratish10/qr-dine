'use client';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TableColumn } from './columns';
import { useRecoilValue } from 'recoil';
import { TableStatus, type Table } from '@prisma/client';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';
import { useDeleteTables } from '@/hooks/tables/use-delete-tables';
import { motion } from 'framer-motion';
import { TableLoader } from '@/components/table-loader';
import { tableList, tableStatus } from '@/recoil/tables/atom';
import { TableHeader } from '@/components/ui/table';

const options = [
	{ label: TableStatus.Vacant, value: TableStatus.Vacant },
	{ label: TableStatus.Occupied, value: TableStatus.Occupied },
];

const Tables = (): JSX.Element => {
	const tabStatus = useRecoilValue(tableStatus);
	const totalTables = useRecoilValue(tableList) ?? [];

	const { mutate, isPending } = useDeleteTables();

	const onDelete = (row: Array<Row<Table>>): void => {
		const ids = row.map((item: { original: Table }) => item.original.id);
		mutate(ids);
	};
	return (
		<motion.div
			className='my-9 pb-24'
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Card className='p-1 dark:bg-gray-900'>
				<CardHeader>
					<TableHeader />
				</CardHeader>
				<CardContent>
					{tabStatus === 'loading' ? (
						<TableLoader />
					) : (
						<DataTable
							columns={TableColumn}
							data={totalTables}
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
		</motion.div>
	);
};

export default Tables;
