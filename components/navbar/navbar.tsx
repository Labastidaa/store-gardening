import Link from 'next/link';
import MainNav from '@/components/navbar/main-nav';
import { currentUser } from '@clerk/nextjs';
import CustomUserButton from './custom-user-button';
import { ModeToggle } from './mode-toggle';
import NavBarCart from '../NavBarCart';
import ClientNav from './client-nav';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

import React from 'react';
import CustomSigninBtn from './custom-signin-button';

const Navbar = async () => {
	const categories = await prisma.category.findMany({
		select: {
			category: true,
			id: true,
		},
	});

	const user = await currentUser();

	if (!categories) {
		return new NextResponse('Categories not found');
	}

	return (
		<nav className='sticky top-0 z-50 flex h-[60px] w-full items-center justify-between bg-card px-5 drop-shadow-md lg:px-10'>
			<div className='flex items-center justify-center leading-none'>
				<Link href='/' className='flex leading-none lg:ml-0'>
					<p className='text-[1em] font-bold'>RHIZ STORE</p>
				</Link>
				<div className='hidden lg:flex'>
					<MainNav categories={categories} />
				</div>
			</div>

			<div className='ml-10 flex items-center justify-center lg:space-x-5'>
				{user && <NavBarCart />}
				<div className='hidden space-x-5 lg:flex'>
					{!user ? <CustomSigninBtn /> : <CustomUserButton />}
					<ModeToggle />
				</div>
				<ClientNav categories={categories} />
			</div>
		</nav>
	);
};

export default Navbar;
