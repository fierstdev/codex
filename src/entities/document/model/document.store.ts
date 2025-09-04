import { create } from 'zustand';
import type { Document } from './types';
import type { JSONContent } from '@tiptap/core';
import { generateText } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { pfs } from '@/shared/lib/fs';
import { writeFileAndCommit } from '@/shared/lib/git';



// A helper to generate a summary from TipTap's content
function getContentSummary(content: JSONContent): string {
	const text = generateText(content, [
		StarterKit.configure({
			// Configure StarterKit with only the extensions needed for text generation
			// to keep it lightweight.
			heading: false,
			blockquote: false,
			bold: false,
			bulletList: false,
			codeBlock: false,
			// etc. for all extensions not needed for plain text
		}),
	]);
	const summary = text.substring(0, 40).trim();
	return summary ? `${summary}${text.length > 40 ? '...' : ''}` : '(empty content)';
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

		await writeFileAndCommit(`/documents/${newDocument.id}.json`, newDocument, `feat: add document '${title}'`);
		set((state) => ({ documents: [...state.documents, newDocument] }));
		return newDocument;
	},

	renameDocument: async (documentId, title) => {
		const doc = get().documents.find(d => d.id === documentId);
		if (!doc) return;

		const updatedDoc = { ...doc, title, updatedAt: new Date().toISOString() };
		await writeFileAndCommit(`/documents/${documentId}.json`, updatedDoc, `feat: rename document to '${title}'`);
		set((state) => ({
			documents: state.documents.map((d) => d.id === documentId ? updatedDoc : d),
		}));
	},

	deleteDocument: async (documentId) => {
		const filepath = `documents/${documentId}.json`;
		await pfs.unlink(`/${filepath}`);
		// A commit is created by removing the file from the index
		await writeFileAndCommit('/documents.json', get().documents, `feat: delete document ${documentId}`);
		set((state) => ({
			documents: state.documents.filter((doc) => doc.id !== documentId),
			activeDocumentId: state.activeDocumentId === documentId ? null : state.activeDocumentId,
		}));
	},

	deleteDocumentsByProjectId: async (projectId) => {
		const docsToDelete = get().documents.filter(doc => doc.projectId === projectId);
		for (const doc of docsToDelete) {
			await pfs.unlink(`/documents/${doc.id}.json`);
		}
		const updatedDocuments = get().documents.filter(doc => doc.projectId !== projectId);
		await writeFileAndCommit('/documents.json', updatedDocuments, `feat: delete documents for project ${projectId}`);
		set({ documents: updatedDocuments });
	},

	updateDocumentContent: async (documentId, content) => {
		const doc = get().documents.find(d => d.id === documentId);
		if (!doc) return;

		const updatedDoc = { ...doc, content, updatedAt: new Date().toISOString() };
		const summary = getContentSummary(content);

		await writeFileAndCommit(`/documents/${documentId}.json`, updatedDoc, `Update: "${summary}"`);
		set((state) => ({
			documents: state.documents.map((d) => d.id === documentId ? updatedDoc: d),
		}));
	},

	setActiveDocument: (documentId) => set({ activeDocumentId: documentId }),
}));