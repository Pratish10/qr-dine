export const EMAIL_VERIFICATION = 'Verify Email Address';
export const TWO_FA_CODE = 'Your 2-Factor Authentication Code';
export const PASSWORD_RESET = 'Reset Your Password';

export const PASSWORD_SALT = 10;

export const FREE_MENUS = 15;
export const FREE_RESTAURANTS = 2;
export const FREE_TABLES = 6;
export const FREE_PRICE = 0;
export const FREE_PLAN_ID = '38250b3b-fdab-4f74-97a8-ea4a9b9839b4';

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
		price: 0,
		type: 'free',
		createdAt: '2024-10-19T12:40:04.192Z',
		updatedAt: '2024-10-21T08:17:58.915Z',
	},
	{
		id: '6a19f714-57f6-4e21-9e41-b7f9c21a6d95',
		name: 'Starter',
		description: [
			'Manage up to 40 menus for your growing business',
			'Support seating and service for 12 tables',
			'Operate up to 5 restaurants across locations',
		],
		maxMenus: STARTER_MENUS,
		maxRestaurants: STARTER_RESTAURANTS,
		maxTables: STARTER_TABLES,
		price: STARTER_PRICE,
		type: 'starter',
		createdAt: '2024-10-19T12:40:04.192Z',
		updatedAt: '2024-10-21T08:17:58.915Z',
	},
	{
		id: '54cd0208-9f00-46d9-b67b-d40f548505dc',
		name: 'Pro',
		description: [
			'Manage up to 100 menus with advanced customization',
			'Support for up to 20 tables at a time with priority service',
			'Manage up to 10 restaurants with full operational control',
		],
		maxMenus: PRO_MENUS,
		maxRestaurants: PRO_RESTAURANTS,
		maxTables: PRO_TABLES,
		price: PRO_PRICE,
		type: 'pro',
		createdAt: '2024-10-19T12:40:04.192Z',
		updatedAt: '2024-10-21T08:17:58.915Z',
	},
];
