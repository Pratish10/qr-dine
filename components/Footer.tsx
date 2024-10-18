import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer(): JSX.Element {
	return (
		<footer className='bg-gray-100 dark:bg-gray-900'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
				<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
					<div className='space-y-8 xl:col-span-1'>
						<Link href='/' className='flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-8 w-8 mr-2 text-green-600'
							>
								<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
								<path d='M7 2v20' />
								<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
							</svg>
							<span className='font-bold text-xl text-gray-900 dark:text-gray-100'>QR Dine</span>
						</Link>
						<p className='text-gray-600 dark:text-gray-300 text-base'>
							Revolutionizing the dining experience with QR code-based menus and ordering systems.
						</p>
						<div className='flex space-x-6'>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Facebook</span>
								<Facebook className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Twitter</span>
								<Twitter className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Instagram</span>
								<Instagram className='h-6 w-6' />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>LinkedIn</span>
								<Linkedin className='h-6 w-6' />
							</a>
							<a href='mailto:info@foodqrdine.com' className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Email</span>
								<Mail className='h-6 w-6' />
							</a>
						</div>
					</div>
					{/* <div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
						<div className='md:grid md:grid-cols-2 md:gap-8'>
							<div>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Solutions</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											QR Code Menus
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Mobile Ordering
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Analytics
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Integration
										</Link>
									</li>
								</ul>
							</div>
							<div className='mt-12 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Support</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Pricing
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Documentation
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Guides
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											API Status
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className='md:grid md:grid-cols-2 md:gap-8'>
							<div>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Company</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											About
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Blog
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Jobs
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Press
										</Link>
									</li>
								</ul>
							</div>
							<div className='mt-12 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Legal</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Privacy
										</Link>
									</li>
									<li>
										<Link
											href='#'
											className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
										>
											Terms
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div> */}
				</div>
				<div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8'>
					<p className='text-base text-gray-400 xl:text-center'>&copy; 2024 Food QR Dine. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
