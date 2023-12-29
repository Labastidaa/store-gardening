'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import MobileNav from './mobile-nav';
import { Category } from '@/types/types';

type Categories = Pick<Category, 'category' | 'id'>[];

const ClientNav = ({ categories }: { categories: Categories }) => {
	const [isOpen, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!isOpen);
	};

	return (
		<div className='lg:hidden'>
			<Button
				variant={'ghost'}
				onClick={toggle}
				className='p-0 pl-5 hover:bg-transparent'
			>
				<Menu />
			</Button>

			{isOpen ? (
				<MobileNav isOpen={isOpen} toggle={toggle} categories={categories} />
			) : null}
		</div>
	);
};

export default ClientNav;
