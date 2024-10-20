/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import React from 'react';
import { TableStatus } from '@prisma/client';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { AddTable } from './add-table';
import { useTableSheetController } from '@/hooks/tables/table-sheet-controller';

export interface DefaultTableType {
	tableNumber: string;
	tableStatus: TableStatus;
	tableQrCode: string;
	tableSize: string;
	restaurantId: string;
}

export const NewTableSheet = (): React.JSX.Element => {
	const { isOpen, onClose, data } = useTableSheetController();
	const { id } = useRecoilValue(restaurant);
	const defaultValues: DefaultTableType = {
		tableNumber: '',
		tableQrCode: 'https://quickchart.io/qr?text=Hello%20world&size=200',
		tableSize: '',
		tableStatus: TableStatus.Vacant,
		restaurantId: id,
	};
	const isEdit = !!(data && typeof data === 'object' && !Array.isArray(data));
	const values = isEdit ? (data as DefaultTableType) : defaultValues;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='z-[999]'>
				<SheetHeader>
					<SheetTitle>{isEdit ? 'Edit Table' : 'Add Table'}</SheetTitle>
					<SheetDescription>
						<AddTable {...values} isEdit={isEdit} />
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
