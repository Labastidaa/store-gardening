import React from 'react';
import OrderTable from './order-table';
import type { orders } from '../page';

const OrdersClient = ({ orders }: { orders: orders }) => {
	return (
		<div className='my-5 flex w-full flex-col items-center justify-center space-y-20'>
			{orders.length === 0 ? (
				<p>No orders have been placed yet.</p>
			) : (
				orders.map((order) => (
					<div
						key={order.id}
						className='flex w-[90%] items-center justify-center'
					>
						<OrderTable order={order} />
					</div>
				))
			)}
		</div>
	);
};

export default OrdersClient;
