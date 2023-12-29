import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { categoryId: string } }
) {
	try {
		const { categoryId } = params;

		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const associatedProducts = await prisma.product.findMany({
			where: {
				categoryId: categoryId,
			},
		});

		if (associatedProducts.length > 0) {
			return NextResponse.json(
				{
					associatedProducts,
					message: 'Delete associated products first, to delete this category',
				},
				{
					status: 400,
				}
			);
		} else {
			const deletedCategory = await prisma.category.delete({
				where: {
					id: categoryId,
				},
			});

			return NextResponse.json(
				{
					deletedCategory,
					message: 'Category deleted successfull',
				},

				{ status: 200 }
			);
		}
	} catch (error) {
		console.log('[CATEGORY_DELETE_ERROR:]', error);
		return new NextResponse('Error deleting category', { status: 500 });
	}
}
