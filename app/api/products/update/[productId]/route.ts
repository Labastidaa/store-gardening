import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const productFormSchema = z.object({
	name: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required').max(500,'Max 500 Characters'),
	isFeatured: z.boolean({ required_error: 'is required' }).default(false),
	isArchived: z.boolean({ required_error: 'is required' }).default(false),
	price: z.number({ required_error: 'Add a price' }).positive().min(1),
	sku: z.number({ required_error: 'Add a SKU code' }).positive().min(1),
	images: z
		.object({ url: z.string() })
		.array()
		.nonempty({ message: 'required' }),
	categoryId: z.string().min(1,'is required'),
});


export async function PATCH(
	req: NextRequest,
	{ params }: { params: { productId: string } }
) {
	try {
		const { productId } = params;

		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const body = await req.json();
		const {
			name,
			description,
			isFeatured,
			isArchived,
			price,
			sku,
			images,
			categoryId,
		} = productFormSchema.parse(body);

		if (
			!name &&
			!description &&
			!isFeatured &&
			!isArchived &&
			!price &&
			!sku &&
			(!images || !images.length) &&
			!categoryId
		) {
			return new NextResponse('Update at least one field', { status: 400 });
		}

		if (!images || images.length === 0) {
			return new NextResponse('At least one image is required', {
				status: 400,
			});
		}

		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
			include: { images: true },
		});

		if (!existingProduct) {
			return new NextResponse('Product not found', { status: 404 });
		}

		const existingImages = existingProduct.images;

		const imagesToAdd = images.filter(
			(img) => !existingImages.find((exImg) => exImg.url === img.url)
		);
		const imagesToRemove = existingImages.filter(
			(exImg) => !images.find((img) => img.url === exImg.url)
		);

		await Promise.all([
			...imagesToRemove.map(async (img) => {
				await prisma.image.delete({
					where: { id: img.id },
				});
			}),

			...imagesToAdd.map(async (img) => {
				await prisma.image.create({
					data: {
						productId,
						url: img.url,
					},
				});
			}),
		]);

		const modifiedProduct = await prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				name,
				description,
				isFeatured,
				isArchived,
				price,
				sku,
				categoryId,
			},
			include: {
				images: true,
			},
		});

		return NextResponse.json(
			{
				modifiedProduct,
				message: 'Product updated successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('[PRODUCT_PATCH_ERROR:]', error);
		return new NextResponse('Error updating product', { status: 500 });
	}
}
