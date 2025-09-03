import { create } from 'zustand';
import type { Document } from './types';
import type { JSONContent } from '@tiptap/core';

const initialDocuments: Document[] = [
	{ id: 'doc-1', projectId: '1', title: 'Initial Brainstorming', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'This is where we start brainstorming for the Codex Redesign.' }] }] }, updatedAt: '2025-08-28T10:00:00Z' },
	{ id: 'doc-2', projectId: '1', title: 'UI/UX Mockups', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Notes on the latest Figma mockups.' }] }] }, updatedAt: '2025-08-30T14:30:00Z' },
	{ id: 'doc-3', projectId: '1', title: 'Component Design Specs', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Designing the new components.' }] }] }, updatedAt: '2025-09-01T11:00:00Z' },
	{ id: 'doc-6', projectId: '2', title: 'Campaign Strategy', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Drafting the Q4 marketing campaign strategy.' }] }] }, updatedAt: '2025-08-15T13:00:00Z' },
	{ id: 'doc-8', projectId: '3', title: 'Chapter 1: The Awakening', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'It was a dark and stormy night...' }] }] }, updatedAt: '2025-07-01T18:00:00Z' },
];

interface DocumentState {
	documents: Document[];
	activeDocumentId: string | null;
	setActiveDocument: (documentId: string | null) => void;
	updateDocumentContent: (documentId: string, content: JSONContent) => void;
	addDocument: (projectId: string, title: string) => Document;
	renameDocument: (documentId: string, title: string) => void;
	deleteDocument: (documentId: string) => void;
	deleteDocumentsByProjectId: (projectId: string) => void;
}

export const useDocumentStore = create<DocumentState>((set, _get) => ({
	documents: initialDocuments,
	activeDocumentId: null,
	setActiveDocument: (documentId) => set({ activeDocumentId: documentId }),
	updateDocumentContent: (documentId, content) =>
		set((state) => ({
			documents: state.documents.map((doc) =>
				doc.id === documentId
					? { ...doc, content, updatedAt: new Date().toISOString() }
					: doc
			),
		})),
	addDocument: (projectId, title) => {
		const newDocument: Document = {
			id: crypto.randomUUID(),
			projectId,
			title,
			content: { type: 'doc', content: [{ type: 'paragraph' }] },
			updatedAt: new Date().toISOString(),
		};
		set((state) => ({ documents: [...state.documents, newDocument] }));
		return newDocument;
	},
	renameDocument: (documentId, title) =>
		set((state) => ({
			documents: state.documents.map((doc) =>
				doc.id === documentId ? { ...doc, title, updatedAt: new Date().toISOString() } : doc
			),
		})),
	deleteDocument: (documentId) =>
		set((state) => ({
			documents: state.documents.filter((doc) => doc.id !== documentId),
			// If the deleted doc was active, unset it
			activeDocumentId: state.activeDocumentId === documentId ? null : state.activeDocumentId,
		})),
	deleteDocumentsByProjectId: (projectId) =>
		set((state) => ({
			documents: state.documents.filter((doc) => doc.projectId !== projectId),
		})),
}));