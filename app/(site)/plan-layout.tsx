'use client';
import { useGetPlans } from '@/hooks/plans/use-get-plans';
import { Loader2 } from 'lucide-react';

const PlanLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const { isLoading } = useGetPlans();

	if (isLoading) {
		<div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
			<Loader2 className='h-8 w-8 animate-spin' />
		</div>;
	}

	return <div>{children}</div>;
};

export default PlanLayout;
