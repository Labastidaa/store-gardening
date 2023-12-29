import React from 'react';
import { Button } from '../ui/button';
import { ModeToggle } from './mode-toggle';
import { useClerk, useOrganizationList, useUser } from '@clerk/nextjs';
import { LogOut, X } from 'lucide-react';
import UserMobile from './user-mobile';
import Link from 'next/link';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/types';
import { useRouter } from 'next/navigation';

type Categories = Pick<Category, 'category' | 'id'>[];

const MobileNav = ({
	toggle,
	categories,
}: {
	isOpen: boolean;
	toggle: () => void;
	categories: Categories;
}) => {
	const router = useRouter();
	const { user } = useUser();
	const { isLoaded } = useOrganizationList();
	const { signOut, openSignIn } = useClerk();

	return (
		<div className='scroll-bar absolute left-0 top-0 z-50 flex h-[100vh] w-full flex-col border bg-background lg:p-10'>
			<div className='flex h-[60px] w-full items-center justify-end space-x-5 border bg-card px-5'>
				<ModeToggle />
				<Button
					variant={'ghost'}
					className='flex p-0 hover:bg-transparent'
					onClick={toggle}
				>
					<X />
				</Button>
			</div>

			<div className='flex h-full w-full flex-col p-10'>
				{!user ? (
					<Button
						className='mt-5 w-full rounded-xl p-5'
						onClick={() => openSignIn()}
					>
						Sign In
					</Button>
				) : (
					<>
						<UserMobile />
						<div className='flex h-full flex-col justify-start space-y-10 pt-10'>
							{user?.organizationMemberships[0]?.role === 'admin' &&
							isLoaded ? (
								<Link
									href={'/admin'}
									className={cn(
										buttonVariants({ variant: 'default' }),
										'h-[50px] w-full rounded-[21px] border-none text-base font-semibold  transition-all duration-200 hover:outline-custom'
									)}
								>
									Dashboard
								</Link>
							) : null}

							<Select>
								<SelectTrigger className='flex w-full justify-center border-2'>
									<SelectValue placeholder='CATEGORIES' />
								</SelectTrigger>
								<SelectContent className='w-full bg-background'>
									<SelectGroup className='flex flex-col'>
										{categories.map((category, index) => (
											<Button
												key={index}
												variant={'ghost'}
												className='w-full text-left'
												onClick={() => {
													router.push(`/categories/${category.id}`);
													toggle();
												}}
											>
												{category.category}
											</Button>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<Link
								href={'/profile'}
								onClick={toggle}
								className='h-[40px] text-center align-middle text-2xl font-semibold leading-9 hover:text-purple-700'
							>
								PROFILE
							</Link>
							<Link
								onClick={toggle}
								href={'/profile/orders'}
								className='h-[40px] text-center text-2xl font-semibold leading-9 hover:text-purple-700'
							>
								ORDERS
							</Link>
							{user ? (
								<div className='flex flex-grow items-end justify-between'>
									<Link
										href=''
										className={cn(
											buttonVariants({ variant: 'default' }),
											'h-[50px] w-full rounded-[21px] border-none text-base font-semibold'
										)}
										onClick={() => signOut(() => router.push('/'))}
									>
										<LogOut size={30} className='pl-3' />
									</Link>
								</div>
							) : null}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MobileNav;
