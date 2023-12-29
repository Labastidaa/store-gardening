import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
	try {
		const {userId} = auth();

		 if (!userId) {
		 	return NextResponse.json('Unauthenticated', { status: 403 });
		 }

		const cart = await prisma.cart.findUnique({
			where: {
				userId: userId,
			},
			include: {
				CartItem: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
					},
				},
				user: true,
			},
		});

		if (!cart) {
			return NextResponse.json('Cart not found', { status: 404 });
		}

		return NextResponse.json(
			{
				cart,
				message: 'Cart fetched successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('CART_GET_ERROR:', error);
		return NextResponse.json({
			status: 500,
			message: 'An error occurred while processing your request',
		});
	}
}
