import { planTypes, type Plan } from '@prisma/client';
import { atom } from 'recoil';

export const defaultPlan: Plan = {
	id: '',
	name: '',
	description: [],
	maxMenus: 0,
	maxRestaurants: 0,
	maxTables: 0,
	price: 0,
	type: planTypes.free,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const plans = atom<Plan[]>({
	key: 'plans',
	default: [defaultPlan],
});
