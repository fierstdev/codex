import type { JSONContent } from '@tiptap/react';

export interface Document {
	id: string;
	projectId: string;
	title: string;
	content: JSONContent;
	updatedAt: string; // ISO 8601 string
}