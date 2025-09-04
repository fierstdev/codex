import { create } from 'zustand';
import { diffWords } from 'diff';
import type { Document } from './types';
import type { JSONContent } from '@tiptap/core';
import { generateText } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { pfs } from '@/shared/lib/fs';
import { writeFileAndCommit, removeFileAndCommit } from '@/shared/lib/git';

function generateCommitMessage(oldContent: JSONContent, newContent: JSONContent): string {
	const oldText = generateText(oldContent, [StarterKit]);
	const newText = generateText(newContent, [StarterKit]);

	const changes = diffWords(oldText, newText);
	const firstChange = changes.find(part => part.added || part.removed);

	if (!firstChange) {
		return 'Update: No text changes detected';
	}

	const changeType = firstChange.added ? 'Add' : 'Delete';
	const changeValue = firstChange.value.trim().substring(0, 40);
	const ellipsis = changeValue.length === 40 ? '...' : '';

	return `${changeType}: "${changeValue}${ellipsis}"`;
}

interface DocumentState {
	documents: Document[];
	isLoading: boolean;
	activeDocumentId: string | null;
	loadDocuments: () => Promise<void>;
	addDocument: (projectId: string, title: string) => Promise<Document>;
	renameDocument: (documentId: string, title: string) => Promise<void>;
	deleteDocument: (documentId: string) => Promise<void>;
	deleteDocumentsByProjectId: (projectId: string) => Promise<void>;
	updateDocumentContent: (documentId: string, content: JSONContent) => Promise<void>;
	setActiveDocument: (documentId: string | null) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
	documents: [],
	isLoading: true,
	activeDocumentId: null,

	loadDocuments: async () => {
		set({ isLoading: true });
		try {
			const docIds = await pfs.readdir('/documents');
			const docPromises = docIds
				.filter(id => id.endsWith('.json'))
				.map(id => pfs.readFile(`/documents/${id}`, 'utf8'));

			const docContents = await Promise.all(docPromises);
			const documents = docContents.map(content => JSON.parse(content as string));

			set({ documents, isLoading: false });
		} catch (error) {
			console.error("Failed to load documents:", error);
			set({ documents: [], isLoading: false });
		}
	},

	addDocument: async (projectId, title) => {
		const newDocument: Document = {
			id: crypto.randomUUID(),
			projectId,
			title,
			content: { type: 'doc', content: [{ type: 'paragraph' }] },
			updatedAt: new Date().toISOString(),
		};

		await writeFileAndCommit(`/documents/${newDocument.id}.json`, newDocument, `Create document: "${title}"`);
		set((state) => ({ documents: [...state.documents, newDocument] }));
		return newDocument;
	},

	renameDocument: async (documentId, title) => {
		const doc = get().documents.find(d => d.id === documentId);
		if (!doc) return;

		const updatedDoc = { ...doc, title, updatedAt: new Date().toISOString() };
		await writeFileAndCommit(`/documents/${documentId}.json`, updatedDoc, `Rename to: "${title}"`);
		set((state) => ({
			documents: state.documents.map((d) => d.id === documentId ? updatedDoc : d),
		}));
	},

	deleteDocument: async (documentId) => {
		const docToDelete = get().documents.find(d => d.id === documentId);
		if (!docToDelete) return;

		await removeFileAndCommit(`/documents/${documentId}.json`, `Delete document: "${docToDelete.title}"`);

		set((state) => ({
			documents: state.documents.filter((doc) => doc.id !== documentId),
			activeDocumentId: state.activeDocumentId === documentId ? null : state.activeDocumentId,
		}));
	},

	deleteDocumentsByProjectId: async (projectId) => {
		const docsToDelete = get().documents.filter(doc => doc.projectId === projectId);
		if (docsToDelete.length === 0) return;

		// Perform all file deletions and commits
		for (const doc of docsToDelete) {
			await removeFileAndCommit(`/documents/${doc.id}.json`, `Delete document: "${doc.title}"`);
		}

		set((state) => ({
			documents: state.documents.filter(doc => doc.projectId !== projectId)
		}));
	},

	updateDocumentContent: async (documentId, content) => {
		const oldDoc = get().documents.find(d => d.id === documentId);
		if (!oldDoc) return;

		const updatedDoc = { ...oldDoc, content, updatedAt: new Date().toISOString() };
		const commitMessage = generateCommitMessage(oldDoc.content, content);

		await writeFileAndCommit(`/documents/${documentId}.json`, updatedDoc, commitMessage);
		set((state) => ({
			documents: state.documents.map((d) => d.id === documentId ? updatedDoc : d),
		}));
	},

	setActiveDocument: (documentId) => set({ activeDocumentId: documentId }),
}));