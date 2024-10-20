'use client';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { MenuColumn } from './columns';
import { DataTable } from '@/components/SharedComponent/DataTable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMenus } from '@/hooks/menus/use-get-menus';
import { useRecoilState, useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { useEffect, useState } from 'react';
import { type Category, type Menu } from '@prisma/client';
import { useDeleteMenu } from '@/hooks/menus/use-delete-menus';
import { type Row } from '@/components/SharedComponent/DataTable/data-table';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { categories } from '@/recoil/categories/atom';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';

const Menus = (): JSX.Element => {
	const { id } = useRecoilValue(restaurant);
	const [category, setCategory] = useRecoilState(categories);

	const { data: Menus, isLoading: isMenuLoading, isRefetching: isMenuRefetching, isSuccess: isMenuSuccess } = useGetMenus(id);

	const { data: Categories, isSuccess: isCategoriesSuccess, isRefetching: isCategoriesRefetching } = useGetCategories(id);

	const { mutate: deleteMenu, isPending: isDeletePending } = useDeleteMenu();
	const [menus, setMenus] = useState<Menu[]>([]);
	const { onOpen } = useMenuSheetController();

	useEffect(() => {
		if (isMenuSuccess || !isMenuRefetching) {
			if (Menus !== undefined && 'status' in Menus && Menus.status) {
				setMenus(Menus?.data ?? []);
			}
		}
	}, [isMenuSuccess, isMenuRefetching, Menus]);

	useEffect(() => {
		if (isCategoriesSuccess || !isCategoriesRefetching) {
			if (Categories !== undefined && 'status' in Categories && Categories.status && Categories.data !== undefined) {
				const data = Categories?.data.map((item: Category) => ({ label: item.category, value: item.category })) ?? [];
				setCategory(data);
			}
		}
	}, [isCategoriesSuccess, isCategoriesRefetching, Categories]);

	const onDelete = (rows: Array<Row<Menu>>): void => {
		const ids = rows.map((item: Row<Menu>) => item.original.id);
		deleteMenu(ids);
	};

	return (
		<div className='my-9'>
			<Card className='p-1 dark:bg-gray-900'>
				<CardHeader className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
					<div>
						<CardTitle>Menus</CardTitle>
						<CardDescription>Manage your menus</CardDescription>
					</div>
					<Button
						variant='green'
						className='mt-2 sm:mt-0 sm:ml-auto'
						size='sm'
						onClick={() => {
							onOpen(undefined);
						}}
					>
						<PlusCircle className='mr-2' size={20} />
						Add Menu
					</Button>
				</CardHeader>
				<CardContent>
					{isMenuLoading || isMenuRefetching ? (
						<div className='flex justify-center items-center h-full'>
							<Loader2 className='h-6 w-6 animate-spin' />
						</div>
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
		</div>
	);
};

export default Menus;
