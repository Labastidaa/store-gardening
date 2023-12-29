'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	/* HYDRATION ERROR PROTECTION */
	const [isMounted, setIsMounted] = React.useState(false);
	// Life Cycle runs on Client
	React.useEffect(() => {
		setIsMounted(true);
	}, []);
	// If it's on ServerSR return null to prevent errors
	if (!isMounted) {
		return null;
	}

	// While on Client Rendering
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
