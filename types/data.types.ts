import { type OrderItem, type Customer, type Order } from '@prisma/client';

export interface FormattedOrderData {
	customer: {
		id: string;
		name: string;
		email: string;
	};
	cartItems: Array<{
		id: string;
		name: string;
		menuId: string;
		quantity: number;
		calculatedAmount: string;
	}>;
	restaurantId: string | undefined;
	tableId: string | undefined;
}

export interface ExtendedOrder extends Order {
	customer?: Customer;
	orderItems?: OrderItem[];
}

export interface EarningsData {
	daily: Array<{ day: string; amount: number }>;
	weekly: Array<{ day: string; amount: number }>;
	monthly: Array<{ month: string; amount: number }>;
}
