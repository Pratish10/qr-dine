import { type RequestStatus } from '@/types/api.types';
import { atom } from 'recoil';

export const dailyEarning = atom<string>({
	key: 'dailyEarning',
	default: '₹0',
});

export const dailyEarningStatus = atom<RequestStatus>({
	key: 'dailyEarningStatus',
	default: 'idle',
});
