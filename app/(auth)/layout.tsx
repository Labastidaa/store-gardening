import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Auth by Clerk',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			{children}
		</div>
	);
}
