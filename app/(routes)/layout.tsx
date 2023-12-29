import { Footer } from '@/components/Footer';
import Navbar from '@/components/navbar/navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* @ts-expect-error Async Server Component */}
			<Navbar />
			<div className='z-10 h-[calc(auto-60px)]'>{children}</div>
			<Footer />
		</>
	);
}
