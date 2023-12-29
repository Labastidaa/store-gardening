'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { OrderItem } from '@/types/types';

export const columns: ColumnDef<OrderItem>[] = [
	{
		id: 'product',
		accessorKey: 'product',
		header: 'Product',
		cell: ({ row }) => <span>{row.original.product.name}</span>,
	},
	{
		id: 'qty',
		accessorKey: 'qty',
		header: 'Quantity',
		cell: ({ row }) => <span>{row.original.qty},</span>,
	},
	{
		id: 'price',
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => <span>{row.original.product.price}</span>,
	},
	{
		id: 'description',
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<span className='overflow-y-scroll'>
				{row.original.product.description}
			</span>
		),
	},
];
