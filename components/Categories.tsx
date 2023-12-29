'use client';

import React from 'react';

import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ChevronRight, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

const CategoriesSection = () => {
	return (
		<div className='my-10 flex w-[90%] flex-col items-center space-y-5'>
			<h1 className='flex flex-col justify-center py-5 text-3xl font-bold md:pb-20 md:text-3xl lg:text-5xl'>
				Categories
			</h1>

			<div className='flex w-full flex-col gap-5 lg:flex-row'>
				<Link
					href={'/categories/393c1b32-37be-4ce2-b83e-f818067c215f'}
					className={cn(
						buttonVariants({ variant: 'secondary' }),
						'grid h-[150px] w-full grid-cols-2 grid-rows-2 rounded-[24px] border-none bg-[#badcab] p-5 text-black/80 transition-all duration-700 hover:bg-[#a3df89] hover:text-black md:h-[200px] lg:w-2/3 xl:p-10'
					)}
				>
					<div className='flex h-full w-full items-start '>
						<h3 className='text-3xl font-bold xl:text-5xl'>Seeds</h3>
					</div>
					<div className='col-start-2 row-start-2 flex h-full w-full items-end justify-end'>
						<ChevronRight className='h-10 w-10' />
					</div>
				</Link>

				<Link
					href={'/categories/36b29cb1-7ec7-4393-b47a-da10bec3eff5'}
					className={cn(
						buttonVariants({ variant: 'secondary' }),
						'grid h-[150px] w-full grid-cols-2 grid-rows-2 rounded-[24px] border-none bg-[#badcab] p-5 text-black/80 transition-all duration-700 hover:bg-[#a3df89] hover:text-black md:h-[200px] lg:w-1/3 xl:p-10'
					)}
				>
					<div className='flex h-full w-full items-start '>
						<h3 className='text-3xl font-bold xl:text-5xl '>Substrates</h3>
					</div>
					<div className='col-start-2 row-start-2 flex h-full w-full items-end justify-end'>
						<ChevronRight className='h-10 w-10' />
					</div>
				</Link>
			</div>

			<div className='flex w-full flex-col gap-5 lg:flex-row'>
				<div className='flex w-full flex-col gap-5 lg:w-2/3 lg:flex-row'>
					<Link
						href={'/categories/2008ccfb-6f9d-4f88-ae28-2f38d31f9fb3'}
						className={cn(
							buttonVariants({ variant: 'secondary' }),
							'grid h-[150px] w-full grid-cols-2 grid-rows-2 rounded-[24px] border-none bg-[#badcab] p-5 text-black/80 transition-all duration-700 hover:bg-[#a3df89] hover:text-black md:h-[200px] xl:p-10'
						)}
					>
						<div className='flex h-full w-full items-start '>
							<h3 className='text-3xl font-bold xl:text-5xl '>Nutrients</h3>
						</div>
						<div className='col-start-2 row-start-2 flex h-full w-full items-end justify-end'>
							<ChevronRight className='h-10 w-10' />
						</div>
					</Link>

					<Link
						href={'/categories/9e3a4381-35d2-402c-abbe-0e62f5259c7f'}
						className={cn(
							buttonVariants({ variant: 'secondary' }),
							'grid h-[150px] w-full grid-cols-2 grid-rows-2 rounded-[24px] border-none bg-[#badcab] p-5 text-black/80 transition-all duration-700 hover:bg-[#a3df89] hover:text-black md:h-[200px] xl:p-10'
						)}
					>
						<div className='flex h-full w-full items-start '>
							<h3 className='text-3xl font-bold xl:text-5xl '>Containers</h3>
						</div>
						<div className='col-start-2 row-start-2 flex h-full w-full items-end justify-end'>
							<ChevronRight className='h-10 w-10' />
						</div>
					</Link>
				</div>

				<Link
					href={'/categories/78404cae-d721-4d56-89b9-afe98c7f63aa'}
					className={cn(
						buttonVariants({ variant: 'secondary' }),
						'hover:bg-foreground-accent grid h-[150px] w-full grid-cols-2 grid-rows-2 rounded-[24px] border-none bg-[#badcab] p-5 text-black/80 drop-shadow-sm transition-all duration-700 hover:bg-[#a3df89] hover:text-black md:h-[200px] lg:w-1/3 xl:p-10'
					)}
				>
					<div className='flex h-full w-full items-start '>
						<h3 className='text-3xl font-bold xl:text-5xl '>Tools</h3>
					</div>
					<div className='col-start-2 row-start-2 flex h-full w-full items-end justify-end'>
						<ChevronRight className='h-10 w-10' />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default CategoriesSection;
