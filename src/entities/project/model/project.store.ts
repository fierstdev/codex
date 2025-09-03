import { create } from 'zustand';
import type { Project } from './types';

// The mock data now serves as the initial state for our store
const initialProjects: Project[] = [
	{ id: '1', name: 'Codex Redesign' },
	{ id: '2', name: 'Marketing Plan Q4' },
	{ id: '3', name: 'Novel - The Final Chapter' },
	{ id: '4', name: 'Personal Journal' },
];

interface ProjectState {
	projects: Project[];
	activeProjectId: string | null;
	addProject: (name: string) => void;
	selectProject: (projectId: string | null) => void;
	toggleProjectExpansion: (projectId: string) => void;
	renameProject: (projectId: string, name: string) => void;
	deleteProject: (projectId: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
	projects: initialProjects,
	activeProjectId: null,
	addProject: (name: string) =>
		set((state) => {
			const newProject: Project = {
				id: crypto.randomUUID(),
				name,
			};
			return { projects: [...state.projects, newProject] };
		}),
	// Always sets the active project. Used for navigation.
	selectProject: (projectId: string | null) =>
		set({ activeProjectId: projectId }),

	// Specifically for the sidebar accordion UI.
	toggleProjectExpansion: (projectId: string) =>
		set((state) => ({
			activeProjectId: state.activeProjectId === projectId ? null : projectId,
		})),
	renameProject: (projectId, name) =>
		set((state) => ({
			projects: state.projects.map((p) =>
				p.id === projectId ? { ...p, name } : p
			),
		})),
	deleteProject: (projectId) =>
		set((state) => ({
			projects: state.projects.filter((p) => p.id !== projectId),
			activeProjectId: state.activeProjectId === projectId ? null : state.activeProjectId,
		})),
}));