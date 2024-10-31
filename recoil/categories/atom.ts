import { type RequestStatus } from '@/types/api.types';
import { type Category } from '@prisma/client';
import { atom } from 'recoil';

export const defaultCategory: Category = {
	category: '',
	createdAt: new Date(),
	id: '',
	restaurantId: '',
	updatedAt: new Date(),
};

export const categories = atom<Category[]>({
	key: 'categories',
	default: [defaultCategory],
});

export const categoryStatus = atom<RequestStatus>({
	key: 'categoryStatus',
	default: 'idle',
});
