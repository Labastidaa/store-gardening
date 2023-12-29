'use client';
import React from 'react';

import { Category, Product, Image as ProductImage } from '@prisma/client';
import Sliders from '@/components/Sliders';

interface ProductProps {
	relatedProducts: (Product & {
		images: ProductImage[];
		category: Omit<Category, 'products'>;
	})[];
}

const RelatedProducts: React.FC<ProductProps> = ({ relatedProducts }) => {
	return (
		<div className='mb-5 flex w-full flex-col items-center justify-center space-x-2'>
			<h1 className='p-10 text-4xl font-bold '>Similar Products</h1>
			<Sliders sliderProducts={relatedProducts} />
		</div>
	);
};

export default RelatedProducts;
