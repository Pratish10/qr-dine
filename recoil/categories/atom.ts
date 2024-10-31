import { type RequestStatus } from '@/types/api.types';
import { type Category } from '@prisma/client';
import { atom } from 'recoil';

export interface CategoriesType extends Category {
	value: string;
	label: string;
}

export const defaultCategory: CategoriesType = {
	category: '',
	createdAt: new Date(),
	id: '',
	restaurantId: '',
	updatedAt: new Date(),
	value: '',
	label: '',
};

export const categories = atom<CategoriesType[]>({
	key: 'categories',
	default: [defaultCategory],
});

export const categoryStatus = atom<RequestStatus>({
	key: 'categoryStatus',
	default: 'idle',
});
