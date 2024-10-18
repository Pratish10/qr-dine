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

export interface Row<TData> {
	original: TData;
}

interface DataTableProps<TData, TValue> {
	columns: Array<ColumnDef<TData, TValue>>;
	data: TData[];
	searchKey: string;
	facedFilterKey: string;
	disabled?: boolean;
	onDelete: (rows: Array<Row<TData>>) => void;
	options: Array<{ label: string; value: string }>;
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
		<div className='space-y-4'>
			<ConfirmationDialog />
			<div className='flex items-center'>
				<DataTableToolbar table={table} searchKey={searchKey} facedFilterKey={facedFilterKey} options={options} />
				{table.getFilteredSelectedRowModel().rows.length > 0 && (
					<Button
						disabled={disabled}
						size='sm'
						variant='destructive'
						className='ml-auto font-normal'
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={async () => {
							const ok = await confirm();
							if (ok) {
								onDelete(table.getSelectedRowModel().rows);
								table.resetRowSelection();
							}
						}}
					>
						{disabled ? (
							<span className='flex items-center'>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Deleting...
							</span>
						) : (
							<span className='flex items-center'>
								<TrashIcon size={20} className='mr-2' />
								Delete ({table.getFilteredSelectedRowModel().rows.length})
							</span>
						)}
					</Button>
				)}
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</div>
	);
}
