'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DialogBox } from '@/components/DialogBox';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

export const UserButton = (): React.JSX.Element => {
	const { data } = useSession();
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const { setTheme, theme } = useTheme();

	const avatarFallBack = (data?.user?.name ?? 'Unknown')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('');

	return (
		<React.Fragment>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Avatar className='border border-black'>
									<AvatarImage src={data?.user?.image ?? ''} />
									<AvatarFallback>{avatarFallBack}</AvatarFallback>
								</Avatar>
							</TooltipTrigger>
							<TooltipContent>{data?.user?.name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Link href={APP_PATHS.PROFILE}>
						<DropdownMenuItem>
							<User size={20} className='mr-2' />
							Profile
						</DropdownMenuItem>
					</Link>

					<DropdownMenuItem
						onClick={() => {
							setTheme(theme === 'light' ? 'dark' : 'light');
						}}
					>
						{' '}
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2' size={20} />
						<Moon
							className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2'
							size={20}
						/>
						{theme === 'light' ? 'Dark Theme' : 'Light Theme'}
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						onClick={() => {
							setShowDialog(true);
						}}
					>
						<LogOut size={20} className='mr-2' />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogBox
				header='Logout'
				content={<React.Fragment>Are you sure you want to logout?</React.Fragment>}
				show={showDialog}
				onClose={() => {
					setShowDialog(false);
				}}
				onAction={() => {
					void (async () => {
						await signOut();
					})();
				}}
				onActionButtonLabel='Logout'
			/>
		</React.Fragment>
	);
};
