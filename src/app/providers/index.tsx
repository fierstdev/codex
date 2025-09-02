import { ThemeProvider } from '@/shared/ui/theme-provider.tsx';
import React from 'react';

export function Providers({ children}: { children: React.ReactNode }) {
	return(
		<ThemeProvider defaultTheme="dark" storageKey="codex-ui-theme">
			{children}
		</ThemeProvider>
	)
}