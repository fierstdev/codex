import { EditorContent } from '@tiptap/react';
import { useCodexEditor } from '@/shared/lib/editor/useCodexEditor.ts';
import type { Document } from '@/entities/document/model/types';
import { useDocumentStore } from '@/entities/document/model/document.store.ts';
import { EditorBubbleMenu } from '@/features/editor-bubble-menu/ui/EditorBubbleMenu.tsx';

interface EditorProps {
	document: Document;
}

export function Editor({ document }: EditorProps) {
	const { updateDocumentContent } = useDocumentStore();

	const editor = useCodexEditor({
		content: document.content,
		onUpdate: (content) => {
			updateDocumentContent(document.id, content);
		},
	});

	return (
		<div>
			<EditorBubbleMenu editor={editor} />
			<EditorContent editor={editor} />
		</div>
		
	);
}