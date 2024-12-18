/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { DataTableColumnHeader } from '@/components/SharedComponent/DataTable/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { type Table } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import { Checkbox } from '@/components/ui/checkbox';

export const TableColumn: Array<ColumnDef<Table>> = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={(value) => {
					table.toggleAllPageRowsSelected(!!value);
				}}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
				}}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'tableId',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Table ID' />;
		},
		cell: ({ row }) => {
			const { onOpen } = useTableSheetController();
			return (
				<p
					className='hover:underline cursor-pointer'
					onClick={() => {
						onOpen(row.original);
					}}
				>
					{row.original.tableId}
				</p>
			);
		},
	},
	{
		accessorKey: 'tableNumber',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Table Number' />;
		},
	},
	{
		accessorKey: 'tableStatus',
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Table Status' />;
		},
		cell: ({ row }) => {
			const tableStatus = row.original.tableStatus;
			return (
				<Badge
					variant='outline'
					className={`rounded-full text-xs ${tableStatus === 'Vacant' ? 'dark:bg-green-600 bg-green-400' : 'dark:bg-red-600 bg-red-400'}`}
				>
					{tableStatus}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'tableSize',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Table Size' />;
		},
		cell: ({ row }) => {
			const size = row.original.tableSize;
			return <p className='sm:text-xs md:text-sm'>{size} Person</p>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const { onOpen } = useTableSheetController();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size='sm' variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={() => {
								onOpen(row.original);
							}}
						>
							<Edit size={20} className='mr-3' />
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
