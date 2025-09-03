import React from 'react';
import { Folder } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { Project } from '../model/types';
import { cn } from '@/shared/lib/utils';


interface ProjectCardProps {
	project: Project;
	onClick: () => void;
	children?: React.ReactNode;
	className?: string;
}

export function ProjectCard({ project, onClick, children, className }: ProjectCardProps) {
	return (
		<div className={cn('relative group', className)}>
			<Card
				className="cursor-pointer transition-all hover:border-primary h-full flex flex-col justify-between"
				onClick={onClick}
			>
				<CardHeader>
					<div className="flex items-center gap-3 mb-2">
						<Folder className="h-5 w-5 text-muted-foreground" />
						<CardTitle className="text-lg">{project.name}</CardTitle>
					</div>
				</CardHeader>
				<CardFooter className="pt-0">
          <span className="text-xs text-muted-foreground">
            {project.documentCount} documents
          </span>
				</CardFooter>
			</Card>
			<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
				{children}
			</div>
		</div>
	);
}