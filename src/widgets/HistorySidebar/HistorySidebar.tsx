import { useState, useEffect } from 'react';
import type { Document } from '@/entities/document/model/types';
import type { Commit } from '@/entities/commit/model/types';
import { getDocumentHistory } from '@/entities/commit/api/commitApi';
import { CommitCard } from '@/entities/commit/ui/CommitCard';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button.tsx';
import { ChevronsRight, History } from 'lucide-react';
import { Tooltip, TooltipProvider } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip.tsx';

interface HistorySidebarProps {
	document: Document;
	isCollapsed: boolean;
	onCollapse: () => void;
}

export function HistorySidebar({ document, isCollapsed, onCollapse }: HistorySidebarProps) {
	const [history, setHistory] = useState<Commit[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchHistory() {
			setIsLoading(true);
			const docPath = `/documents/${document.id}.json`;
			const commits = await getDocumentHistory(docPath);
			setHistory(commits);
			setIsLoading(false);
		}
		fetchHistory();
	}, [document.id]);

	if (isCollapsed) {
		return (
			<TooltipProvider delayDuration={100}>
				<div className="flex h-full flex-col items-center justify-center">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" onClick={onCollapse}>
								<History className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>View Milestones</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		);
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex items-center justify-between p-4">
				<div>
					<h2 className="text-lg font-semibold tracking-tight">Milestones</h2>
					<p className="text-sm text-muted-foreground">Document history</p>
				</div>
				<Button variant="ghost" size="icon" onClick={onCollapse}>
					<ChevronsRight className="h-5 w-5" />
				</Button>
			</div>
			<Separator />
			<ScrollArea className="flex-1">
				{isLoading ? (
					<p className="p-4 text-sm text-muted-foreground">Loading history...</p>
				) : (
					<div>
						{history.length > 0 ? (
							history.map((commit) => (
								<CommitCard key={commit.oid} commit={commit} />
							))
						) : (
							<p className="p-4 text-sm text-muted-foreground">No saved history for this document yet.</p>
						)}
					</div>
				)}
			</ScrollArea>
		</div>
	);
}