import React from 'react';
import type { ProjectWithCount } from '../hooks/useProjectsWithCounts'
import { ProjectActions } from '@/features/project-actions/ui/ProjectActions';


interface ProjectSidebarLinkProps {
	project: ProjectWithCount;
	children: React.ReactNode;
}

export function ProjectSidebarLink({ project, children }: ProjectSidebarLinkProps) {
	return (
		<div className="group relative flex w-full items-center rounded-md pr-2 hover:bg-muted/50">
			{children}
			<div
				className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
				<ProjectActions project={project}/>
			</div>
		</div>
	);
}