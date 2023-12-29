'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Clipboard } from 'lucide-react';
import toast from 'react-hot-toast';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export type Product = {
	id: string;
	name: string;
	description: string;
	isFeatured: boolean;
	isArchived: boolean;
	price: number;
	sku: number;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	images: [];
};

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			return <div className='w-[150px]'>{row.original.name}</div>;
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			return <div className='w-[400px]'>{row.original.description}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => (
			<p>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(row.original.price)}
			</p>
		),
	},
	{
		accessorKey: 'id',
		header: 'Product ID',
		cell: ({ row }) => {
			const product = row.original;

			return (
				<div className='flex'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(product.id),
											toast.success('🌿 Copied to clipboard');
									}}
									className='text-xm flex h-[20px] w-auto rounded-full p-3 text-xs text-muted-foreground'
									variant={'outline'}
								>
									<span className='flex gap-2'>
										<Clipboard className='h-4 w-3' />
										Product ID
									</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{row.original.id}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
	},
	{
		accessorKey: 'categoryId',
		header: 'Category ID',
		cell: ({ row }) => {
			return (
				<div className='flex'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(row.original.categoryId),
											toast.success('🌿 Copied to clipboard');
									}}
									className='text-xm flex h-[20px] w-auto rounded-full p-3 text-xs text-muted-foreground'
									variant={'outline'}
								>
									<span className='flex gap-2'>
										<Clipboard className='h-4 w-3' />
										Copy ID
									</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{row.original.categoryId}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
	},
	{
		accessorKey: 'sku',
		header: 'SKU',
	},
	{
		accessorKey: 'isFeatured',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className=''
				>
					Featured
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<span className='flex justify-center'>
					{JSON.stringify(row.original.isFeatured)}
				</span>
			);
		},
	},
	{
		accessorKey: 'isArchived',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className=''
				>
					Archived
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<span className='flex justify-center'>
					{JSON.stringify(row.original.isArchived)}
				</span>
			);
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: ({ row }) => row.original.images.length,
	},
	{
		accessorKey: 'createdAt',
		header: 'Created at',
		cell: ({ row }) => {
			const createdAt = new Date(row.original.createdAt);
			// Format the date and time separately
			const datePart = createdAt.toLocaleDateString();
			const timePart = createdAt.toLocaleTimeString();

			return (
				<div>
					<div>{datePart}</div>
					<div>{timePart}</div>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href={`/admin/products/${row.original.id}`}
				>
					<Pencil1Icon />
				</Link>
			);
		},
	},
];
