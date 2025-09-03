import { useProjectStore } from '@/entities/project/model/project.store';
import { ProjectCard } from '@/entities/project/ui/ProjectCard';
import { ContentHeader } from '../ContentHeader/ContentHeader';
import { ProjectActions } from '@/features/project-actions/ui/ProjectActions';
import { useProjectsWithCounts } from '@/entities/project/hooks/useProjectsWithCounts';

export function ProjectGrid() {
	const projectsWithCounts = useProjectsWithCounts();
	const { selectProject } = useProjectStore();

	return (
		<div className="h-full flex flex-col">
			<ContentHeader />
			<div className="p-6 flex-1">
				<h1 className="text-2xl font-bold mb-4">All Projects</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{projectsWithCounts.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onClick={() => selectProject(project.id)}
						>
							<ProjectActions project={project} />
						</ProjectCard>
					))}
				</div>
			</div>
		</div>
	);
}