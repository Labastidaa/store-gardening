import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { productId: string } }
) {
	try {
		const { productId } = params;

		const { userId } = auth();
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const deletedProduct = await prisma.product.delete({
			where: {
				id: productId,
			},
		});

		return NextResponse.json(
			{
				deletedProduct,
				message: 'Product deleted successfull',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('[PRODUCT_PATCH_ERROR:]', error);
		return new NextResponse('Error updating product', { status: 500 });
	}
}
