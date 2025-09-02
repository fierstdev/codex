import { create } from 'zustand';
import type { Project } from './types';

// The mock data now serves as the initial state for our store
const initialProjects: Project[] = [
	{ id: '1', name: 'Codex Redesign', documentCount: 3 },
	{ id: '2', name: 'Marketing Plan Q4', documentCount: 1 },
	{ id: '3', name: 'Novel - The Final Chapter', documentCount: 2 },
	{ id: '4', name: 'Personal Journal', documentCount: 0 },
];

interface ProjectState {
	projects: Project[];
	activeProjectId: string | null;
	addProject: (name: string) => void;
	setActiveProject: (projectId: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
	projects: initialProjects,
	activeProjectId: null,
	addProject: (name: string) =>
		set((state) => {
			const newProject: Project = {
				id: crypto.randomUUID(),
				name,
				documentCount: 0,
			};
			return { projects: [...state.projects, newProject] };
		}),
	setActiveProject: (projectId: string | null) =>
		set((state) => ({
			activeProjectId: state.activeProjectId === projectId ? null : projectId,
		})),
}));