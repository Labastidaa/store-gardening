'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Clipboard } from 'lucide-react';
import toast from 'react-hot-toast';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export type Category = {
	id: string;
	category: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	products: [];
};

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'products',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className=''
				>
					Products
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<span className='flex justify-center'>
					{JSON.stringify(row.original.products.length)}
				</span>
			);
		},
	},
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => {
			const category = row.original;

			return (
				<div className='flex'>
					<Button
						onClick={() => (
							navigator.clipboard.writeText(category.id),
							toast.success('🌿 Copied to clipboard')
						)}
						className='text-xm flex h-[20px] w-auto rounded-full p-3 text-xs text-muted-foreground'
						variant={'outline'}
					>
						<span className='flex gap-2'>
							<Clipboard className='h-4 w-3' />
							Category ID
						</span>
					</Button>
				</div>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created at',
		cell: ({ row }) => {
			const createdAt = new Date(row.original.createdAt);
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
		accessorKey: 'updatedAt',
		header: 'Last update',
		cell: ({ row }) => {
			const createdAt = new Date(row.original.updatedAt);
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
					href={`/admin/categories/${row.original.id}`}
				>
					<Pencil1Icon />
				</Link>
			);
		},
	},
];
