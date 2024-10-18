import { create } from 'zustand';

interface SheetControllerType<T = unknown> {
	data?: T;
	isOpen: boolean;
	onOpen: (data: T) => void;
	onClose: () => void;
}

export const useTableSheetController = create<SheetControllerType>((set) => ({
	data: undefined,
	isOpen: false,
	onOpen(data) {
		set({ isOpen: true, data });
	},
	onClose() {
		set({ isOpen: false, data: undefined });
	},
}));
