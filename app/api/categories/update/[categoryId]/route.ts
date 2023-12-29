import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const categorySchema = z.object({
	category: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required'),
});

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { categoryId: string } }
) {
	try {
		const { categoryId } = params;
		const { userId } = auth();

		const body = await req.json();
		const { category, description } = categorySchema.parse(body);

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!category && !description) {
			return new NextResponse('Update at least one field', { status: 400 });
		}

		const modifiedCategory = await prisma.category.update({
			where: {
				id: categoryId,
			},
			data: {
				category,
				description,
			},
		});

		return NextResponse.json(
			{
				modifiedCategory,
				message: 'Category updated successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('[CATEGORY_PATCH_ERROR:]', error);
		return new NextResponse('Error updating category', { status: 500 });
	}
}
