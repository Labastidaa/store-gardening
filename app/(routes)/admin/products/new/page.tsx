import React from 'react';
import NewProductClient from './components/client';
import prisma from '@/lib/prisma';

const NewProduct = async () => {
	const categories = await prisma.category.findMany();

	return (
		<>
			<NewProductClient categories={categories} />
		</>
	);
};

export default NewProduct;
