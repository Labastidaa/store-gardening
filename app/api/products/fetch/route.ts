import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 0
export const dynamic = "force-dynamic";
export async function GET() {
	try {
		const products = await prisma.product.findMany({
			include: {
				images: true,
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCTS_GET_ERROR:]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
