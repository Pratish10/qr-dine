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

export interface CustomOrderItem {
	id: string;
	orderId: string;
	menuId: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

export interface CustomCustomer {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CustomOrder {
	id: string;
	restaurantId: string;
	isPaid: boolean;
	orderNumber: string;
	orderDate: Date;
	updatedAt: Date;
	tableId: string;
	customerId: string;
	orderItems: OrderItem[];
	customer: Customer;
}
