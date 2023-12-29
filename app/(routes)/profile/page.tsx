import React from 'react';

import ProfileCard from '@/app/(routes)/profile/components/ProfileCard';
import { OrganizationSwitcher } from '@clerk/nextjs';

const Profile = async () => {
	return (
		<div className='flex min-h-[100vh] w-full flex-col items-center justify-center gap-5 p-10'>
			<ProfileCard />
			<OrganizationSwitcher />
		</div>
	);
};

export default Profile;
