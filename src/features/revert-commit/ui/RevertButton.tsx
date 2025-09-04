import { History } from 'lucide-react';
import { revertToFileCommit } from '@/entities/commit/api/commitApi';
import { useDocumentStore } from '@/entities/document/model/document.store';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface RevertButtonProps {
	documentId: string;
	commitOid: string;
}

export function RevertButton({ documentId, commitOid }: RevertButtonProps) {
	const { reloadDocument } = useDocumentStore();

	const handleRevert = async () => {
		try {
			const filepath = `documents/${documentId}.json`;
			await revertToFileCommit(filepath, commitOid);
			await reloadDocument(documentId);
		} catch (error) {
			console.error("Revert failed", error);
			// In a real app, we would show a toast notification on error
		}
	};

	return (
		<TooltipProvider>
			<AlertDialog>
				<Tooltip>
					<TooltipTrigger asChild>
						<AlertDialogTrigger asChild>
							<Button variant="ghost" size="icon" className="h-7 w-7">
								<History className="h-4 w-4" />
							</Button>
						</AlertDialogTrigger>
					</TooltipTrigger>
					<TooltipContent>Revert to this version</TooltipContent>
				</Tooltip>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Revert to this Milestone?</AlertDialogTitle>
						<AlertDialogDescription>
							This will restore the document to its state from this point in time. Your current version will be saved as a new milestone before reverting.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleRevert}>Revert</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</TooltipProvider>
	);
}