import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings, ToolbarType, FontFamily, ThemeColor, ColorMode } from './types';

interface SettingsState extends Settings {
	isLoggedIn: boolean;
  	setToolbarType: (toolbarType: ToolbarType) => void;
	setFontFamily: (fontFamily: FontFamily) => void;
	setTheme: (theme: ThemeColor) => void;
	setColorMode: (colorMode: ColorMode) => void;
	setSidebarTransparency: (isTransparent: boolean) => void;
	toggleLogin: () => void;
}

export const useSettingsStore = create<SettingsState>() (
	persist(
		(set) => ({
			toolbarType: 'bubble',
			fontFamily: 'sans',
			theme: 'zinc',
			colorMode: 'system',
			isSidebarTransparent: false,
			isLoggedIn: false,
			setToolbarType: (toolbarType) => set({ toolbarType }),
			setFontFamily: (fontFamily) => set({ fontFamily }),
			setTheme: (theme) => set({ theme }),
			setColorMode: (colorMode) => set({ colorMode }),
			setSidebarTransparency: (isSidebarTransparent) => set({ isSidebarTransparent }),
			toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
		}),
		{
			name: 'codex-settings-storage', // Name for the localStorage item
			storage: createJSONStorage(() => localStorage)
		}
	)
);