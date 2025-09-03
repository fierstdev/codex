import { useMemo } from 'react';
import { useProjectStore } from '../model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';
import type { Project } from '../model/types';

// This will be the shape of the data our hook returns
export type ProjectWithCount = Project & { documentCount: number };

export function useProjectsWithCounts(): ProjectWithCount[] {
	const { projects } = useProjectStore();
	const { documents } = useDocumentStore();

	// useMemo ensures this expensive calculation only runs when projects or documents change
	return useMemo(() => {
		return projects.map(project => ({
			...project,
			documentCount: documents.filter(doc => doc.projectId === project.id).length,
		}));
	}, [projects, documents]);
}