import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const body = await req.json();
		console.log('UPDATE BODY:',body);

		if (!body.product || !body.product.id) {
			return new NextResponse('Invalid request body', { status: 400 });
		}

		const productId = body.product.id;
		const qty = body.quantity;

		console.log('QTY:', qty);

		if(qty < 1){
			return new NextResponse('Invalid QTY, it must be greater than 0');
		}

		const updatedCart = await prisma.$transaction(async (prisma) => {

			const UserCart = await prisma.cart.findUnique({
				where: {
					userId: userId
				},
				select: {
					id: true,
					CartItem: true
				}
			});

			console.log('USER CART:',UserCart);

			if(!UserCart){
				return new NextResponse('Cart not found for this user', { status: 404 })
			}

			const matchingCartItem = UserCart.CartItem.find((cartItem) => cartItem.productId === productId);

			console.log('MATCHING CART ITEM:',matchingCartItem);


			if (!matchingCartItem) {
				const newCartItem = await prisma.cartItem.create({
					data: {
						qty: qty,
						product: {
							connect: {
								id: productId,
							},
						},
						cart: {
							connect: {
								id: UserCart.id,
								userId: userId,
							},
						},
					},
				});		

				console.log('NEW CART ITEM CREATED:',newCartItem)

				if(!newCartItem){
					return new NextResponse('CartItem was not created successfully')
				}
			}

			if (matchingCartItem) {
				const updatedQty = matchingCartItem.qty + qty;

				const CartItemUpdated = await prisma.cartItem.update({
					where: {
						cartId: UserCart.id,
						id: matchingCartItem.id,
					},
					data: {
						qty: updatedQty,
						// cart: {
						// 	connect:{
						// 		id:UserCart.id,
						// 		userId: userId
						// 	}
						// }
					},
				});

				console.log('CART ITEM UPDATED:',CartItemUpdated);


				if(!CartItemUpdated){
					return new NextResponse('CartItem was not updated successfully')
				}

			}

			return prisma.cart.findUnique({
				where: { 
					id: UserCart.id,
					userId: userId },
				include: {
					CartItem: {
						include: {
							product : {
								include : {
									images: true
								}
							}
						}
					},
				},
			});
		});

		return NextResponse.json(
			{
				updatedCart,
				message: 'Cart updated successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('[PRODUCT_PATCH_ERROR:]', error);
		return new NextResponse('Error updating product', { status: 500 });
	}
}
