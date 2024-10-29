import React from 'react';
import { Skeleton } from './ui/skeleton';

export const TableLoader = (): React.JSX.Element => {
	return (
		<div className='space-y-4'>
			<div className='flex items-center'>
				<div className='flex items-center justify-between'>
					<div className='flex flex-1 items-center space-x-2'>
						<Skeleton className='h-8 w-[150px] lg:w-[250px]' />
						<Skeleton className='h-8 w-[25px] lg:w-[100px]' />
					</div>
				</div>
			</div>
			<div className='rounded-md border'>
				<div className='relative w-full overflow-auto'>
					<div className='w-full caption-bottom text-sm'>
						<Skeleton className='border p-6 bg-gray-200' />
					</div>
					<div className='border'>
						<Skeleton className='h-[60vh]' />
					</div>
				</div>
			</div>
		</div>
	);
};
