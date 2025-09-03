import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table"
import { DocumentActions } from '@/features/document-actions/ui/DocumentActions.tsx';
import { CreateDocumentDialog } from '@/features/document-create/ui/CreateDocumentDialog';
import { ContentHeader } from '../ContentHeader/ContentHeader';

export function DocumentList() {
	const navigate = useNavigate();
	const { activeProjectId, projects } = useProjectStore();
	const { documents, setActiveDocument } = useDocumentStore();
	const activeProject = projects.find(p => p.id === activeProjectId);
	const projectDocuments = documents
		.filter(doc => doc.projectId === activeProjectId)
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
	const handleRowClick = (docId: string) => {
		setActiveDocument(docId);
		navigate(`/documents/${docId}`);
	};

	if (!activeProject) return null;

	return (
		<div className="h-full flex flex-col">
			<ContentHeader/>
			<div className="p-6 flex-1">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">{activeProject.name}</h1>
					<CreateDocumentDialog projectId={activeProject.id}/>
				</div>
				<div className="rounded-md border overflow-y-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80%]">Title</TableHead>
								<TableHead className="text-right">Last Updated</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projectDocuments.map(doc => (
								<TableRow
									key={doc.id}
									className="cursor-pointer"
									onClick={() => handleRowClick(doc.id)}
								>
									<TableCell className="font-medium">{doc.title}</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{new Date(doc.updatedAt).toLocaleDateString()}
									</TableCell>
									<TableCell onClick={(e) => e.stopPropagation()}>
										<DocumentActions document={doc}/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}