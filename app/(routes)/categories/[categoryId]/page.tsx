import ProductCard from '@/components/ui/product-card';
import prisma from '@/lib/prisma';
import React from 'react';

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
	const category = await prisma.category.findUnique({
		where: {
			id: params.categoryId,
		},
		select: {
			category: true,
		},
	});

	const products = await prisma.product.findMany({
		where: {
			categoryId: params.categoryId,
		},
		include: {
			images: true,
			category: true,
		},
	});

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='m-10 flex h-[300px] w-[90%] flex-col items-center justify-center rounded-xl'>
				<h3 className='text-center text-3xl font-bold md:text-5xl lg:text-7xl'>
					{category?.category}
				</h3>
			</div>

			<div className='m-10 grid h-auto w-[90%] grid-cols-1 content-center items-start justify-center justify-items-center gap-5 self-center rounded-xl align-middle md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
				{products?.map((product) => (
					<ProductCard key={product?.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default CategoryPage;
