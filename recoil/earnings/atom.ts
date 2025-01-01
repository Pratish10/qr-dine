import { type RequestStatus } from '@/types/api.types';
import { type EarningsData } from '@/types/data.types';
import { atom } from 'recoil';

export const earnings = atom<EarningsData | null>({
	key: 'earnings',
	default: null,
});

export const earningStatus = atom<RequestStatus>({
	key: 'earningStatus',
	default: 'idle',
});
