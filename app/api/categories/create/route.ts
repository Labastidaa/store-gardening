import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import * as z from 'zod';

const userSchema = z.object({
	category: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required'),
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { category, description } = userSchema.parse(body);

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		const categories = await prisma.category.create({
			data: {
				category,
				description,
			},
		});

		return NextResponse.json(
			{
				categories,
				message: 'Category created successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('CATEGORIES_POST_ERROR:', error);
		return NextResponse.json({
			status: 500,
			message: 'An error occurred while processing your request',
		});
	}
}
