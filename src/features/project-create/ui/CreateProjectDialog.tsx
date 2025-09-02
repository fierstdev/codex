import { useState, type SetStateAction } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useProjectStore } from '@/entities/project/model/project.store';

// We pass a function to close the dialog from the parent
interface CreateProjectDialogContentProps {
	onClose: () => void;
}

export function CreateProjectDialogContent({onClose}: CreateProjectDialogContentProps) {
	const [projectName, setProjectName] = useState('');
	const addProject = useProjectStore((state) => state.addProject);

	const handleCreateProject = () => {
		if (projectName.trim()) {
			addProject(projectName.trim());
			setProjectName(''); // Reset input
			onClose(); // Close dialog using the passed function
		}
	};

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create New Project</DialogTitle>
				<DialogDescription>
					Give your new project a name. You can change this later.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						id="name"
						value={projectName}
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setProjectName(e.target.value)}
						className="col-span-3"
						autoFocus
						onKeyDown={(e: { key: string; }) => e.key === 'Enter' && handleCreateProject()}
					/>
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button type="submit" onClick={handleCreateProject}>
					Create Project
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}