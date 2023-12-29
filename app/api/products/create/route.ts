import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const productSchema = z.object({
	name: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required').max(500,'Max 500 Characters'),
	isFeatured: z.boolean().default(false),
	isArchived: z.boolean().default(false),
	price: z.number().positive().min(1, { message: 'Add a valid price' }),
	sku: z.number().positive().min(1),
	images: z
		.object({ url: z.string() })
		.array()
		.nonempty({ message: 'required' }),
	categoryId: z.string({ required_error: 'category is required' }).min(1),
});

export async function POST(req: NextRequest) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const body = await req.json();

		console.log('Request Body: ', body);

		const {
			name,
			description,
			isArchived,
			isFeatured,
			price,
			sku,
			images,
			categoryId,
		} = productSchema.parse(body);

		const product = await prisma.product.create({
			data: {
				name,
				description,
				isArchived,
				isFeatured,
				price,
				sku,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
				categoryId,
			},
		});

		return NextResponse.json(
			{
				product,
				message: 'Product created successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('PRODUCT_POST_ERROR:', error);
		return NextResponse.json({
			status: 500,
			message: 'An error occurred while processing your request',
		});
	}
}
