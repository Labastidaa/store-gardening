'use client';
import { usePathname } from 'next/navigation';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Category } from '@/types/types';

interface Route {
	href: string;
	label: string;
	active: boolean;
}

type Categories = Pick<Category, 'category' | 'id'>[];

const MainNav = ({ categories }: { categories: Categories }) => {
	const pathname = usePathname();

	const routes: Route[] = categories
		? categories.map((category) => ({
				href: `/categories/${category.id}`,
				label: category.category,
				active: pathname === `/categories/${category.id}`,
		  }))
		: [];

	return (
		<nav className='mx-6 flex items-center space-x-4 lg:space-x-6'>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger className='hover:bg-inherit focus:bg-inherit active:bg-inherit'>
							Categories
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className='grid w-[200px] p-2 md:w-[300px] md:grid-cols-2 lg:w-[400px] '>
								{routes.map((route) => (
									<NavigationMenuLink
										key={route.href}
										href={route.href}
										className={cn(
											' flex h-[50px] select-none items-center justify-center space-y-1 rounded-[24px] p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
											route.active ? 'text-foregroud' : 'text-muted-foreground'
										)}
									>
										{route.label}
									</NavigationMenuLink>
								))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);
};

export default MainNav;
