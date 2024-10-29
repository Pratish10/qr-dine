import { create } from 'zustand';

interface CategoryControllerType<T = unknown> {
	data?: T;
	isOpen: boolean;
	onOpen: (data: T) => void;
	onClose: () => void;
}

export const useCategoryController = create<CategoryControllerType>((set) => ({
	data: undefined,
	isOpen: false,
	onOpen(data) {
		set({ isOpen: true, data });
	},
	onClose() {
		set({ isOpen: false, data: undefined });
	},
}));
