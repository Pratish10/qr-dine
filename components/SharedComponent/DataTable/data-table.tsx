/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	type SortingState,
	getSortedRowModel,
	type ColumnFiltersState,
	getFilteredRowModel,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Loader2, TrashIcon } from 'lucide-react';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './datatable-pagination';
import useConfirm from '@/hooks/use-confirm';
import { AnimatePresence, motion } from 'framer-motion';

export interface Row<TData> {
	original: TData;
}

interface DataTableProps<TData, TValue> {
	columns: Array<ColumnDef<TData, TValue>>;
	data: TData[];
	searchKey: string;
	facedFilterKey?: string;
	disabled?: boolean;
	onDelete?: (rows: Array<Row<TData>>) => void;
	options?: Array<{ label: string; value: string }>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
	onDelete,
	disabled,
	facedFilterKey,
	options,
}: DataTableProps<TData, TValue>): JSX.Element {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [ConfirmationDialog, confirm] = useConfirm('Delete Bulk', "You are about to perform bulk delete. This action can't be undone");

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			rowSelection,
			columnFilters,
		},
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className='space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg'
		>
			<ConfirmationDialog />
			<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
				<DataTableToolbar table={table} searchKey={searchKey} facedFilterKey={facedFilterKey ?? ''} options={options} />
				<AnimatePresence>
					{table.getFilteredSelectedRowModel().rows.length > 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.2 }}
						>
							<Button
								disabled={disabled}
								size='sm'
								variant='destructive'
								className='w-full sm:w-auto font-normal bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={async () => {
									const ok = await confirm();
									if (ok && onDelete) {
										onDelete(table.getSelectedRowModel().rows);
										table.resetRowSelection();
									}
								}}
							>
								{disabled ? (
									<span className='flex items-center'>
										<Loader2 className='h-4 w-4 animate-spin mr-2' />
										Deleting...
									</span>
								) : (
									<span className='flex items-center'>
										<TrashIcon size={20} className='mr-2' />
										Delete ({table.getFilteredSelectedRowModel().rows.length})
									</span>
								)}
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className='rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden'>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className='bg-slate-200 dark:bg-slate-900'>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id} className='text-green-700 dark:text-green-300 font-semibold'>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className='py-3'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-24 text-center text-gray-500 dark:text-gray-400'>
										No results found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<DataTablePagination table={table} />
		</motion.div>
	);
}
