'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import clsx from 'clsx';
import { SidebarItems } from './side-bar';
import { sideBarOptions } from '@/config/sideBar.config';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const AppBar = (): React.JSX.Element => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const toggleCollapse = (): void => {
		setIsCollapsed((prev) => !prev);
	};

	const isMediumToXL = useMediaQuery('(min-width: 768px) and (max-width: 1535px)');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const sidebarVariants = {
		expanded: { width: '12vw' },
		collapsed: { width: '4vw' },
	};

	return (
		<>
			<motion.nav
				initial={false}
				animate={isMounted && (isCollapsed ? 'collapsed' : 'expanded')}
				variants={sidebarVariants}
				transition={{
					duration: 0.3,
					type: 'spring',
					stiffness: 200,
					damping: 20,
				}}
				className='fixed left-0 top-0 z-[50] hidden h-full flex-col border-r border-primary/10 bg-white dark:bg-neutral-950 2xl:flex'
			>
				<div className='flex h-full flex-col gap-4'>
					<div
						className={clsx('flex w-full items-center border-primary/10 px-2 py-4 gap-2', {
							'justify-end': !isCollapsed,
							'justify-center': isCollapsed,
						})}
					>
						<Button variant='green' onClick={toggleCollapse} size='icon' className='rounded-full'>
							<motion.div className='flex items-center p-3 text-center transition-all duration-300'>
								{isCollapsed ? <ChevronLeft /> : <ChevronRight />}
							</motion.div>
						</Button>
					</div>
					<div className='flex flex-col gap-6 p-2'>
						<SidebarItems items={sideBarOptions} isCollapsed={isCollapsed} />
					</div>
				</div>
			</motion.nav>

			<motion.nav
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className='fixed bottom-0 left-0 right-0 z-[999] 2xl:hidden'
			>
				<div className='flex items-center justify-around border-primary/10 bg-white dark:bg-neutral-950 2xl:flex p-4'>
					<SidebarItems items={sideBarOptions} isCollapsed={!isMediumToXL} />
				</div>
			</motion.nav>
		</>
	);
};
