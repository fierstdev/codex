import { History, ChevronsRight } from 'lucide-react';
import type { Document } from '@/entities/document/model/types';
import { CommitCard } from '@/entities/commit/ui/CommitCard';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';

interface HistorySidebarProps {
	document: Document;
	isCollapsed: boolean;
	onCollapse: () => void;
}

export function HistorySidebar({ document, isCollapsed, onCollapse }: HistorySidebarProps) {

	if (isCollapsed) {
		return (
			<TooltipProvider delayDuration={100}>
				<div className="flex h-full flex-col items-center justify-center">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" onClick={onCollapse}>
								<History className="h-5 w-5" />
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
				<div>
					{(document.history && document.history.length > 0) ? (
						document.history.map((commit) => (
							<CommitCard key={commit.oid} commit={commit} document={document} />
						))
					) : (
						<p className="p-4 text-sm text-muted-foreground">No saved history for this document yet.</p>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}