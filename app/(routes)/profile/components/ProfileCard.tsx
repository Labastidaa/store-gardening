'use client';

import React from 'react';
import { UserProfile } from '@clerk/nextjs';

const ProfileCard: React.FC = () => {
	return (
		<div className='p-0'>
			<UserProfile />
		</div>
	);
};

export default ProfileCard;
