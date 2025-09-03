import { useEffect } from 'react';
import { EditorContent } from '@tiptap/react';
import { useCodexEditor } from '@/shared/lib/editor/useCodexEditor';
import type { Document } from '@/entities/document/model/types';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { EditorBubbleMenu } from '@/features/editor-bubble-menu/ui/EditorBubbleMenu';
import { StaticEditorToolbar } from '@/features/editor-toolbar/ui/StaticEditorToolbar.tsx';
import { useSettingsStore } from '@/entities/settings/model/settings.store.ts';

interface EditorProps {
	document: Document;
}

export function Editor({ document }: EditorProps) {
	const { updateDocumentContent } = useDocumentStore();
	const { toolbarType } = useSettingsStore();

	const editor = useCodexEditor({
		content: document.content,
		onUpdate: (content) => {
			updateDocumentContent(document.id, content);
		},
	});

	// This effect hook listens for changes to the document prop.
	useEffect(() => {
		if (editor && document) {
			const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(document.content);

			// If the content is different, update the editor.
			if (!isSame) {
				// .setContent() replaces the entire document.
				// The second argument `false` prevents this action from triggering the `onUpdate` callback,
				// avoiding an unnecessary save cycle.
				// @ts-ignore
				editor.commands.setContent(document.content, false);
			}
		}
	}, [document, editor]);

	return (
		<div>
			{toolbarType === 'static' && <StaticEditorToolbar editor={editor} />}
			{toolbarType === 'bubble' && <EditorBubbleMenu editor={editor} />}
			<EditorContent editor={editor} />
		</div>
	);
}