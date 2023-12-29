'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Category } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { AlertModal } from '@/components/modals/alert-modal';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SettingsFormProps {
	initialData: Category;
}

const formSchema = z.object({
	category: z
		.string()
		.min(1, 'is required')
		.min(2, 'should be at least 2 charater(s)'),
	description: z.string().min(1, 'is required'),
});

type CategoryFormValuesTypes = z.infer<typeof formSchema>;

const CategoryForm: FC<SettingsFormProps> = ({ initialData }) => {
	const queryClient = useQueryClient();
	const { categoryId } = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const mutation = useMutation({
		mutationFn: async (passedFormData: CategoryFormValuesTypes) => {
			await axios.patch(`/api/categories/update/${categoryId}`, passedFormData);
		},
		onSuccess: () => {
			setLoading(false);
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

	const form = useForm<CategoryFormValuesTypes>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: initialData?.category || '',
			description: initialData?.description || '',
		},
	});

	const onSubmit = async (data: CategoryFormValuesTypes) => {
		try {
			setLoading(true);
			await mutation.mutateAsync(data);

			queryClient.invalidateQueries({ queryKey: ['categories'] });
			queryClient.invalidateQueries({ queryKey: ['category'] });

			router.refresh();
			router.push('/admin/categories/');
			toast.success('🍄 Category Updated');
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/categories/delete/${categoryId}`);
			router.refresh();
			router.push('/admin/categories');
			toast.success('Category deleted');
		} catch (error) {
			if ((error as AxiosError).response?.status === 400) {
				toast.error(
					'Delete associated products first, in order to delete this category'
				);
			} else {
				toast.error('Something went wrong, Category was not deleted.');
			}
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-5'
				>
					<div className='flex flex-col gap-5'>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Category name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Category description'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={loading} className='ml-auto w-full' type='submit'>
						Save changes
					</Button>

					<Separator />
				</form>

				<Separator />

				<Button
					disabled={loading}
					variant='destructive'
					className='mt-5 w-full'
					onClick={() => setOpen(true)}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</Form>
		</>
	);
};

export default CategoryForm;
