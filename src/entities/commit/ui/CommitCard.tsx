import type { Commit } from '../model/types';

export function CommitCard({ commit }: { commit: Commit }) {
	const formattedDate = new Date(commit.timestamp * 1000).toLocaleString([], {
		dateStyle: 'medium',
		timeStyle: 'short',
	});

	return (
		<div className="p-2 border-b">
			<p className="text-sm font-medium">{commit.message}</p>
			<p className="text-xs text-muted-foreground">{formattedDate}</p>
		</div>
	);
}