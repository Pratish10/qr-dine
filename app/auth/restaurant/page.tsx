import { RestaurantForm } from '@/components/auth/restaurant-form';
import Image from 'next/image';

const Restaurant = (): JSX.Element => {
	return (
		<div className='h-screen'>
			<div className='md:hidden'>
				<Image src='/examples/authentication-light.png' width={1280} height={843} alt='Authentication' className='block dark:hidden' />
				<Image src='/examples/authentication-dark.png' width={1280} height={843} alt='Authentication' className='hidden dark:block' />
			</div>
			<div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='relative z-20 flex items-center text-lg font-medium'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-6 w-6 text-green-600'
						>
							<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
							<path d='M7 2v20' />
							<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
						</svg>
						QR Dine
					</div>
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
						<RestaurantForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Restaurant;
