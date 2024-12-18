'use client';

import { type Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>): JSX.Element {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='flex flex-col sm:flex-row items-center justify-between px-2 py-4 space-y-4 sm:space-y-0'
		>
			<div className='text-sm text-muted-foreground order-2 sm:order-1'>
				<AnimatePresence>
					{table.getFilteredSelectedRowModel().rows.length > 0 && (
						<motion.span
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
						>
							{table.getFilteredSelectedRowModel().rows.length} of{' '}
						</motion.span>
					)}
				</AnimatePresence>
				{table.getFilteredRowModel().rows.length} row(s)
				<AnimatePresence>
					{table.getFilteredSelectedRowModel().rows.length > 0 && (
						<motion.span
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
						>
							{' '}
							selected
						</motion.span>
					)}
				</AnimatePresence>
			</div>
			<div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 order-1 sm:order-2'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium hidden sm:inline'>Rows per page</p>
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
				<div className='flex items-center space-x-2'>
					<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</div>
					<div className='flex items-center space-x-2'>
						<Button
							variant='outline'
							className='hidden h-8 w-8 p-0 sm:flex'
							onClick={() => {
								table.setPageIndex(0);
							}}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>Go to first page</span>
							<ChevronsLeft className='h-4 w-4' />
						</Button>
						<Button
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
							variant='outline'
							className='hidden h-8 w-8 p-0 sm:flex'
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
		</motion.div>
	);
}
