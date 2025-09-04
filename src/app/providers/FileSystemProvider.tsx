import React, { useState, useEffect } from 'react';
import * as git from 'isomorphic-git';
import { initRepo } from '@/shared/lib/git';
import { fs, pfs } from '@/shared/lib/fs';
import { useProjectStore } from '@/entities/project/model/project.store.ts';
import { useDocumentStore } from '@/entities/document/model/document.store.ts';

// This data is only used to seed the database on the very first run.
const initialProjects = [
	{ id: '1', name: 'Codex Redesign' },
	{ id: '2', name: 'Marketing Plan Q4' },
	{ id: '3', name: 'Novel - The Final Chapter' },
	{ id: '4', name: 'Personal Journal' },
];
const initialDocuments = [
	{ id: 'doc-1', projectId: '1', title: 'Initial Brainstorming', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'This is where we start brainstorming for the Codex Redesign.' }] }] }, updatedAt: '2025-08-28T10:00:00Z' },
	{ id: 'doc-2', projectId: '1', title: 'UI/UX Mockups', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Notes on the latest Figma mockups.' }] }] }, updatedAt: '2025-08-30T14:30:00Z' },
	{ id: 'doc-3', projectId: '1', title: 'Component Design Specs', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Designing the new components.' }] }] }, updatedAt: '2025-09-01T11:00:00Z' },
	{ id: 'doc-6', projectId: '2', title: 'Campaign Strategy', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Drafting the Q4 marketing campaign strategy.' }] }] }, updatedAt: '2025-08-15T13:00:00Z' },
	{ id: 'doc-8', projectId: '3', title: 'Chapter 1: The Awakening', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'It was a dark and stormy night...' }] }] }, updatedAt: '2025-07-01T18:00:00Z' },
];


export function FileSystemProvider({ children }: { children: React.ReactNode }) {
	const [isInitialized, setIsInitialized] = useState(false);
	const { loadProjects } = useProjectStore.getState();
	const { loadDocuments } = useDocumentStore.getState();

	useEffect(() => {
		(async () => {
			try {
				await initRepo();

				try {
					await pfs.stat('/projects.json');
				} catch (error) {
					console.log("Seeding initial data into the local file system...");

					await pfs.writeFile('/projects.json', JSON.stringify(initialProjects, null, 2));
					await git.add({ fs, dir: '/', filepath: 'projects.json' });

					await pfs.mkdir('/documents');
					for (const doc of initialDocuments) {
						const docPath = `/documents/${doc.id}.json`;
						const relativeDocPath = `documents/${doc.id}.json`;
						await pfs.writeFile(docPath, JSON.stringify(doc, null, 2));
						await git.add({ fs, dir: '/', filepath: relativeDocPath });
					}

					await git.commit({
						fs,
						dir: '/',
						author: { name: 'Codex', email: 'codex@example.com' },
						message: 'feat: initial data seed',
					});
				}

				// Load data into stores AFTER seeding is complete
				await loadProjects();
				await loadDocuments();

				setIsInitialized(true);
			} catch (err) {
				console.error("Failed to initialize the file system:", err);
			}
		})();
	}, [loadProjects, loadDocuments]);

	if (!isInitialized) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<p className="text-muted-foreground">Initializing Codex...</p>
			</div>
		);
	}

	return <>{children}</>;
}