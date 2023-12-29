import React from 'react';
import OrdersClient from './components/client';
import { NextResponse } from 'next/server';
import { getOrders } from './components/get-orders';
import { Prisma } from '@prisma/client';

export type orders = Prisma.PromiseReturnType<typeof getOrders>;

const OrdersPage = async () => {
	const orders: orders = await getOrders();

	if (!orders) {
		return new NextResponse('NO ORDERS FOUND');
	}

	return (
		<div className='items-left flex h-auto min-h-screen max-w-full flex-col items-center justify-start'>
			<h1 className='m-10 w-[90%] text-left text-3xl font-bold'>
				Your previous orders
			</h1>
			<div className='flex h-auto w-full'></div>
			<OrdersClient orders={orders} />
		</div>
	);
};

export default OrdersPage;
