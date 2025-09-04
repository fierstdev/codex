import { createContext, useContext, useEffect } from 'react';
import { useSettingsStore } from '@/entities/settings/model/settings.store';
import type { ColorMode, ThemeColor } from '@/entities/settings/model/types';

type ThemeProviderState = {
	setColorMode: (theme: ColorMode) => void;
	setTheme: (theme: ThemeColor) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
	setColorMode: () => null,
	setTheme: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const { colorMode, theme, setColorMode, setTheme } = useSettingsStore();

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		let effectiveColorMode = colorMode;
		if (effectiveColorMode === 'system') {
			effectiveColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}

		root.classList.add(effectiveColorMode);

		// Remove all theme classes before adding the new one
		const themePrefix = 'theme-';
		root.classList.forEach((className) => {
			if (className.startsWith(themePrefix)) {
				root.classList.remove(className);
			}
		});

		if (theme !== 'zinc') { // 'zinc' is our default, so no class is needed
			root.classList.add(`${themePrefix}${theme}`);
		}
	}, [colorMode, theme]);

	const value = {
		setColorMode,
		setTheme,
	};

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};