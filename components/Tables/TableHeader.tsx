/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { canAddTable } from '@/utils/permissions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Link, PlusCircle } from 'lucide-react';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';
import APP_PATHS from '@/config/path.config';
import { tableList } from '@/recoil/tables/atom';
import { useRecoilValue } from 'recoil';

export const TableHeader = (): JSX.Element => {
	const user = useCurrentUser();
	const totalTables = useRecoilValue(tableList) ?? [];
	const { onOpen } = useTableSheetController();
	return (
		<div>
			{!user ||
				(!canAddTable(user, totalTables) && (
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
					<CardTitle>Tables</CardTitle>
					<CardDescription>Manage your tables</CardDescription>
				</div>
				<div className='flec items-center space-x-3'>
					<Button
						variant='green'
						className='mt-2 sm:mt-0 sm:ml-auto'
						size='sm'
						onClick={() => {
							onOpen(undefined);
						}}
						disabled={!user || !canAddTable(user, totalTables)}
					>
						<PlusCircle className='mr-2' size={20} />
						Add Table
					</Button>
				</div>
			</div>
		</div>
	);
};
