import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { categoryId: string } }
) {
	try {
		const { categoryId } = params;

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}
		const category = await prisma.category.findUnique({
			where: {
				id: categoryId,
			},
		});

		if (!category) {
			return new NextResponse('Category not found', { status: 404 });
		}

		return NextResponse.json(category);
	} catch (error) {
		console.error('[CATEGORIES_GET_ERROR:]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
