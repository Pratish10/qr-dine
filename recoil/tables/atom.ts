import { type RequestStatus } from '@/types/api.types';
import { type Table } from '@prisma/client';
import { atom } from 'recoil';

const defaultTable: Table = {
	id: '',
	createdAt: new Date(),
	restaurantId: '',
	tableId: '',
	tableNumber: '',
	tableQrCode: '',
	tableSize: '',
	tableStatus: 'Vacant',
	updatedAt: new Date(),
};

export const tableStatus = atom<RequestStatus>({
	key: 'tableStatus',
	default: 'idle',
});

export const tableList = atom<Table[]>({
	key: 'tableList',
	default: [defaultTable],
});
