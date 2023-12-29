'use client';
import axios from 'axios';
import React from 'react';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { Cart, CartItem } from '@/types/types';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

const Summary = ({ cart }: { cart: Cart | undefined }) => {
	const totalPrice = cart?.CartItem.reduce((total, item) => {
		return total + Number(item.product.price * item.qty);
	}, 0);

	const CartItems = cart?.CartItem.map((item) => item);

	const onCheckout = async () => {
		try {
			const response = await axios.post('/api/checkout', {
				cartItems: CartItems as CartItem[],
				userId: cart?.userId,
				totalPrice,
			});
			window.location = response.data.url;
		} catch (error) {
			console.error('Checkout error:', error);
		}
	};

	return (
		<div className='sm: mt-16 rounded-[24px] bg-card px-4 py-6 sm:p-3 lg:mt-0 lg:w-[40%]'>
			<h2 className='p-2 text-2xl font-semibold text-foreground sm:text-3xl'>
				Order summary
			</h2>
			<div className='my-5 flex w-full flex-col items-end space-y-4 p-2'>
				{cart?.CartItem.map((item) => (
					<div
						key={item.id}
						className='flex w-full justify-between text-base text-foreground'
					>
						<span>{item.product.name}</span>
						<div className='flex'>
							<div className='flex flex-row text-sm font-bold text-foreground/60'>
								<span>({item.qty}x</span>
								<span>{item.product.price})</span>
							</div>
							<span className='pl-2 font-bold'>
								${item.qty * item.product.price}
							</span>
						</div>
					</div>
				))}

				<Separator />
				<div className=' flex w-full flex-col items-end justify-between'>
					<div className='text-xl font-bold text-foreground'>TOTAL</div>
					<div className='sm:text-1xl text-xl font-semibold text-accent-foreground'>
						<Currency value={totalPrice} />
					</div>
				</div>
			</div>
			<Button
				variant={'default'}
				onClick={onCheckout}
				disabled={cart?.CartItem.length === 0}
				className='mt-6 h-[50px] w-full border-spacing-2 rounded-[21px] text-base hover:text-lime-600'
			>
				<span className='!text-background'>Checkout</span>
				<CreditCard className='text-bold ml-5' size={27} />
			</Button>
		</div>
	);
};

export default Summary;
