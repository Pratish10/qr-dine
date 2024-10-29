import { type Table } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>): JSX.Element {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-between p-2'>
			<div className='flex-1 text-sm text-muted-foreground mb-2 lg:mb-0'>
				{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div className='flex items-center space-x-2 lg:space-x-6'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center justify-center text-sm font-medium'>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						size='sm'
						variant='outline'
						className='h-8 w-8 p-0 hidden lg:flex'
						onClick={() => {
							table.setPageIndex(0);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<ChevronsLeft className='h-4 w-4' />
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => {
							table.previousPage();
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft className='h-4 w-4' />
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => {
							table.nextPage();
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight className='h-4 w-4' />
					</Button>
					<Button
						size='sm'
						variant='outline'
						className='h-8 w-8 p-0 hidden lg:flex'
						onClick={() => {
							table.setPageIndex(table.getPageCount() - 1);
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<ChevronsRight className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}
