/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { Button } from '@/components/ui/button';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { MenuColumn } from './columns';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { type Category, type Menu } from '@prisma/client';
import { useDeleteMenu } from '@/hooks/menus/use-delete-menus';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { canAddMenu } from '@/utils/permissions';
import { TableLoader } from '@/components/table-loader';
import { useCategoryController } from '@/hooks/use-category-controller';
import { menuList, menuStatus } from '@/recoil/menus/atom';

const Menus = (): JSX.Element => {
	const user = useCurrentUser();
	const catStatus = useRecoilValue(categoryStatus);
	const menStatus = useRecoilValue(menuStatus);

	const totalMenus = useRecoilValue(menuList);
	const cat = useRecoilValue(categories);

	const { mutate: deleteMenu, isPending: isDeletePending } = useDeleteMenu();
	const { onOpen: onSheetOpen } = useMenuSheetController();
	const { onOpen: onCategoryOpen } = useCategoryController();

	const [category, setCategory] = useState<Array<{ label: string; value: string }>>([]);
	const [menus, setMenus] = useState<Menu[]>([]);

	useEffect(() => {
		if (menStatus === 'success') {
			setMenus(totalMenus ?? []);
		}
	}, [catStatus, totalMenus]);

	useEffect(() => {
		if (catStatus === 'success') {
			const data = cat?.map((item: Category) => ({ label: item.category, value: item.category })) ?? [];
			setCategory(data);
		}
	}, [catStatus]);

	const onDelete = (rows: Array<Row<Menu>>): void => {
		const ids = rows.map((item: Row<Menu>) => item.original.id);
		deleteMenu(ids);
	};

	return (
		<motion.div
			className='my-9 pb-24'
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -10, opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Card className='p-1 dark:bg-gray-900'>
				<CardHeader>
					{!user ||
						(!canAddMenu(user, menus) && (
							<Alert variant='destructive' className='border-red-600 bg-red-100 z-[99] mb-4'>
								<AlertCircle className='h-4 w-4 mr-2' />
								<div>
									<AlertTitle>Upgrade Required</AlertTitle>
									<AlertDescription>
										You’ve reached the limit of your current plan. To add more menus and unlock additional features, please{' '}
										<Link href={`${APP_PATHS.HOME}#pricing`} className='hover:underline cursor-pointer'>
											<strong>subscribe</strong>
										</Link>
										.
									</AlertDescription>
								</div>
							</Alert>
						))}

					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
						<div>
							<CardTitle>Menus</CardTitle>
							<CardDescription>Manage your menus</CardDescription>
						</div>
						<div className='flec items-center space-x-3'>
							<Button
								variant='green'
								className='mt-2 sm:mt-0 sm:ml-auto'
								size='sm'
								onClick={() => {
									onSheetOpen(undefined);
								}}
								disabled={!user || !canAddMenu(user, menus)}
							>
								<PlusCircle className='mr-2' size={20} />
								Add Menu
							</Button>
							<Button
								variant='green'
								className='mt-2 sm:mt-0 sm:ml-auto'
								size='sm'
								onClick={() => {
									onCategoryOpen(undefined);
								}}
							>
								<PlusCircle className='mr-2' size={20} />
								Add Category
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{catStatus === 'loading' || menStatus === 'loading' ? (
						<TableLoader />
					) : (
						<DataTable
							facedFilterKey={'category'}
							columns={MenuColumn}
							data={menus}
							searchKey='name'
							disabled={isDeletePending}
							onDelete={(row) => {
								onDelete(row);
							}}
							options={category}
						/>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default Menus;
