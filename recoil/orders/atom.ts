import { type RequestStatus } from '@/types/api.types';
import { type Order } from '@prisma/client';
import { atom } from 'recoil';

export const orderStatus = atom<RequestStatus>({
	key: 'orderStatus',
	default: 'idle',
});

export const ordersList = atom<Order[] | null>({
	key: 'ordersList',
	default: null,
});
