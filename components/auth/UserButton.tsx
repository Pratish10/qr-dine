'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DialogBox } from '@/components/DialogBox';
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AudioLines, LogOut, Moon, Sun, User, Volume2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

const chillMusicLinks = [
	'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
	'https://www.bensound.com/bensound-music/bensound-goinghigher.mp3',
	'https://www.bensound.com/bensound-music/bensound-dreams.mp3',
	'https://www.bensound.com/bensound-music/bensound-onceagain.mp3',
	'https://www.bensound.com/bensound-music/bensound-november.mp3',
];

export const UserButton = (): JSX.Element => {
	const { data } = useSession();
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const { setTheme, theme } = useTheme();
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
	const [audio] = useState(() => new Audio());

	const avatarFallBack = (data?.user?.name ?? 'Unknown')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.join('');

	const playTrack = (index: number): void => {
		audio.src = chillMusicLinks[index];
		audio.play().catch(() => {
			toast.error('Error playing audio');
		});
		setIsPlaying(true);
	};

	const toggleAudio = (): void => {
		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			playTrack(currentTrackIndex);
		}
	};

	useEffect(() => {
		audio.loop = false;
		audio.onended = () => {
			const nextIndex = (currentTrackIndex + 1) % chillMusicLinks.length;
			setCurrentTrackIndex(nextIndex);
			playTrack(nextIndex);
		};
		audio.onerror = () => {
			toast.error('Audio failed to load.');
		};

		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, [audio, currentTrackIndex]);

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
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2' size={20} />
						<Moon
							className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2'
							size={20}
						/>
						{theme === 'light' ? 'Dark Theme' : 'Light Theme'}
					</DropdownMenuItem>

					<DropdownMenuItem onClick={toggleAudio}>
						{isPlaying ? <AudioLines size={20} className='mr-2 animate-pulse' /> : <Volume2 size={20} className='mr-2' />}
						{isPlaying ? 'Vibing...' : 'Vibe ?'}
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
