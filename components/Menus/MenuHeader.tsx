/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { canAddMenu } from '@/utils/permissions';
import { type Menu } from '@prisma/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';
import { useCategoryController } from '@/hooks/use-category-controller';
import APP_PATHS from '@/config/path.config';

interface MenuHeaderProps {
	menus: Menu[];
}

export const MenuHeaderContent = ({ menus }: MenuHeaderProps): JSX.Element => {
	const user = useCurrentUser();
	const { onOpen: onSheetOpen } = useMenuSheetController();
	const { onOpen: onCategoryOpen } = useCategoryController();
	return (
		<div>
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
		</div>
	);
};
