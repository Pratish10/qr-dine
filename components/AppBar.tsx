'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { sideBarOptions } from '@/config/sideBar.config';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SidebarItems } from '@/components/side-bar-items';

export const AppBar = (): JSX.Element => {
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
		expanded: { width: '16rem' },
		collapsed: { width: '5rem' },
	};

	return (
		<React.Fragment>
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
				className={cn(
					'fixed left-0 top-0 z-[50] hidden h-full flex-col border-r',
					'border-green-200 bg-gradient-to-br from-green-50 to-green-100',
					'dark:border-slate-800 dark:from-slate-900 dark:to-slate-800',
					'2xl:flex shadow-lg'
				)}
			>
				<div className='flex h-full flex-col gap-4'>
					<div
						className={cn('flex w-full items-center border-b border-green-200 dark:border-green-700 px-2 py-4 gap-2', {
							'justify-end': !isCollapsed,
							'justify-center': isCollapsed,
						})}
					>
						<Button
							variant='outline'
							onClick={toggleCollapse}
							size='icon'
							className='rounded-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-600'
						>
							<motion.div
								className='flex items-center p-2 transition-all duration-300'
								initial={false}
								animate={{ rotate: isCollapsed ? 0 : 180 }}
							>
								{isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
				<div
					className={cn(
						'flex items-center justify-around border-t border-green-200',
						'bg-gradient-to-r from-green-50 to-green-100 p-4 shadow-lg',
						'dark:border-slate-800 dark:from-slate-900 dark:to-slate-800'
					)}
				>
					<SidebarItems items={sideBarOptions} isCollapsed={!isMediumToXL} />
				</div>
			</motion.nav>
		</React.Fragment>
	);
};
