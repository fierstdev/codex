import { create } from 'zustand';
import type { Project } from './types';
import { pfs } from '@/shared/lib/fs';
import { writeFileAndCommit } from '@/shared/lib/git';

interface ProjectState {
	projects: Project[];
	isLoading: boolean;
	activeProjectId: string | null;
	loadProjects: () => Promise<void>;
	addProject: (name: string) => Promise<void>;
	renameProject: (projectId: string, name: string) => Promise<void>;
	deleteProject: (projectId: string) => Promise<void>;
	selectProject: (projectId: string | null) => void;
	toggleProjectExpansion: (projectId: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
	projects: [],
	isLoading: true,
	activeProjectId: null,

	loadProjects: async () => {
		set({ isLoading: true });
		try {
			const projectsData = await pfs.readFile('/projects.json', 'utf8');
			const projects = JSON.parse(projectsData as string);
			set({ projects, isLoading: false });
		} catch (error) {
			console.error("Failed to load projects:", error);
			set({ projects: [], isLoading: false });
		}
	},

	addProject: async (name) => {
		const newProject: Project = { id: crypto.randomUUID(), name };
		const updatedProjects = [...get().projects, newProject];
		await writeFileAndCommit('/projects.json', updatedProjects, `feat: add project '${name}'`);
		set({ projects: updatedProjects });
	},

	renameProject: async (projectId, name) => {
		const updatedProjects = get().projects.map((p) =>
			p.id === projectId ? { ...p, name } : p
		);
		await writeFileAndCommit('/projects.json', updatedProjects, `feat: rename project to '${name}'`);
		set({ projects: updatedProjects });
	},

	deleteProject: async (projectId) => {
		const updatedProjects = get().projects.filter((p) => p.id !== projectId);
		await writeFileAndCommit('/projects.json', updatedProjects, `feat: delete project`);
		set({
			projects: updatedProjects,
			activeProjectId: get().activeProjectId === projectId ? null : get().activeProjectId,
		});
	},

	selectProject: (projectId) => set({ activeProjectId: projectId }),
	toggleProjectExpansion: (projectId) =>
		set((state) => ({
			activeProjectId: state.activeProjectId === projectId ? null : state.activeProjectId,
		})),
}));