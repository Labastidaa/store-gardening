'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Link from 'next/link';

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
import { Button, buttonVariants } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Category, Product } from '@prisma/client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { AlertModal } from '@/components/modals/alert-modal';
import { ChevronLeft, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ProductFormProps {
	formCategories: Category[];
	initialData: Product & {
		images: [];
	};
}

const productFormSchema = z.object({
	name: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required'),
	isFeatured: z.boolean({ required_error: 'is required' }).default(false),
	isArchived: z.boolean({ required_error: 'is required' }).default(false),
	price: z.number({ required_error: 'Add a price' }).positive().min(1),
	sku: z.number({ required_error: 'Add a SKU code' }).positive().min(1),
	images: z
		.object({ url: z.string() })
		.array()
		.nonempty({ message: 'required' }),
	categoryId: z.string(),
});

type ProductValuesTypes = z.infer<typeof productFormSchema>;

const EditProductForm: React.FC<ProductFormProps> = ({
	formCategories,
	initialData,
}) => {
	const [loading, isLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { productId } = useParams();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (passedFormData: ProductValuesTypes) => {
			await axios.patch(`/api/products/update/${productId}`, passedFormData);
		},
		onSuccess: () => {
			isLoading(false);
		},
		onError: (error) => {
			toast.error('Something went wrong updating the category');
			console.log('onError definition:', error);

			// The error object does not have a response property when using Axios with TypeScript.
			// To access the response data in TypeScript, you can use a type assertion or type guard.
			if (axios.isAxiosError(error) && error.response) {
				console.log('Axios Error Response:', error.response.data);
			}
		},
	});

	const form = useForm<ProductValuesTypes>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: initialData?.name || '',
			description: initialData?.description || '',
			isFeatured: initialData?.isFeatured || false,
			isArchived: initialData?.isArchived || false,
			price: initialData?.price || 0,
			sku: initialData?.sku || 0,
			images: initialData?.images || [],
			categoryId: initialData?.categoryId || '',
		},
	});

	const onSubmit = async (data: ProductValuesTypes) => {
		try {
			isLoading(true);
			console.log('ONSUBMIT_DATA:', data);

			await mutation.mutateAsync(data);
			queryClient.invalidateQueries({ queryKey: ['products'] });
			queryClient.invalidateQueries({ queryKey: ['product'] });
			toast.success('Product updated 🍀');
			router.push('/admin/products');
		} catch (error) {
			toast.error('Something went wrong 🐡');
		} finally {
			isLoading(false);
			setOpen(false);
		}
	};

	const onDelete = async () => {
		try {
			isLoading(true);
			await axios.delete(`/api/products/delete/${productId}`);
			router.refresh();
			router.push('/admin/products');
			toast.success('Product deleted 🌚');
		} catch (error) {
			toast.error('Something went wrong, Product was not deleted.');
		} finally {
			isLoading(false);
			setOpen(false);
		}
	};

	return (
		<div className='flex items-center justify-center p-10'>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>

			<Card className='rounded-[24px]'>
				<CardHeader className='flex flex-row  items-center space-x-5'>
					<Link
						href={'/admin/products'}
						className={cn(
							buttonVariants({ variant: 'default' }),
							'rounded-full'
						)}
					>
						<ChevronLeft className='h-5 w-5' />
					</Link>
					<CardTitle>Update product</CardTitle>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='w-[650px] space-y-5'
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
												onValueChange={(category) => {
													field.onChange(category);
													console.log('Selected Category:', category);
												}}
												defaultValue={initialData?.categoryId}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a category for this product' />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													{formCategories?.map((category) => (
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
								<Button disabled={loading} className='w-full' type='submit'>
									Update Product
								</Button>
							</div>

							<Separator />
						</form>

						<Button
							disabled={loading}
							variant='destructive'
							size='sm'
							className='mt-5 w-full'
							onClick={() => setOpen(true)}
						>
							<Trash className='h-4 w-4' />
						</Button>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default EditProductForm;
