'use client';
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Carrot, CheckCircle2, Drumstick, Edit, Group, MoreHorizontal, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/SharedComponent/DataTable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { type Menu } from '@prisma/client';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';
import { useCategoryController } from '@/hooks/use-category-controller';

export const MenuColumn: Array<ColumnDef<Menu>> = [
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
		id: 'image',
		cell: ({ row }) => {
			const image = row.original.image;

			const Name = row.original.name;
			const initials = Name.split(' ')
				.map((word) => word.charAt(0).toUpperCase())
				.join('');

			return (
				<Avatar>
					<AvatarImage src={image[0]} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
			);
		},
	},
	{
		accessorKey: 'menuId',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Menu Id' />;
		},
		cell: ({ row }) => {
			const { onOpen: onSheetOpen } = useMenuSheetController();
			return (
				<p
					className='hover:underline cursor-pointer'
					onClick={() => {
						onSheetOpen(row.original);
					}}
				>
					{row.original.menuId}
				</p>
			);
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Name' />;
		},
		cell: ({ row }) => {
			const type = row.original.type;
			const Name = row.original.name;

			return (
				<div className='flex items-center space-x-1'>
					<div className='hover:underline cursor-pointer'>{Name}</div>
					<span>
						{type === 'nonVegeterian' ? (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Drumstick color='red' size={15} />
									</TooltipTrigger>
									<TooltipContent>
										<p>Non Vegeterian</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Carrot color='green' size={15} />
									</TooltipTrigger>
									<TooltipContent>
										<p>Vegeterian</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'category',
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Category' />;
		},
	},
	{
		accessorKey: 'availability',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Availability' />;
		},
		cell: ({ row }) => {
			const Availability = row.original.availability;
			return (
				<>
					{Availability === 'Available' ? (
						<Badge className='text-xs text-green-600 bg-green-100 dark:text-green-600 dark:bg-green-300 hover:text-green-600 hover:bg-green-100 rounded-full p-1'>
							<CheckCircle2 className='w-3 h-3 mr-1' />
							Available
						</Badge>
					) : (
						<Badge className='text-xs text-red-600 bg-red-100 dark:text-red-600 dark:bg-red-300 hover:text-red-600 hover:bg-red-100 rounded-full p-1'>
							<XCircle className='w-3 h-3 mr-1' />
							Not Available
						</Badge>
					)}
				</>
			);
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Amount' />;
		},
		cell: ({ row }) => {
			const Amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'INR',
			}).format(Amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'Last Modified',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Last Modified' />;
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
		id: 'actions',
		cell: ({ row }) => {
			const { onOpen: onSheetOpen } = useMenuSheetController();
			const { onOpen: onCategoryOpen } = useCategoryController();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0' size='sm'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={() => {
								onSheetOpen(row.original);
							}}
						>
							<Edit size={20} className='mr-3' />
							Edit Menu
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								onCategoryOpen(row.original);
							}}
						>
							<Group size={20} className='mr-3' />
							Edit Category
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
