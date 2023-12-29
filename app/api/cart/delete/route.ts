import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const body = await req.json();
		console.log('UPDATE BODY:', body);

		if (!body) {
			return new NextResponse('Invalid request body', { status: 400 });
		}

		const deletedItem = await prisma.cartItem.delete({
			where: {
				id: body.id,
			},
		});

		return NextResponse.json(
			{
				deletedItem,
				message: 'Item deleted successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('[PRODUCT_PATCH_ERROR:]', error);
		return new NextResponse('Error updating product', { status: 500 });
	}
}
