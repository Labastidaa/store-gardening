import React from 'react';
import CartClientPage from './components/cart-client';

const CartPage = async () => {
	return (
		<div className='no-scrollbar min-h-[100vh] w-full'>
			<div className='px-4 py-16 sm:px-6 lg:px-8'>
				<h1 className='text-center text-3xl font-bold text-foreground sm:text-start sm:text-5xl'>
					Shopping Cart
				</h1>
				<CartClientPage />
			</div>
		</div>
	);
};

export default CartPage;
