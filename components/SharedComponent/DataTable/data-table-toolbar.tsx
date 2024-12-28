'use client';

import { type Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faced-filter';
import { X } from 'lucide-react';
import _ from 'lodash';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	searchKey: string;
	facedFilterKey: string;
	options?: Array<{ label: string; value: string }>;
}

export function DataTableToolbar<TData>({ table, searchKey, facedFilterKey, options }: DataTableToolbarProps<TData>): JSX.Element {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex flex-col sm:flex-row gap-4 items-center py-4'>
			<Input
				placeholder={`Search ${_.capitalize(searchKey)}...`}
				value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
				onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
				className='max-w-sm'
			/>
			{Array.isArray(options) && (
				<DataTableFacetedFilter column={table.getColumn(facedFilterKey)} options={options} title={_.capitalize(facedFilterKey)} />
			)}

			{isFiltered && (
				<Button
					variant='ghost'
					onClick={() => {
						table.resetColumnFilters();
					}}
					className='h-8 px-2 lg:px-3'
				>
					Reset
					<X className='ml-2 h-4 w-4' />
				</Button>
			)}
		</div>
	);
}
