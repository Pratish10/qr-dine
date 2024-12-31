import { atom } from 'recoil';
import { type RestaurantType } from '@/app/api/restaurant/route';
import { type RequestStatus } from '@/types/api.types';

export const defaultRestaurant: RestaurantType = {
	id: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	fullName: '',
	branchName: '',
	userId: '',
	restaurantId: '',
	ClientName: '',
};

export const restaurant = atom<RestaurantType>({
	key: 'restaurant',
	default: defaultRestaurant,
});

export const restaurantList = atom<RestaurantType[] | null>({
	key: 'restaurantList',
	default: [],
});

export const restaurantStatus = atom<RequestStatus>({
	key: 'restaurantStatus',
	default: 'idle',
});
