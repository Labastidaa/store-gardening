'use client';

import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Sliders from './Sliders';
import { Product, Image, Category } from '@prisma/client';

interface ProductsProps {
	products: (Product & {
		images: Image[];
		category: Category;
	})[];
}

const FeaturedProductsSection: React.FC<ProductsProps> = ({ products }) => {
	const featuredProducts = products?.filter(
		(product) => product?.isFeatured === true
	);

	return (
		<div className='flex h-auto w-full flex-col items-center justify-center py-10'>
			<h1 className='m-10 text-center text-3xl font-semibold'>
				Featured products
			</h1>
			<Sliders sliderProducts={featuredProducts} />
		</div>
	);
};

export default FeaturedProductsSection;
