import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

type ProductArray = {
	productId: string;
	qty: number;
};

class WebhookError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'WebhookError';
	}
}

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		console.log('Received webhook event:', event);
	} catch (error) {
		if (error instanceof WebhookError) {
			return new NextResponse(`Webhook Error: ${error.message}`, {
				status: 400,
			});
		} else {
			throw error;
		}
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;

	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country,
	];

	const addressString = addressComponents.filter((c) => c !== null).join(', ');

	if (event.type === 'checkout.session.completed') {
		const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
			event.data.object.id,
			{
				expand: ['line_items'],
			}
		);

		const lineItems = sessionWithLineItems.line_items;

		if (!lineItems) {
			return new NextResponse('NO LINE ITEMS FOUND');
		}

		const metadataProduct = session?.metadata?.productInfo;

		if (!metadataProduct) {
			return new NextResponse('Product IDs not found in metadata', {
				status: 400,
			});
		}

		const productArray = JSON.parse(metadataProduct) as ProductArray[];
		const userId = session?.metadata?.userId;

		if (!userId) {
			console.error('User ID not found in metadata');
			return new NextResponse('userId not found in metadata', {
				status: 400,
			});
		}

		const totalPrice = session?.metadata?.totalPrice;
		if (!totalPrice) {
			console.error('Total price not found in metadata');
			return new NextResponse('Total price not found in metadata', {
				status: 400,
			});
		}

		const totalPriceNumber = Number(totalPrice);

		const Cart = await prisma.cart.findUnique({
			where: {
				userId,
			},
			include: {
				CartItem: true,
			},
		});

		if (!Cart) {
			return new NextResponse('User cart not found', { status: 404 });
		}

		const cartId = Cart.id;

		const createdOrder = await prisma.order.create({
			data: {
				isPaid: true,
				address: addressString,
				userId: userId,
				phone: session?.customer_details?.phone || '',
				total: totalPriceNumber,
			},

			include: {
				user: true,
			},
		});

		const orderItems = await prisma.orderItem.createMany({
			data: productArray?.map((item) => ({
				orderId: createdOrder?.id,
				qty: item.qty,
				productId: item.productId,
			})),
		});

		const CartCleared = await prisma.cartItem.deleteMany({
			where: {
				cartId: cartId,
			},
		});

		console.log('WH ORDER CREATED (no items included yet):', createdOrder);
		console.log('ORDER ITEMS: ', orderItems);
		console.log('ITEMS DELETED:', CartCleared);
	}

	return new NextResponse(null, { status: 200 });
}
