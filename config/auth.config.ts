export const EMAIL_VERIFICATION = 'Verify Email Address';
export const TWO_FA_CODE = 'Your 2-Factor Authentication Code';
export const PASSWORD_RESET = 'Reset Your Password';

export const PASSWORD_SALT = 10;

export const FREE_MENUS = 15;
export const FREE_RESTAURANTS = 2;
export const FREE_TABLES = 6;
export const FREE_PRICE = 0;

export const STARTER_MENUS = 40;
export const STARTER_RESTAURANTS = 5;
export const STARTER_TABLES = 12;
export const STARTER_PRICE = 499;

export const PRO_MENUS = 100;
export const PRO_RESTAURANTS = 10;
export const PRO_TABLES = 20;
export const PRO_PRICE = 999;

export const PLANS = [
	{
		id: '38250b3b-fdab-4f74-97a8-ea4a9b9839b4',
		name: 'Free Tier',
		description: ['Manage up to 15 menus for your restaurants', 'Handle service for up to 6 tables at a time', 'Support for up to 2 restaurants'],
		maxMenus: FREE_MENUS,
		maxRestaurants: FREE_RESTAURANTS,
		maxTables: FREE_TABLES,
		price: FREE_PRICE,
		createdAt: '2024-10-19 12:40:04.192',
		updatedAt: '2024-10-19 12:40:04.192',
		type: 'free',
	},
	{
		id: '6a19f714-57f6-4e21-9e41-b7f9c21a6d95',
		name: 'Starter',
		description: [
			'Manage up to 40 menus for your growing business',
			'Support seating and service for 12 tables',
			'Operate up to 5 restaurants across locations',
		],
		maxMenus: 40,
		maxRestaurants: 5,
		maxTables: 12,
		price: 499,
		createdAt: '2024-10-19 12:40:04.192',
		updatedAt: '2024-10-19 12:40:04.192',
		type: 'starter',
	},
	{
		id: '54cd0208-9f00-46d9-b67b-d40f548505dc',
		name: 'Pro',
		description: [
			'Manage up to 100 menus with advanced customization',
			'Support for up to 20 tables at a time with priority service',
			'Manage up to 10 restaurants with full operational control',
		],
		maxMenus: 100,
		maxRestaurants: 10,
		maxTables: 20,
		price: 999,
		createdAt: '2024-10-19 12:40:04.192',
		updatedAt: '2024-10-19 12:40:04.192',
		type: 'pro',
	},
];
