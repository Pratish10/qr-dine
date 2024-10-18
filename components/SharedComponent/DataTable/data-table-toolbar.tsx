'use client';

import { Button } from '@/components/ui/button';
import { type Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faced-filter';
import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { type CategoryType } from '@/app/api/categories/route';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	searchKey: string;
}

export function DataTableToolbar<TData>({ table, searchKey }: DataTableToolbarProps<TData>): JSX.Element {
	const { id } = useRecoilValue(restaurant);
	const { data, isLoading, isSuccess, refetch, isRefetching } = useGetCategories(id);
	const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (id) {
			void refetch();
		}
	}, [id]);

	useEffect(() => {
		if (isSuccess || !isRefetching) {
			if (data !== undefined && 'status' in data && data.status) {
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				const categoryOptions: Array<{ value: string; label: string }> = data.data
					? data.data.map((item: CategoryType) => ({
							label: item.category,
							value: item.category,
						}))
					: [];

				setCategories(categoryOptions);
			}
		}
	}, [isSuccess, isRefetching, data]);

	const { columnFilters } = table.getState();
	const isFiltered = columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Search ${searchKey}...`}
					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{isLoading || isRefetching ? (
					<div className='flex justify-center items-center h-full'>
						<Loader2 className='h-6 w-6 animate-spin' />
					</div>
				) : (
					table.getColumn('category') != null &&
					isSuccess && <DataTableFacetedFilter column={table.getColumn('category')} title='Category' options={categories} />
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
