import { DocumentList } from '@/widgets/DocumentList/DocumentList';
import { useProjectStore } from '@/entities/project/model/project.store';
import { ProjectGrid } from '@/widgets/ProjectGrid/ProjectGrid';

export function HomePage() {
	const activeProjectId = useProjectStore((state) => state.activeProjectId);

	return activeProjectId ? <DocumentList /> : <ProjectGrid />;
}