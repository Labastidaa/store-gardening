'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';

import { CartItem } from '@/types/types';
import { useDeleteCart } from '@/app/hooks/Cart/useCart';

const CartItem: React.FC<CartItem> = (item) => {
	const mutation = useDeleteCart(item);

	const onRemove = () => {
		mutation.mutate();
	};

	return (
		<li className='flex h-auto rounded-[24px] bg-card p-2 drop-shadow-sm md:h-auto md:p-3'>
			<div className='relative flex h-20 w-20 flex-shrink-0 md:min-h-[150px] md:w-[150px]'>
				<Image
					fill
					sizes='(max-width: 700px) 100vw'
					src={item.product.images[0].url}
					alt={'cart-item'}
					className='rounded-[19px] object-cover object-center sm:rounded-[20px]'
				/>
			</div>

			<div className='ml-3 flex h-auto w-full flex-col md:ml-4 md:flex-row'>
				<div className='flex w-full flex-col md:flex-row'>
					<div className='flex w-full flex-col items-start justify-start text-center'>
						<p className='text-start text-base font-semibold text-foreground md:text-xl'>
							{item.product.name}
						</p>

						<div className='no-scrollbar mt-1 max-h-20 w-full overflow-y-scroll text-left text-xs sm:flex  sm:h-auto md:h-auto md:w-auto md:text-base'>
							<p className='text-foreground/50'>{item.product.description}</p>
						</div>
					</div>

					<div className='flex items-center justify-start space-x-5 py-5 font-semibold md:flex-col md:justify-center md:px-10'>
						<p className='font-mono font-semibold text-foreground md:text-base'>
							<Currency value={item.product.price} />
						</p>
						<span className='text-foreground/60'>x{item.qty}</span>
					</div>
				</div>

				<div className='flex w-auto items-center justify-end sm:relative md:items-center md:justify-end'>
					<Button
						onClick={onRemove}
						variant={'outline'}
						className='h-4 w-auto rounded-full  border-none bg-transparent p-5 hover:bg-inherit md:h-auto md:flex-col md:p-0'
					>
						<span className='text-red-400 hover:text-red-500'>Remove</span>
					</Button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
