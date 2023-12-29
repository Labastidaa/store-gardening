import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 0
export const dynamic = "force-dynamic";
export async function GET() {
	try {

		const categories = await prisma.category.findMany({
			include: {
				products: true,
			},
		});

		return NextResponse.json(categories,{status: 200});
	} catch (error) {
		console.log('[CATEGORIES_GET_ERROR:]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
