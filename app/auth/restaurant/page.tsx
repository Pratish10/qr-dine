import { RestaurantForm } from '@/components/restaurant-form';
import { useCurrentSession } from '@/hooks/useCurrentSession';
import Image from 'next/image';

const Restaurant = async (): Promise<JSX.Element> => {
	const user = await useCurrentSession();

	return (
		<div className='h-screen'>
			<div className='md:hidden'>
				<Image src='/examples/authentication-light.png' width={1280} height={843} alt='Authentication' className='block dark:hidden' />
				<Image src='/examples/authentication-dark.png' width={1280} height={843} alt='Authentication' className='hidden dark:block' />
			</div>
			<div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='relative z-20 flex items-center text-lg font-medium'>Food Ordering System</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p className='text-lg'>
								&ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster
								than ever before.&rdquo;
							</p>
							<footer className='text-sm'>Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>Register Restaurant</h1>
						</div>
						{/* @ts-expect-error using ts-ignore beacuse of the isTwoEnabled property */}
						<RestaurantForm user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Restaurant;