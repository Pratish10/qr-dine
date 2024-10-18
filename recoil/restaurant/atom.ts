import { atom } from 'recoil';
import { type RestaurantType } from '@/app/api/restaurant/route';

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
