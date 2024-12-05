/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { AddMenu } from './add-menu';
import { Availability, MenuType } from '@prisma/client';
import { useRecoilValue } from 'recoil';
import { restaurant } from '@/recoil/restaurant/atom';
import { useMenuSheetController } from '@/hooks/menus/menu-sheet-controller';

export interface DefaultMenuType {
	id: string;
	name: string;
	amount: string;
	category: string;
	description: string;
	type: MenuType;
	availability: Availability;
	image: string[];
	isFeatured: boolean | null;
	restaurantId: string;
}

export const NewMenuSheet = (): JSX.Element => {
	const { isOpen, onClose, data } = useMenuSheetController();
	const { id } = useRecoilValue(restaurant);
	const defaultValues: DefaultMenuType = {
		id: '',
		name: '',
		amount: '',
		category: '',
		description: '',
		type: MenuType.Vegeterian,
		availability: Availability.Available,
		image: [],
		isFeatured: false,
		restaurantId: id,
	};
	const isEdit = !!(data && typeof data === 'object' && !Array.isArray(data));
	const values = isEdit ? (data as DefaultMenuType) : defaultValues;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='z-[999]'>
				<SheetHeader>
					<SheetTitle>{isEdit ? 'Edit Menu' : 'Add Menu'}</SheetTitle>
					<SheetDescription>
						<AddMenu {...values} isEdit={isEdit} />
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
