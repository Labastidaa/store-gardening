import { useSession, useUser } from '@clerk/nextjs';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { checkUserRole } from '@/lib/userUtils';

const UserMobile = () => {
	const { user } = useUser();
	const { session } = useSession();
	const userRole = checkUserRole(session);

	if (!session) {
		console.log('SESSION NOT FOUND:', session);
	}

	return (
		<div className='flex flex-col items-center justify-center p-5'>
			<div className='flex w-full items-center justify-center space-x-5'>
				<div className='h-10 w-10 rounded-full outline outline-2 outline-offset-2 outline-lime-600 transition-all duration-300 hover:outline-lime-500 md:h-16 md:w-16'>
					<Avatar className='h-10 w-10 md:h-16 md:w-16'>
						<AvatarImage src={user?.imageUrl} alt='profile' />
						<AvatarFallback>INITIALS</AvatarFallback>
					</Avatar>
				</div>
				<div className='flex flex-col items-start'>
					<p className='h-[30px] text-left text-lg font-bold md:text-2xl '>
						{user?.firstName?.toLocaleUpperCase()}
					</p>
					<p className='pb-2 text-xs font-normal text-foreground md:text-xl'>
						{user?.primaryEmailAddress?.emailAddress}
					</p>
				</div>
			</div>
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
	);
};

export default UserMobile;
