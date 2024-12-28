'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ExtendedOrder } from '@/types/data.types';
import { ExpandedOrderItems } from './ExpandedOrderItems';
import { AnimatePresence, motion } from 'framer-motion';

export const OrderColumn: ColumnDef<ExtendedOrder>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'orderItems',
		header: 'Order Items',
		cell: ({ row }) => {
			const orderItems = row.original.orderItems;
			const [expandedRow, setExpandedRow] = useState<string | null>(null);

			const isExpanded = expandedRow === row.id;

			if (!orderItems || orderItems.length === 0) {
				return <div className='text-xs text-gray-500 dark:text-gray-400'>No items</div>;
			}

			const toggleRow = (id: string) => {
				setExpandedRow((prev) => (prev === id ? null : id));
			};

			return (
				<div>
					<div className='flex items-center justify-between'>
						<span className='text-sm text-gray-600 dark:text-gray-300'>{orderItems.length} item(s)</span>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => toggleRow(row.id)}
								className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
							>
								{isExpanded ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
								<span className='sr-only'>order items</span>
							</Button>
						</motion.div>
					</div>
					<AnimatePresence>{isExpanded && <ExpandedOrderItems orderItems={orderItems} />}</AnimatePresence>
				</div>
			);
		},
	},
	{
		accessorKey: 'orderNumber',
		header: 'Order Number',
		cell: ({ row }) => <div className='font-medium'>{row.getValue('orderNumber')}</div>,
	},
	{
		accessorKey: 'orderDate',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Order Date
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const updatedAt: Date | undefined = row.original.updatedAt;
			const formattedDate =
				updatedAt !== undefined
					? new Intl.DateTimeFormat('en-US', {
							timeZone: 'Asia/Kolkata',
							hour12: true,
							year: 'numeric',
							month: 'short',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
						}).format(new Date(updatedAt))
					: '';

			return <div className='md:text-sm text-xs'>{formattedDate}</div>;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Customer
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className='md:text-sm text-xs'>{row.original.customer?.name}</div>;
		},
	},
	{
		accessorKey: 'tableId',
		header: 'Table',
		cell: ({ row }) => <div>{row.getValue('tableId') || 'Takeaway'}</div>,
	},
	{
		accessorKey: 'totalAmount',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Total Amount
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const totalAmount = row.original.orderItems?.reduce((sum, item) => sum + item.totalPrice, 0) ?? 0;

			const formatted = new Intl.NumberFormat('en-IN', {
				style: 'currency',
				currency: 'INR',
			}).format(totalAmount / 100);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const order = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderNumber)}>Copy order number</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
						<DropdownMenuItem>Update status</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
