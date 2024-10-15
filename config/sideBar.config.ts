import { LayoutDashboard, Salad, User } from 'lucide-react';
import APP_PATHS from './path.config';

export const sideBarOptions = [
	{ id: 1, name: 'Dashboard', Component: LayoutDashboard, href: APP_PATHS.DASHBOARD },
	{ id: 2, name: 'Menus', Component: Salad, href: APP_PATHS.MENUS },
	{ id: 3, name: 'Profile', Component: User, href: APP_PATHS.PROFILE },
];
