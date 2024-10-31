import { type RequestStatus } from '@/types/api.types';
import { type Menu } from '@prisma/client';
import { atom } from 'recoil';

const defaultMenu: Menu = {
	id: '',
	menuId: '',
	name: '',
	description: '',
	type: 'Vegeterian',
	image: [],
	category: '',
	amount: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	isFeatured: false,
	availability: 'Available',
	restaurantId: '',
};

export const menuStatus = atom<RequestStatus>({
	key: 'menuStatus',
	default: 'idle',
});

export const menuList = atom<Menu[]>({
	key: 'menuList',
	default: [defaultMenu],
});
