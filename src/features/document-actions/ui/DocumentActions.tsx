import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { Document } from '@/entities/document/model/types';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Button } from '@/shared/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/shared/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface DocumentActionsProps {
	document: Document;
}

export function DocumentActions({ document }: DocumentActionsProps) {
	const { renameDocument, deleteDocument } = useDocumentStore();
	const [isRenameOpen, setIsRenameOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [newName, setNewName] = useState(document.title);

	const handleRename = () => {
		if (newName.trim() && newName.trim() !== document.title) {
			renameDocument(document.id, newName.trim());
		}
		setIsRenameOpen(false);
	};

	const handleDelete = () => {
		deleteDocument(document.id);
		setIsDeleteOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-8 w-8 p-0"
						onClick={(e) => e.stopPropagation()} // Prevent row click
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onSelect={() => {
						setNewName(document.title);
						setIsRenameOpen(true);
					}}>
						Rename
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => setIsDeleteOpen(true)}
						className="text-red-500 focus:text-red-500"
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Rename Dialog */}
			<Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename Document</DialogTitle>
						<DialogDescription>
							Enter a new name for your document: "{document.title}"
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Label htmlFor="doc-name" className="sr-only">Name</Label>
						<Input
							id="doc-name"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleRename()}
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={handleRename}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Alert Dialog */}
			<AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							document "{document.title}".
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}