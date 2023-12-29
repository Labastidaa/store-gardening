'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PlusIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
	category: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required'),
});

type CategoryFormValuesTypes = z.infer<typeof formSchema>;

export const CategoryModal = () => {
	const queryClient = useQueryClient();
	const [loading, isLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const form = useForm<CategoryFormValuesTypes>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
			description: '',
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: CategoryFormValuesTypes) => {
			const { data: ResponseData } = await axios.post(
				'/api/categories/create',
				data
			);
			return ResponseData;
		},
		onSuccess: () => {
			router.refresh();
			toast.success('Category created 🐝');
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});

	const onSubmit = async (data: CategoryFormValuesTypes) => {
		try {
			isLoading(true);
			mutation.mutate(data);
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		} catch (error) {
			toast.error('Something went wrong 🐡');
			throw new Error('Error sending data');
		} finally {
			isLoading(false);
			setOpen(false);
		}
	};

	return (
		<Dialog onOpenChange={() => (form.reset(), setOpen(!open))} open={open}>
			<DialogTrigger asChild>
				<Button
					variant='default'
					className='ml-2'
					onClick={() => setOpen(true)}
				>
					<PlusIcon className='mr-2' />
					Add Category
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle> New Category </DialogTitle>
				</DialogHeader>

				<hr className='border-none' />

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full space-y-8'
					>
						<div className='flex w-full flex-col gap-y-2'>
							<FormField
								control={form.control}
								// name referring to property is going to control
								// in this case name in our form schema
								name='category'
								render={({ field }) => (
									<FormItem>
										<div className='flex space-x-1'>
											<FormLabel className='leading-0'>Name</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											{/* spread field so input gets onChange, onBlur and values  */}
											<Input
												disabled={loading}
												placeholder='Category name'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								// name referring to property is going to control
								// in this case description in our form schema
								name='description'
								render={({ field }) => (
									<FormItem>
										<div className='flex space-x-1'>
											<FormLabel className='leading-0'>Description</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											{/* spread field so input gets onChange, onBlur and values  */}
											<Input
												type='text'
												disabled={loading}
												placeholder='Give this category a description'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className='flex w-full'>
							<Button disabled={loading} className='ml-auto' type='submit'>
								Create Category
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
