import { useProjectStore } from '@/entities/project/model/project.store';
import { ProjectCard } from '@/entities/project/ui/ProjectCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export function ProjectGrid() {
	const { projects, setActiveProject } = useProjectStore();

	return (
		<div className="p-6 h-full flex flex-col">
			<Breadcrumbs />
			<h1 className="text-2xl font-bold mb-4">All Projects</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onClick={() => setActiveProject(project.id)}
					/>
				))}
			</div>
		</div>
	);
}