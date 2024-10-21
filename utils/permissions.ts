import { FREE_MENUS, FREE_RESTAURANTS, FREE_TABLES, STARTER_MENUS, STARTER_RESTAURANTS, STARTER_TABLES } from '@/config/auth.config';
import { planTypes, type Table, type Menu, type Restaurant } from '@prisma/client';
import { type User } from 'next-auth';

export const canAddMenu = (user: User, menus: Menu[]): boolean => {
	const planLimits = {
		[planTypes.free]: FREE_MENUS,
		[planTypes.starter]: STARTER_MENUS,
	};

	if (user.plan === planTypes.pro) {
		return true;
	}

	// doing +1 because it counts from 0th index
	const menuRecords = menus.length + 1;

	return menuRecords <= planLimits[user.plan];
};

export const canAddTable = (user: User, tables: Table[]): boolean => {
	const planLimits = {
		[planTypes.free]: FREE_TABLES,
		[planTypes.starter]: STARTER_TABLES,
	};

	if (user.plan === planTypes.pro) {
		return true;
	}

	// doing +1 because it counts from 0th index
	const tableRecords = tables.length + 1;

	return tableRecords <= planLimits[user.plan];
};

export const canAddRestaurant = (user: User, restarants: Restaurant[]): boolean => {
	const planLimits = {
		[planTypes.free]: FREE_RESTAURANTS,
		[planTypes.starter]: STARTER_RESTAURANTS,
	};

	if (user.plan === planTypes.pro) {
		return true;
	}

	// doing +1 because it counts from 0th index
	const menuRecords = restarants.length + 1;

	return menuRecords <= planLimits[user.plan];
};
