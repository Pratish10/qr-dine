import { type RequestStatus } from '@/types/api.types';
import { type Table } from '@prisma/client';
import { atom } from 'recoil';

export const tableStatus = atom<RequestStatus>({
	key: 'tableStatus',
	default: 'idle',
});

export const tableList = atom<Table[] | null>({
	key: 'tableList',
	default: null,
});
