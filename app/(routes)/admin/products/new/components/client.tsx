'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Category } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface CategoriesProps {
	categories: Category[];
}

const productFormSchema = z.object({
	name: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required').max(500, 'Max 500 Characters'),
	isFeatured: z.boolean().default(false),
	isArchived: z.boolean().default(false),
	price: z.number({ required_error: 'Add a price' }).positive().min(1),
	sku: z.number({ required_error: 'Add a SKU code' }).positive().min(1),
	images: z
		.object({ url: z.string() })
		.array()
		.nonempty({ message: 'required' }),
	categoryId: z.string().min(1, 'is required'),
});

type ProductValuesTypes = z.infer<typeof productFormSchema>;

const NewProductClient: React.FC<CategoriesProps> = ({ categories }) => {
	const queryClient = useQueryClient();
	const [loading, isLoading] = useState(false);

	const router = useRouter();

	const form = useForm<ProductValuesTypes>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: '',
			description: '',
			isFeatured: false,
			isArchived: false,
			price: 0,
			sku: 0,
			images: [],
			categoryId: '',
		},
	});

	const onSubmit = async (data: ProductValuesTypes) => {
		try {
			isLoading(true);
			await axios.post('/api/products/create', data);
			queryClient.invalidateQueries({ queryKey: ['products'] });
			toast.success('Product created 🐝');
			router.push('/admin/products');
			form.reset();
		} catch (error) {
			toast.error('Something went wrong 🐡');
		} finally {
			isLoading(false);
		}
	};

	return (
		<div className='flex min-h-[calc(100vh-60px)] items-center justify-center overflow-y-scroll'>
			<Card className='m-8 rounded-[24px]'>
				<CardHeader className='flex flex-row items-center space-x-5'>
					<Button
						onClick={() => router.push('/admin/products')}
						className='rounded-full'
					>
						<ChevronLeft />
					</Button>
					<CardTitle className='text-3xl leading-normal'>
						Create product
					</CardTitle>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='w-[650px] space-y-8'
						>
							<div className='flex w-full flex-col gap-y-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Name</FormLabel>
												<FormMessage />
											</div>
											<FormControl>
												<Input
													disabled={loading}
													placeholder='Product name'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Description</FormLabel>
												<FormMessage />
											</div>
											<FormControl>
												<Input
													type='text'
													disabled={loading}
													placeholder='Give this product a description'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Price</FormLabel>
												<FormMessage />
											</div>
											<FormControl>
												<Input
													disabled={loading}
													placeholder='Enter a price for the product'
													{...field}
													onChange={(e) => {
														const inputValue = e.target.value;
														field.onChange(
															inputValue !== '' ? parseFloat(inputValue) : ''
														);
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='sku'
									render={({ field }) => (
										<FormItem>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>SKU</FormLabel>
												<FormMessage />
											</div>
											<FormControl>
												<Input
													disabled={loading}
													placeholder='Enter a product SKU'
													defaultValue={undefined}
													{...field}
													onChange={(e) => {
														const inputValue = e.target.value;
														field.onChange(
															inputValue !== '' ? parseFloat(inputValue) : ''
														);
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='categoryId'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start'>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Category</FormLabel>
												<FormMessage />
											</div>

											<Select
												disabled={loading}
												onValueChange={(categories) => {
													field.onChange(categories);
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a category for this product' />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{categories.map((category) => (
														<SelectItem key={category.id} value={category.id}>
															{category.category}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='isArchived'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start'>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Archived</FormLabel>
												<FormMessage />
											</div>

											<div className='flex w-full items-center justify-between gap-2 space-x-1 space-y-0.5'>
												<FormDescription>
													Archived products won&apos;t be visible.
												</FormDescription>

												<FormControl className='space-y-0'>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={loading}
													/>
												</FormControl>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='isFeatured'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start'>
											<div className='flex space-x-1'>
												<FormLabel className='leading-0'>Featured</FormLabel>
												<FormMessage />
											</div>

											<div className='flex w-full items-center justify-between gap-2 space-x-1 space-y-0.5'>
												<FormDescription>
													Products will appear in featured section.
												</FormDescription>

												<FormControl className='space-y-0'>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={loading}
													/>
												</FormControl>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='images'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start'>
											<FormLabel className=''>Images</FormLabel>
											<FormDescription>
												Upload images for your product.
											</FormDescription>

											<div className='flex w-full items-center justify-between gap-2 space-x-1 space-y-0.5'>
												<FormControl className='space-y-0'>
													<ImageUpload
														value={field.value.map((image) => image.url)}
														disabled={loading}
														onChange={(url) =>
															field.onChange([...field.value, { url }])
														}
														onRemove={(url) =>
															field.onChange([
																...field.value.filter(
																	(current) => current.url !== url
																),
															])
														}
													/>
												</FormControl>
											</div>
										</FormItem>
									)}
								/>
							</div>

							<div className='flex w-full'>
								<Button disabled={loading} className='ml-auto' type='submit'>
									Create Product
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default NewProductClient;
