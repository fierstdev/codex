import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings, ToolbarType } from './types';

interface SettingsState extends Settings {
	isLoggedIn: boolean;
  	setToolbarType: (toolbarType: ToolbarType) => void;
	toggleLogin: () => void;
}

export const useSettingsStore = create<SettingsState>() (
	persist(
		(set) => ({
			toolbarType: 'bubble', // Default setting
			isLoggedIn: false, // Mock login state, default to false
			setToolbarType: (toolbarType) => set({ toolbarType }),
			toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn})),
		}),
		{
			name: 'codex-settings-storage', // Name for the localStorage item
			storage: createJSONStorage(() => localStorage)
		}
	)
);