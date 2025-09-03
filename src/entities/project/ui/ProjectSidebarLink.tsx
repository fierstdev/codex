import React from 'react';
import type { Project } from '@/entities/project/model/types';
import { ProjectActions } from '@/features/project-actions/ui/ProjectActions';

interface ProjectSidebarLinkProps {
	project: Project;
	children: React.ReactNode; // For the collapsible trigger
}

export function ProjectSidebarLink({ project, children }: ProjectSidebarLinkProps) {
	return (
		<div className="group relative flex items-center rounded-md hover:bg-muted/50">
			{children}
			<div
				className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
				<ProjectActions project={project}/>
			</div>
		</div>
	);
}