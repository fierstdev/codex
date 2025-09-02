import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronsLeft, PlusCircle, Folder } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { Separator } from '@/shared/components/ui/separator';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';
import { CreateProjectDialogContent } from '@/features/project-create/ui/CreateProjectDialog';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { DocumentSidebarLink } from '@/entities/document/ui/DocumentSidebarLink';
import { ScrollArea } from '@/shared/components/ui/scroll-area';


interface SidebarProps {
	isCollapsed: boolean;
	onCollapse: () => void;
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
	const { projects, activeProjectId, setActiveProject } = useProjectStore();
	const { documents } = useDocumentStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { documentId } = useParams<{ documentId: string }>();

	useEffect(() => {
		if (documentId) {
			const currentDocument = documents.find(d => d.id === documentId);
			if (currentDocument && currentDocument.projectId !== activeProjectId) {
				setActiveProject(currentDocument.projectId);
			}
		}
	}, [documentId, documents, activeProjectId, setActiveProject]);

	if (isCollapsed) {
		return (
			<TooltipProvider delayDuration={100}>
				<div className="flex h-full flex-col items-center p-2 pt-4 relative">
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
							{projects.map((project) => (
								<Tooltip key={project.id}>
									<TooltipTrigger asChild>
										<Button
											variant={activeProjectId === project.id ? 'secondary' : 'ghost'}
											size="icon"
											className="h-9 w-9"
											onClick={() => setActiveProject(project.id)}
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
					<Separator className="mt-auto"/>
					<div className="pt-2">
						<Button onClick={onCollapse} variant="outline" size="icon" className="h-9 w-9">
							<ChevronsLeft className="h-4 w-4 rotate-180" />
						</Button>
					</div>
				</div>
			</TooltipProvider>
		);
	}

	return (
		<TooltipProvider delayDuration={100}>
			<div className="flex h-full flex-col p-2 pt-4 relative">
				<div className="flex items-center justify-between pb-2 px-2">
					<h2 className="text-lg font-semibold tracking-tight">Projects</h2>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<Tooltip>
							<TooltipTrigger asChild>
								<DialogTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<PlusCircle className="h-5 w-5" />
										<span className="sr-only">Create Project</span>
									</Button>
								</DialogTrigger>
							</TooltipTrigger>
							<TooltipContent>Create new project</TooltipContent>
						</Tooltip>
						<CreateProjectDialogContent onClose={() => setIsDialogOpen(false)} />
					</Dialog>
				</div>
				<Separator />
				<ScrollArea className="flex-1 -mx-2">
					<Accordion
						type="single"
						collapsible
						value={activeProjectId ?? ''}
						onValueChange={(value) => setActiveProject(value || null)} // Corrected logic
					>
						{projects.map((project) => {
							const projectDocuments = documents.filter(
								(doc) => doc.projectId === project.id
							);
							return (
								<AccordionItem value={project.id} key={project.id} className="border-none">
									<AccordionTrigger className="justify-start gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-primary hover:no-underline">
										<span className="truncate">{project.name}</span>
									</AccordionTrigger>
									<AccordionContent className="pl-4">
										{projectDocuments.length > 0 ? (
											projectDocuments.map((doc) => (
												<DocumentSidebarLink
													key={doc.id}
													document={doc}
													isCollapsed={isCollapsed}
												/>
											))
										) : (
											<div className="px-3 py-2 text-xs text-muted-foreground">
												No documents yet.
											</div>
										)}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</ScrollArea>
				<Separator />
				<div className="p-2">
					<Button onClick={onCollapse} variant="outline" size="icon" className="h-9 w-full">
						<ChevronsLeft className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</TooltipProvider>
	);
}