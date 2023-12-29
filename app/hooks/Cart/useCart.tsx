'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Category, Product, Image as ProductImage } from '@prisma/client';

import { Cart, CartItem } from '@/types/types';

type ProductType = Product & {
	images: ProductImage[];
	category: Omit<Category, 'products'>;
};

interface Response {
	cart: Cart;
	message: string;
}

export const useGetCart = () => {
	return useQuery({
		queryKey: ['cart'],
		queryFn: async () => {
			const { data } = await axios.get('/api/cart/fetch/');
			return data as Response;
		},
	});
};

export const useUpdateCart = (product: ProductType) => {
	return useMutation({
		mutationFn: async (quantity: number) => {
			const { data } = await axios.patch('/api/cart/update', {
				product,
				quantity,
			});
			return data;
		},
		onSuccess: () => {
			toast.success('Product added to cart');
		},
		onError: (error) => {
			toast.error('Login to adding Product to cart');
			throw new Error(`Error patch cart: ${error}`);
		},
	});
};

export const useDeleteCart = (item: CartItem) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const { data } = await axios.delete('/api/cart/delete', {
				data: item,
			});
			return data;
		},
		onSuccess: () => {
			toast.success('Item deleted from cart');
			queryClient.invalidateQueries({ queryKey: ['cart'] });
		},
		onError: () => {
			toast.error('Something went wrong');
		},
	});
};
