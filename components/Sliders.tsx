import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ui/product-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Product, Image as ProductImage } from '@prisma/client';

interface ProductProps {
	sliderProducts: (Product & {
		images: ProductImage[];
		category: Category;
	})[];
}

import 'swiper/css';

const Sliders: React.FC<ProductProps> = ({ sliderProducts }) => {
	return (
		<div className='container z-10 flex w-full flex-col items-center !p-0'>
			{/* <pre>{JSON.stringify(sliderProducts, null, 2)}</pre> */}
			<Swiper
				loop={true}
				modules={[Pagination, Navigation]}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				pagination={{
					el: '.swiper-pagination',
					clickable: true,
					type: 'bullets',
				}}
				slidesPerView={'auto'}
				className='swiper-container'
				breakpoints={{
					587: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					769: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					1440: {
						slidesPerView: 4.5,
						spaceBetween: 10,
					},
				}}
			>
				{sliderProducts?.map((product, index) => (
					<SwiperSlide key={index} className=''>
						<ProductCard product={product} />
					</SwiperSlide>
				))}

				<div className='slider-controler'>
					<div className='flex items-center'>
						<ChevronLeft
							size={80}
							className='swiper-button-prev slider-arrow hover:text-[#000]'
						/>
					</div>
					<div className=''>
						<ChevronRight
							size={150}
							className='slider-arrow swiper-button-next'
						/>
					</div>
				</div>
				<div className='swiper-pagination'></div>
			</Swiper>
		</div>
	);
};

export default Sliders;
