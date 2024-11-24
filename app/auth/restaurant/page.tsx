import { RestaurantForm } from '@/components/auth/restaurant-form';
import APP_PATHS from '@/config/path.config';
import { getRandomQuote } from '@/utils/quotes';
import Image from 'next/image';
import Link from 'next/link';

const Restaurant = (): JSX.Element => {
	const randomQuote = getRandomQuote();

	return (
		<div className='min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50'>
			{/* Left Section */}
			<div className='relative hidden lg:flex flex-col bg-muted w-full max-w-md lg:max-w-xl h-full p-8 lg:p-10 text-black'>
				{/* Background Image */}
				<Image
					src='/restaurant.jpg'
					width={1280}
					height={843}
					alt='Restaurant'
					className='absolute inset-0 w-full h-full object-cover z-10 opacity-70'
				/>
				{/* Overlay Content */}
				<div className='relative z-20 flex items-center text-lg font-medium gap-2 mb-auto'>
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
					<Link href={APP_PATHS.DASHBOARD} className='text-black font-bold'>
						QR Dine
					</Link>
				</div>
				{/* Quote */}
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg text-black font-semibold'>&ldquo;{randomQuote.quote}&rdquo;</p>
						<footer className='text-sm text-black font-semibold'>{randomQuote.author}</footer>
					</blockquote>
				</div>
			</div>

			{/* Right Section */}
			<div className='flex flex-1 flex-col items-center justify-center p-6 sm:p-10 lg:p-16 w-full max-w-lg'>
				<div className='w-full space-y-6'>
					<div className='text-center'>
						<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight'>Register Restaurant</h1>
					</div>
					{/* Restaurant Form */}
					<RestaurantForm />
				</div>
			</div>
		</div>
	);
};

export default Restaurant;
