import { Badge } from '@/components/ui/badge';
import Currency from '@/components/ui/currency';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Image {
	id: string;
	productId: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Product {
	id: string;
	name: string;
	description: string;
	isFeatured: boolean;
	isArchived: boolean;
	price: number;
	sku: number;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	images: Image[];
}

interface OrderItem {
	id: string;
	qty: number;
	orderId: string;
	productId: string;
	product: Product;
}

interface User {
	id: string;
	clerkId: string;
	fullName: string;
	email: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Order {
	id: string;
	isPaid: boolean;
	phone: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string | null;
	total: number;
	user: User | null;
	orderItems: OrderItem[];
}

interface OrderTableProps {
	order: Order;
}

// interface OrderProps {
// 	order: Order & {
// 		user: User;
// 		orderItems: Array<
// 			OrderItem & {
// 				product: Product & {
// 					images: Array<ProductImage>;
// 				};
// 			}
// 		>;
// 	};
// }

const OrderTable: React.FC<OrderTableProps> = ({ order }) => {
	return (
		<table className='no-scrollbar flex h-auto w-full flex-col overflow-scroll rounded-[24px] border-0 bg-secondary'>
			<thead className='no-scrollbar grid h-auto grid-cols-2 items-center justify-center gap-2 overflow-x-scroll rounded-t-[24px] border-b p-5 md:grid-flow-col-dense md:grid-cols-1 md:space-x-5 lg:h-[100px]'>
				<tr className='col-span-2 w-auto'>
					<th className='flex flex-col text-left'>
						ORDER ID
						<span className='mt-2 font-normal'># {order.id}</span>
					</th>
				</tr>
				<tr className='col-span-1 w-full'>
					<th className='flex w-full flex-col'>
						ORDER DATE
						<span className='mt-2 font-normal'>
							{order.createdAt.toLocaleDateString()}
						</span>
					</th>
				</tr>
				<tr>
					<th className='flex flex-col  items-center'>
						PAYMENT
						<Badge
							variant={'outline'}
							className='mt-2 border-2 border-lime-500'
						>
							{order.isPaid === true ? 'Done' : 'Pending...'}
						</Badge>
					</th>
				</tr>
				<tr>
					<th className='flex flex-col items-center'>
						TOTAL
						<span className='mt-2'>
							<Currency value={order.total} />
						</span>
					</th>
				</tr>
				<tr>
					<th className='flex flex-col items-center'>
						ITEMS
						<span className='mt-2 font-normal'>
							{' '}
							{order.orderItems.reduce(
								(total, orderItem) => total + orderItem.qty,
								0
							)}
						</span>
					</th>
				</tr>
			</thead>

			<thead>
				<tr className='no-scrollbar flex h-[70px] w-full items-center space-x-5 border-x bg-background px-5'>
					<th className='flex h-full w-[50px] items-center justify-center '></th>
					<th
						className='flex h-full w-[400px] items-center justify-center '
						scope='col'
					>
						PRODUCTS
					</th>
					<th
						scope='col'
						className='flex h-full w-[100px] items-center justify-center '
					>
						PRICE
					</th>
					<th
						scope='col'
						className='flex h-full w-[100px] items-center justify-center '
					>
						QTY
					</th>
				</tr>
			</thead>

			<tbody className='no-scrollbar flex h-auto w-full flex-col items-start rounded-b-[24px] border bg-background'>
				{order.orderItems.map((item, index) => (
					<React.Fragment key={item.id}>
						<tr className='no-scrollbar flex h-auto w-full items-center justify-start space-x-5 overflow-x-scroll p-5'>
							<td className='relative flex h-[50px] min-w-[50px] rounded-[20px] md:h-[50px] md:w-[50px]'>
								<Image
									fill
									sizes='max-width(100px)'
									src={`${item.product.images[0].url}`}
									alt='product-image'
									className='rounded-[10px] '
								/>
							</td>
							<td className='w-[400px] flex-nowrap'>
								<Link
									href={`/products/${item.productId}`}
									className='nowrap hover:underline'
								>
									{item.product.name}
								</Link>
							</td>
							<td className='w-[100px]  text-center'>
								<Currency value={item.product.price}></Currency>
							</td>
							<td className='w-[100px] text-center'>
								<span>{item.qty}</span>
							</td>
						</tr>
						{/* checks whether the current item is the last one in the orderItems array. If it's not the last one, it renders a <tr> with a border to create a line separator. */}
						{index !== order.orderItems.length - 1 && (
							<tr className='w-full border-b'></tr>
						)}
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default OrderTable;
