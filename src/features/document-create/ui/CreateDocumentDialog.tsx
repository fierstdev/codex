import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Button } from '@/shared/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface CreateDocumentDialogProps {
	projectId: string;
}

export function CreateDocumentDialog({ projectId }: CreateDocumentDialogProps) {
	const [title, setTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const { addDocument, setActiveDocument } = useDocumentStore();

	const handleCreateDocument = async () => { // Make the handler async
		if (!title.trim()) return;

		const newDoc = await addDocument(projectId, title.trim()); // Await the promise
		setActiveDocument(newDoc.id);
		navigate(`/documents/${newDoc.id}`);

		// Reset state and close dialog
		setTitle('');
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New Document
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Document</DialogTitle>
					<DialogDescription>
						Give your new document a title to get started.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Label htmlFor="doc-title" className="sr-only">
						Title
					</Label>
					<Input
						id="doc-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="e.g., Chapter 1: The Beginning"
						autoFocus
						onKeyDown={(e) => e.key === 'Enter' && handleCreateDocument()}
					/>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleCreateDocument}>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}