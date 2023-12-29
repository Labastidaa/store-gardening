'use client';

import Link from 'next/link';
import {
	useOrganizationList,
	useSession,
	useUser,
	useClerk,
} from '@clerk/nextjs';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { checkUserRole } from '@/lib/userUtils';
import { Badge } from '../ui/badge';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CustomUserButton: React.FC = () => {
	const { session } = useSession();
	const userRole = checkUserRole(session);
	const { isLoaded } = useOrganizationList();
	const { user } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();

	return (
		<Popover>
			<PopoverTrigger
				asChild
				className='rounded-full outline outline-2 outline-offset-2 outline-lime-600 transition-all duration-300 hover:outline-lime-500'
			>
				<Avatar className='h-7 w-7'>
					<AvatarImage src={user?.imageUrl} alt='profile' />
					<AvatarFallback>INITIALS</AvatarFallback>
				</Avatar>
			</PopoverTrigger>

			<PopoverContent className='mt-4 w-[250px] p-3'>
				<div className='flex items-center justify-center '>
					<div className='flex flex-col items-center text-center'>
						<p className='h-[30px] text-center text-lg font-bold '>
							{user?.firstName?.toLocaleUpperCase()}
						</p>
						<p className='pb-2 text-xs font-normal text-foreground'>
							{user?.primaryEmailAddress?.emailAddress}
						</p>

						{userRole ? (
							<Badge
								variant={'outline'}
								className='m-2 w-fit border-2 border-purple-700 font-normal'
							>
								{userRole}
							</Badge>
						) : (
							<Badge
								variant={'outline'}
								className='m-2 w-fit border-2 border-green-700 font-normal'
							>
								basic
							</Badge>
						)}
					</div>
				</div>

				<div className='flex flex-col items-center justify-center space-y-3'>
					<div className='flex h-auto w-full flex-col items-center justify-center'>
						<Link
							href={'/profile'}
							className='h-[40px]  text-center align-middle font-semibold leading-9 hover:text-purple-700'
						>
							Your profile
						</Link>
						<Link
							href={'/profile/orders'}
							className='h-[40px]  font-semibold leading-9 hover:text-purple-700'
						>
							Your orders
						</Link>
					</div>
					{user?.organizationMemberships[0]?.role === 'admin' && isLoaded ? (
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

					<Link
						href=''
						className={cn(
							buttonVariants({ variant: 'default' }),
							'h-[50px] w-full rounded-[21px] border-none text-base font-semibold'
						)}
						onClick={() => signOut(() => router.push('/'))}
					>
						Sign Out
						<LogOut size={30} className='pl-3' />
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default CustomUserButton;
