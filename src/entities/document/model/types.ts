import type { JSONContent } from '@tiptap/core';
import type { Commit } from '@/entities/commit/model/types';

export interface Document {
	id: string;
	projectId: string;
	title: string;
	content: JSONContent;
	history?: Commit[]; // A cached copy of the document's git history
	updatedAt: string; // ISO 8601 string
}