'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useClerk } from '@clerk/nextjs';

const CustomSigninBtn = () => {
	const { openSignIn } = useClerk();
	return (
		<Button className='rounded-xl p-5' onClick={() => openSignIn()}>
			Sign In
		</Button>
	);
};

export default CustomSigninBtn;
