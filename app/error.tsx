'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center'>
			<div>
				<h1 className='text-4xl font-bold'>There was an error:</h1>
			</div>
			<p className='text-base text-foreground'>
				Message:
				{error.message}
			</p>

			<Button onClick={reset}>Try again</Button>
		</div>
	);
};

export default Error;
