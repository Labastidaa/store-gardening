'use client';

import React, { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Image as ImageType } from '@prisma/client';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ImageGallerySlider = ({ Images }: { Images: ImageType[] }) => {
	// useState is not working
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<div className='flex h-full w-full flex-col justify-between'>
			{/* <pre>{JSON.stringify('PRE IMAGES' + Images.length)}</pre> */}
			<Swiper
				onSwiper={() => setThumbsSwiper}
				loop={false}
				spaceBetween={2}
				navigation={true}
				keyboard={true}
				centeredSlides={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[Navigation, Thumbs]}
				className='mySwiper2 rounded-[24px]'
			>
				{Images?.map((image) => (
					<SwiperSlide key={image.id} className='!h-auto sm:!h-[500px]'>
						<Image width={1500} height={1500} alt='image' src={image.url} />
					</SwiperSlide>
				))}
			</Swiper>
			{/* <SlideNextButton /> */}

			<Swiper
				onSwiper={() => setThumbsSwiper}
				loop={false}
				spaceBetween={5}
				slidesPerView={4}
				freeMode={false}
				thumbs={{ swiper: thumbsSwiper }}
				watchSlidesProgress={true}
				modules={[Navigation, Thumbs]}
				className='mySwiper flex !h-auto !w-full flex-shrink-0 justify-start'
			>
				{Images?.map((image) => (
					<SwiperSlide
						key={image.id}
						className='relative !h-14 !w-14 sm:!h-28 sm:!w-28'
					>
						<Image
							width={40}
							height={40}
							alt='image'
							src={image.url}
							className='!rounded-[20px]'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageGallerySlider;
