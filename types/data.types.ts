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
