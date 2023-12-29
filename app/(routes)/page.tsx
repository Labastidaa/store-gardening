import CategoriesSection from '@/components/Categories';
import Community from '@/components/Community';
import Faqs from '@/components/Faqs';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import prisma from '@/lib/prisma';

export default async function Home() {
	const Products = await prisma.product.findMany({
		include: {
			images: true,
			category: true,
		},
	});

	return (
		<main className='my-10 flex w-full flex-col items-center justify-between'>
			<div className='flex h-[30vh] w-[90%] flex-col items-center justify-center space-y-2 rounded-[24px] text-foreground drop-shadow-sm transition-all  duration-700'>
				<h1 className='text-center text-3xl font-bold md:text-5xl lg:text-7xl'>
					Gardening Store
				</h1>
			</div>

			<FeaturedProductsSection products={Products} />
			<CategoriesSection />
			<Community />
			<Faqs />
		</main>
	);
}
