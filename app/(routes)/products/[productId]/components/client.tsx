'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Currency from '@/components/ui/currency';
import { useUpdateCart } from '@/app/hooks/Cart/useCart';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import ImageGallerySlider from '@/components/ui/image-gallery-slider';
import { Category, Product, Image as ProductImage } from '@prisma/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUser } from '@clerk/nextjs';

interface ProductProps {
	product: Product & {
		images: ProductImage[];
		category: Omit<Category, 'products'>;
	};
}

const FormSchema = z.object({
	quantity: z
		.number({
			invalid_type_error: 'Add a valid number',
		})
		.positive({
			message: 'must be greater than 0',
		}),
});

const ProductPageClient: React.FC<ProductProps> = ({ product }) => {
	const { isSignedIn } = useUser();

	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		if (isSignedIn === false) {
			setOpen(true);
		}
	}, [isSignedIn]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			quantity: 1,
		},
		mode: 'onChange',
	});

	const queryClient = useQueryClient();
	const mutation = useUpdateCart(product);

	const onSubmit = ({ quantity }: z.infer<typeof FormSchema>) => {
		mutation.mutate(quantity, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['cart'] });
				form.reset();
			},
			onError: (error) => {
				console.log('ERROR', error);
			},
		});
	};

	return (
		<div className='flex  h-auto w-[90%] flex-col items-center justify-center lg:w-[80%] 2xl:max-w-[1500px]'>
			<Card className='m-5 flex h-auto w-[100%] flex-col justify-between rounded-[34px] p-3 md:p-5 lg:max-h-[80vh] lg:flex-row'>
				<div className='h-full w-full rounded-xl sm:h-[600px] lg:h-auto lg:w-[40%] lg:min-w-[550px] '>
					<ImageGallerySlider Images={product?.images} />
				</div>

				<div className='items-between no-scrollbar flex w-full flex-col justify-between gap-5 overflow-y-scroll pt-5 lg:h-[500px] lg:w-[60%] lg:pl-5 lg:pt-0'>
					<div className='flex h-full flex-col gap-1 md:gap-5'>
						<h1 className='text-xl font-bold md:text-3xl 2xl:text-5xl'>
							{product.name}
						</h1>
						<div className='flex items-center space-x-2'>
							<h2 className='text-xl font-bold md:text-2xl 2xl:text-4xl'>
								<Currency value={product.price} />
							</h2>
							{/* <p> Available {product.sku}</p> */}
						</div>
						<div className='no-scrollbar max-h-[150px] overflow-y-scroll 2xl:h-auto'>
							<p className='text-base 2xl:text-base'>{product.description}</p>
						</div>
					</div>

					<div className='my-3 flex h-auto w-full flex-col items-start justify-center gap-5 md:justify-start'>
						{!isSignedIn ? (
							<Alert className='' variant={'destructive'}>
								<AlertDescription>
									Login before adding products to your Cart.
								</AlertDescription>
							</Alert>
						) : null}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex space-x-5'
							>
								<FormField
									control={form.control}
									name='quantity'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder='QTY'
													type='number'
													{...field}
													onChange={(e) => {
														const inputValue = e.target.value;
														field.onChange(
															inputValue !== '' ? parseFloat(inputValue) : ''
														);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' disabled={isOpen}>
									Submit
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProductPageClient;
