import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Controll = () => {
	return (
		<div className='grid h-full w-[90%] grid-flow-row grid-cols-1 gap-3 gap-y-2.5 lg:w-[90%] lg:grid-cols-2 2xl:w-[80%] '>
			<Link href={'admin/categories'} className='col-span-2 lg:col-span-1'>
				<Button
					variant={'outline'}
					className='flex h-[200px] w-full flex-col items-start justify-center gap-y-1 p-5'
				>
					<div className='flex items-center justify-center gap-2'>
						<h2 className='align-middle text-3xl font-semibold tracking-tight lg:text-5xl'>
							Categories
						</h2>
					</div>
					<p className='text-sm text-muted-foreground'>Manage categories</p>
				</Button>
			</Link>

			<Link href={'/admin/products'} className='col-span-2 flex lg:col-span-1'>
				<Button
					variant={'outline'}
					className='flex h-[200px] w-full flex-col items-start justify-center gap-y-1 p-5'
				>
					<div className='flex flex-col items-center justify-center gap-2 text-left'>
						<h2 className='align-middle text-3xl font-semibold tracking-tight lg:text-5xl'>
							Products
						</h2>
					</div>
					<p className='text-left text-muted-foreground'>Manage products</p>
				</Button>
			</Link>

			{/* <Link href={'/'} className='col-span-2 flex'>
				<Button
					variant={'outline'}
					className='flex h-[200px] w-full flex-col items-start justify-center gap-y-1 p-5'
				>
					<div className='flex items-center justify-center gap-2'>
						<span className='hidden lg:flex'>
							<Kanban size={60} />
						</span>
						<h2 className='align-middle text-3xl font-semibold tracking-tight lg:text-5xl'>
							Overview
						</h2>
					</div>
				</Button>
			</Link> */}
		</div>
	);
};

export default Controll;
