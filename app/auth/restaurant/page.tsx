import { RestaurantForm } from '@/components/auth/restaurant-form';
import APP_PATHS from '@/config/path.config';
import { getRandomQuote } from '@/utils/quotes';
import Image from 'next/image';
import Link from 'next/link';

const Restaurant = (): JSX.Element => {
	const randomQuote = getRandomQuote();

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='mx-auto flex h-full items-center justify-center md:grid lg:grid-cols-2 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-black lg:flex lg:flex-col'>
					<Image
						src='/restaurant.jpg'
						width={1280}
						height={843}
						alt='Restaurant'
						className='absolute inset-0 h-full w-full object-cover z-10 opacity-70'
					/>
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
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2 '>
							<p className='text-lg text-black font-semibold'>&ldquo;{randomQuote.quote}&rdquo;</p>
							<footer className='text-sm text-black font-semibold'>{randomQuote.author}</footer>
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
