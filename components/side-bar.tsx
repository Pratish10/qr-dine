'use client';
import React from 'react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface SideBarProps {
	items: Array<{
		id: number;
		name: string;
		Component: React.ComponentType;
		href: string;
	}>;
	isCollapsed: boolean;
}

export const SidebarItems = ({ items, isCollapsed }: SideBarProps): React.JSX.Element => {
	const pathname = usePathname();

	return (
		<React.Fragment>
			{items.map((item) => {
				const isActive = pathname === item.href;

				return (
					<TooltipProvider key={item.id}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={clsx(
										'flex items-center rounded-lg p-3 text-center transition-all duration-300',
										isActive ? 'bg-green-600/15 text-green-500' : 'hover:bg-green-600/5 hover:text-green-500',
										isCollapsed ? 'justify-center' : 'gap-2'
									)}
								>
									<item.Component />
									{!isCollapsed && <span className='text-lg font-medium tracking-tight pl-3'>{item.name}</span>}
								</Link>
							</TooltipTrigger>
							{isCollapsed && (
								<TooltipContent side='right' sideOffset={4}>
									<p>{item.name}</p>
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</React.Fragment>
	);
};
