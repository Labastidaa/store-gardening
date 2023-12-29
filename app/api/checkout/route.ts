import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { CartItem } from '@/types/types';

type ProductArray = {
	productId: string,
	qty: number
}

export async function POST(req: NextRequest) {
	try {
		const { cartItems, totalPrice,userId } = await req.json();

		if (!cartItems || cartItems.length === 0) {
			return new NextResponse('Product ids are required', { status: 400 });
		}

		const ProductArray:ProductArray[] = [] ;
		
		cartItems.forEach((item:CartItem) =>{
			ProductArray.push({
				productId: item.productId,
				qty: item.qty});
		});

		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

		cartItems.forEach((item:CartItem) => {
			line_items.push({
				quantity: item.qty,
				price_data: {
					currency: 'USD',
					product_data: {
						name: item.product.name,
					},
					unit_amount: item.product.price * 100,
				},
			});
		});

		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			billing_address_collection: 'required',
			phone_number_collection: {
				enabled: true,
			},
			success_url: `${req.nextUrl.origin}/cart?success=true`,
			cancel_url: `${req.nextUrl.origin}/cart?canceled=true`,
			metadata: {
				productInfo: JSON.stringify(ProductArray),
				userId,
				totalPrice,
			},
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error('Checkout error:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

