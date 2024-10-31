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
};

export const restaurant = atom<RestaurantType>({
	key: 'restaurant',
	default: defaultRestaurant,
});

export const restaurantList = atom<RestaurantType[]>({
	key: 'restaurantList',
	default: [defaultRestaurant],
});

export const restaurantStatus = atom<RequestStatus>({
	key: 'restaurantStatus',
	default: 'idle',
});
