'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';

export const AppBar = (): React.JSX.Element => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const toggleCollapse = (): void => {
		setIsCollapsed(!isCollapsed);
	};
	return (
		<>
			<div className='fixed left-0 top-0 z-[999] hidden h-full flex-col border-r border-primary/10 bg-background dark:bg-background 2xl:flex'>
				<div className='flex h-full flex-col gap-4'>
					<div className='flex w-full items-center border-primary/10 px-2 py-4 gap-2'>
						<div>
							<Button
								size='icon'
								onClick={toggleCollapse}
								className='ml-auto flex items-center p-3 text-center transition-all duration-300 rounded-full'
							>
								{isCollapsed ? <ChevronLeft /> : <ChevronRight />}
							</Button>
						</div>
						<div>{!isCollapsed && <h3 className='text-base tracking-tighter text-primary lg:text-xl'>Menu</h3>}</div>
					</div>
					<div className='flex flex-col gap-8 p-2'>sidebars items</div>
				</div>
			</div>
			<div className='fixed bottom-0 left-0 right-0 z-[999] 2xl:hidden'>
				<div className='flex items-center justify-around border-t border-primary/10 bg-background p-4 shadow-xl'>sidebars items mobile</div>
			</div>
		</>
	);
};
