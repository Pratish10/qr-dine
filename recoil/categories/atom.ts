import { atom } from 'recoil';

export const defaultCategory = {
	label: '',
	value: '',
};

export const categories = atom<Array<{ label: string; value: string }>>({
	key: 'categories',
	default: [defaultCategory],
});
