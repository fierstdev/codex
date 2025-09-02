import { Folder } from 'lucide-react';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';
import type { Project } from '../model/types';
import { cn } from '@/shared/lib/utils';

interface ProjectCardProps {
	project: Project;
	onClick: () => void;
	className?: string;
}

export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
	return (
		<Card
			className={cn(
				'cursor-pointer transition-all hover:border-primary',
				className
			)}
			onClick={onClick}
		>
			<CardHeader>
				<div className="flex items-center gap-3 mb-2">
					<Folder className="h-5 w-5 text-muted-foreground" />
					<CardTitle className="text-lg">{project.name}</CardTitle>
				</div>
				<CardDescription>{project.documentCount} documents</CardDescription>
			</CardHeader>
		</Card>
	);
}