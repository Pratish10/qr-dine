/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { TableColumn } from './columns';
import { useRecoilValue } from 'recoil';
import { TableStatus, type Table } from '@prisma/client';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import { useDeleteTables } from '@/hooks/tables/use-delete-tables';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import APP_PATHS from '@/config/path.config';
import { canAddTable } from '@/utils/permissions';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { TableLoader } from '@/components/table-loader';
import { tableList, tableStatus } from '@/recoil/tables/atom';

const options = [
	{ label: TableStatus.Vacant, value: TableStatus.Vacant },
	{ label: TableStatus.Occupied, value: TableStatus.Occupied },
];

const Tables = (): JSX.Element => {
	const user = useCurrentUser();

	const tabStatus = useRecoilValue(tableStatus);
	const totalTables = useRecoilValue(tableList);

	const { mutate, isPending } = useDeleteTables();
	const { onOpen } = useTableSheetController();

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
					{!user ||
						(!canAddTable(user, totalTables) && (
							<Alert variant='destructive' className='border-red-600 bg-red-100 z-[99] mb-4'>
								<AlertCircle className='h-4 w-4 mr-2' />
								<div>
									<AlertTitle>Upgrade Required</AlertTitle>
									<AlertDescription>
										You’ve reached the limit of your current plan. To add more tables and unlock additional features, please{' '}
										<Link href={`${APP_PATHS.HOME}#pricing`} className='hover:underline cursor-pointer'>
											<strong>subscribe</strong>
										</Link>
										.
									</AlertDescription>
								</div>
							</Alert>
						))}

					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
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
							disabled={!user || !canAddTable(user, totalTables)}
						>
							<PlusCircle className='mr-2' size={20} />
							Add Table
						</Button>
					</div>
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
