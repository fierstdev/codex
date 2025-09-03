import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { Project } from '@/entities/project/model/types';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/shared/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shared/components/ui/alert-dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface ProjectActionsProps {
	project: Project;
	triggerClassName?: string;
}

export function ProjectActions({ project, triggerClassName }: ProjectActionsProps) {
	const { renameProject, deleteProject } = useProjectStore();
	const { deleteDocumentsByProjectId } = useDocumentStore();
	const [isRenameOpen, setIsRenameOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [newName, setNewName] = useState(project.name);

	const handleRename = () => {
		if (newName.trim() && newName.trim() !== project.name) {
			renameProject(project.id, newName.trim());
		}
		setIsRenameOpen(false);
	};

	const handleDelete = () => {
		deleteDocumentsByProjectId(project.id);
		deleteProject(project.id);
		setIsDeleteOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className={`h-8 w-8 p-0 ${triggerClassName}`}
						onClick={(e) => e.stopPropagation()}
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
					<DropdownMenuItem onSelect={() => { setNewName(project.name); setIsRenameOpen(true); }}>
						Rename
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => setIsDeleteOpen(true)} className="text-red-500 focus:text-red-500">
						Delete Project
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename Project</DialogTitle>
						<DialogDescription>Enter a new name for your project.</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<Label htmlFor="proj-name" className="sr-only">Name</Label>
						<Input id="proj-name" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRename()} />
					</div>
					<DialogFooter>
						<DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
						<Button onClick={handleRename}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete the project "{project.name}" and all {project.documentCount} of its documents. This action cannot be undone.
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