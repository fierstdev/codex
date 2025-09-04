import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Folder, PlusCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { Separator } from '@/shared/components/ui/separator';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';
import { CreateProjectDialogContent } from '@/features/project-create/ui/CreateProjectDialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { DocumentSidebarLink } from '@/entities/document/ui/DocumentSidebarLink';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils';
import { UserNav } from '@/features/auth/ui/UserNav';
import { ProjectSidebarLink } from '@/entities/project/ui/ProjectSidebarLink';
import { useProjectsWithCounts } from '@/entities/project/hooks/useProjectsWithCounts';


interface SidebarProps {
	isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
	const navigate = useNavigate();
	const projectsWithCounts = useProjectsWithCounts();
	const { activeProjectId, selectProject, toggleProjectExpansion } = useProjectStore();
	const { documents } = useDocumentStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { documentId } = useParams<{ documentId: string }>();

	useEffect(() => {
		if (documentId) {
			const currentDocument = documents.find(d => d.id === documentId);
			if (currentDocument && currentDocument.projectId !== activeProjectId) {
				selectProject(currentDocument.projectId);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentId, documents]);

	const handleNavigateToProject = (projectId: string) => {
		selectProject(projectId);
		navigate('/');
	};

	if (isCollapsed) {
		return (
			<TooltipProvider delayDuration={100}>
				<div className="flex h-full flex-col items-center py-4">
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<Tooltip>
							<TooltipTrigger asChild>
								<DialogTrigger asChild>
									<Button variant="ghost" size="icon" className="h-9 w-9 mb-2">
										<PlusCircle className="h-5 w-5" />
										<span className="sr-only">Create Project</span>
									</Button>
								</DialogTrigger>
							</TooltipTrigger>
							<TooltipContent side="right">Create new project</TooltipContent>
						</Tooltip>
						<CreateProjectDialogContent onClose={() => setIsDialogOpen(false)} />
					</Dialog>
					<Separator />
					<ScrollArea className="flex-1 w-full">
						<nav className="flex flex-col items-center gap-1 py-2">
							{projectsWithCounts.map((project) => (
								<Tooltip key={project.id}>
									<TooltipTrigger asChild>
										<Button
											variant={activeProjectId === project.id ? 'secondary' : 'ghost'}
											size="icon"
											className="h-9 w-9"
											onClick={() => handleNavigateToProject(project.id)}
										>
											<Folder className="h-5 w-5" />
											<span className="sr-only">{project.name}</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="right">{project.name}</TooltipContent>
								</Tooltip>
							))}
						</nav>
					</ScrollArea>
					<div className="mt-auto">
						<UserNav isCollapsed={isCollapsed} />
					</div>
				</div>
			</TooltipProvider>
		);
	}

	return (
		<TooltipProvider delayDuration={100}>
			<div className="flex h-full flex-col">
				<div className={cn("p-2 pt-4 px-4")}></div>
				<ScrollArea className="flex-1">
					<div className="px-4">
						<div className="flex items-center gap-2 pb-2">
							<h3 className="flex-1 font-semibold tracking-tight text-sm truncate min-w-0">
								Projects
							</h3>
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<Tooltip>
									<TooltipTrigger asChild>
										<DialogTrigger asChild>
											<Button variant="ghost" size="icon" className="size-8 flex-shrink-0">
												<PlusCircle className="size-5" />
												<span className="sr-only">Create Project</span>
											</Button>
										</DialogTrigger>
									</TooltipTrigger>
									<TooltipContent side="right">Create new project</TooltipContent>
								</Tooltip>
								<CreateProjectDialogContent onClose={() => setIsDialogOpen(false)} />
							</Dialog>
						</div>
						<div className="flex flex-col gap-1">
							{projectsWithCounts.map((project) => (
								<Collapsible
									key={project.id}
									open={activeProjectId === project.id}
									onOpenChange={() => toggleProjectExpansion(project.id)}
								>
									<ProjectSidebarLink project={project}>
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												className="w-full justify-start gap-2 p-2 h-9"
												onDoubleClick={() => handleNavigateToProject(project.id)}
											>
												<span>{project.name}</span>
											</Button>
										</CollapsibleTrigger>
									</ProjectSidebarLink>
									<CollapsibleContent className="pl-4">
										{documents
											.filter((doc) => doc.projectId === project.id)
											.map((doc) => (
												<DocumentSidebarLink
													key={doc.id}
													document={doc}
													isCollapsed={isCollapsed}
												/>
											))}
									</CollapsibleContent>
								</Collapsible>
							))}
						</div>
					</div>
				</ScrollArea>
				<div className="mt-auto border-t">
					<UserNav isCollapsed={isCollapsed} />
				</div>
			</div>
		</TooltipProvider>
	);
}