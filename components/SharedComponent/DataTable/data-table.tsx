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
	type Row,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Loader2, TrashIcon } from 'lucide-react';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
	columns: Array<ColumnDef<TData, TValue>>;
	data: TData[];
	searchKey: string;
	disabled?: boolean;
	onDelete: (rows: Row<TData[]>) => void;
}

export function DataTable<TData, TValue>({ columns, data, searchKey, onDelete, disabled }: DataTableProps<TData, TValue>): JSX.Element {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
		<div>
			<div className='flex items-center py-4'>
				<DataTableToolbar table={table} searchKey={searchKey} />
				{table.getFilteredSelectedRowModel().rows.length > 0 && (
					<Button disabled={disabled} size='sm' variant='destructive' className='ml-auto font-normal'>
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
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
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
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
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

			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<Button
					variant='outline'
					size='sm'
					onClick={() => {
						table.previousPage();
					}}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => {
						table.nextPage();
					}}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
