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
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export function DocumentList() {
	const navigate = useNavigate();
	const { activeProjectId, projects } = useProjectStore();
	const { documents, setActiveDocument, addDocument } = useDocumentStore();

	const activeProject = projects.find(p => p.id === activeProjectId);
	const projectDocuments = documents
		.filter(doc => doc.projectId === activeProjectId)
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

	const handleRowClick = (docId: string) => {
		setActiveDocument(docId);
		navigate(`/documents/${docId}`);
	};

	const handleNewDocument = () => {
		if (!activeProjectId) return;
		const newDoc = addDocument(activeProjectId, 'Untitled Document');
		setActiveDocument(newDoc.id);
		navigate(`/documents/${newDoc.id}`);
	};

	if (!activeProject) return null;

	return (
		<div className="p-6 h-full flex flex-col">
			<Breadcrumbs />
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">{activeProject.name}</h1>
				<Button onClick={handleNewDocument}>
					<Plus className="mr-2 h-4 w-4" />
					New Document
				</Button>
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}