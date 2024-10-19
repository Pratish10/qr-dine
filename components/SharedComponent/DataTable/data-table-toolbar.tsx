'use client';

import { Button } from '@/components/ui/button';
import { type Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faced-filter';
import { X } from 'lucide-react';
import _ from 'lodash';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	searchKey: string;
	facedFilterKey: string;
	options: Array<{ label: string; value: string }>;
}

export function DataTableToolbar<TData>({ table, searchKey, facedFilterKey, options }: DataTableToolbarProps<TData>): JSX.Element {
	const { columnFilters } = table.getState();
	const isFiltered = columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Search ${_.capitalize(searchKey)}...`}
					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn(facedFilterKey) != null && (
					<DataTableFacetedFilter column={table.getColumn(facedFilterKey)} title={_.capitalize(facedFilterKey)} options={options} />
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
		</div>
	);
}
