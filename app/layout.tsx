import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import ToastProvider from '@/providers/toast-provider';
import './globals.css';
import TanstackProvider from '@/providers/query-provider';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/providers/theme-provider';
import { inter, nunito } from '@/app/fonts';

export const metadata: Metadata = {
	title: 'Rhiz Gardening Store',
	description: 'eCommerce Store Rhiz',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang='en' suppressHydrationWarning>
				<body className={`${inter.variable} ${nunito.variable}`}>
					<TanstackProvider>
						<ToastProvider />
						<ThemeProvider
							attribute='class'
							defaultTheme='light'
							enableSystem={true}
						>
							{children}
						</ThemeProvider>
					</TanstackProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
