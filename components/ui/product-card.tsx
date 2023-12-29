'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Category, Product, Image as ProductImage } from '@prisma/client';
interface ProductProps {
	product: Product & {
		images: ProductImage[];
		category: Omit<Category, 'products'>;
	};
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
	const productImgUrl = product?.images[0].url;

	const USDollar = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		useGrouping: false,
	});

	return (
		<>
			<Card className='h-[400px] w-full rounded-[28px] border-none p-1 drop-shadow-sm transition-all duration-500 animate-in animate-out hover:bg-accent md:h-[450px] '>
				<CardContent className='flex h-full flex-col p-3'>
					<div className='h-auto w-auto'>
						<Link
							href={`/products/${product.id}`}
							className='relative flex h-[200px] w-full flex-col md:h-[250px]'
						>
							<Image
								src={productImgUrl}
								fill={true}
								alt='product-image'
								sizes='(max-width:500px) 10vw'
								placeholder='blur'
								blurDataURL={productImgUrl}
								style={{ objectFit: 'cover' }}
								className='rounded-[24px]'
							/>

							<Badge variant={'default'} className='absolute left-5 top-5'>
								{product?.category?.category}
							</Badge>
						</Link>
					</div>

					<div className='mt-3 flex h-full w-auto flex-col space-y-2 p-2'>
						<Link
							href={`/products/${product.id}`}
							className='flex flex-col items-start overflow-hidden'
						>
							<h1 className='text-overflow-ellipsis overflow-hidden whitespace-nowrap break-words text-xl font-bold text-[#107528] transition-colors animate-in animate-out hover:text-[#1ba63c]'>
								{product?.name}
							</h1>
						</Link>

						<div className='flex h-full flex-col '>
							<div className='flex h-[85px]'>
								<p className='no-scrollbar overflow-y-scroll whitespace-normal break-words text-start text-xs text-card-foreground/50'>
									{product?.description}
								</p>
							</div>

							<div className='flex w-full justify-between'>
								<h1 className='font-mono text-xl font-black'>
									{USDollar.format(product?.price)}
								</h1>
								<Link
									href={`/products/${product.id}`}
									className='flex items-center hover:text-[#107528] hover:text-custom'
								>
									<Eye size={25} />
								</Link>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductCard;
