import type { Commit } from '../model/types';
import type { Document } from '@/entities/document/model/types';
import { RevertButton } from '@/features/revert-commit/ui/RevertButton';

interface CommitCardProps {
	commit: Commit;
	document: Document;
}

export function CommitCard({ commit, document }: CommitCardProps) {
	const formattedDate = new Date(commit.timestamp * 1000).toLocaleString([], {
		dateStyle: 'medium',
		timeStyle: 'short',
	});

	return (
		<div className="group flex items-center justify-between p-2 border-b hover:bg-muted/50">
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium truncate">{commit.message}</p>
				<p className="text-xs text-muted-foreground">{formattedDate}</p>
			</div>
			<div className="opacity-0 group-hover:opacity-100 transition-opacity">
				<RevertButton documentId={document.id} commitOid={commit.oid} />
			</div>
		</div>
	);
}