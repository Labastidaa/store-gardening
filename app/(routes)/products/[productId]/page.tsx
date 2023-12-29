import React from 'react';
import ProductPageClient from './components/client';
import prisma from '@/lib/prisma';
import RelatedProducts from './components/RelatedProducts';

const ProductPage = async ({
	params,
}: {
	params: { productId: string; q?: string };
}) => {
	const searchQuery = params.q;

	if (searchQuery) {
		return console.log(searchQuery);
	}

	const product = await prisma.product.findUnique({
		where: {
			id: params.productId,
		},
		include: {
			images: true,
			category: true,
		},
	});

	const relatedProducts = await prisma.product.findMany({
		where: {
			categoryId: product?.categoryId,
		},
		take: 10,
		include: {
			images: true,
			category: true,
		},
	});

	if (!product) {
		return <span>Product not found</span>;
	}

	if (!relatedProducts) {
		return <span>Related Products not found</span>;
	}

	if (product) {
		return (
			<div className='flex h-auto w-full flex-col items-center justify-center'>
				<div className='flex h-auto w-full items-center justify-center xl:h-auto xl:p-10'>
					<ProductPageClient product={product} />
				</div>
				<RelatedProducts relatedProducts={relatedProducts} />
			</div>
		);
	}
};

export default ProductPage;
