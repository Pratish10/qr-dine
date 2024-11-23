import { type RequestStatus } from '@/types/api.types';
import { type Menu } from '@prisma/client';
import { atom } from 'recoil';

export const menuStatus = atom<RequestStatus>({
	key: 'menuStatus',
	default: 'idle',
});

export const menuList = atom<Menu[] | null>({
	key: 'menuList',
	default: null,
});
