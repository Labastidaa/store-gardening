import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { productId: string } }
) {
	try {
		const { productId } = params;

		if (!productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}
		
		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
			include: {
				images: true,
			},
		});

		if (!product) {
			return new NextResponse('Product not found', { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCT_ID_GET_ERROR:]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
