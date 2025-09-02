import { Link, useParams } from 'react-router-dom';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';

export function Breadcrumbs() {
	const { documentId } = useParams<{ documentId: string }>();
	const { projects, activeProjectId, setActiveProject } = useProjectStore();
	const { documents } = useDocumentStore();

	const activeDocument = documentId ? documents.find(d => d.id === documentId) : undefined;
	const projectIdForActiveDoc = activeDocument?.projectId;
	const activeProject = projects.find(p => p.id === (projectIdForActiveDoc || activeProjectId));

	const handleGoToProjects = () => {
		setActiveProject(null);
	};

	const isOnProjectDashboard = !activeProject && !activeDocument;

	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					{isOnProjectDashboard ? (
						<BreadcrumbPage>Projects</BreadcrumbPage>
					) : (
						<BreadcrumbLink asChild>
							<Link to="/" onClick={handleGoToProjects}>Projects</Link>
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				{activeProject && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{activeDocument ? (
								<BreadcrumbLink asChild>
									<Link to="/" onClick={() => setActiveProject(activeProject.id)}>
										{activeProject.name}
									</Link>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{activeProject.name}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</>
				)}
				{activeDocument && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{activeDocument.title}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}