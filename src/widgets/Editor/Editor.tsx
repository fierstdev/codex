import { useState, useEffect } from 'react';
import { EditorContent, type JSONContent } from '@tiptap/react';
import { useCodexEditor } from '@/shared/lib/editor/useCodexEditor';
import type { Document } from '@/entities/document/model/types';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { useSettingsStore } from '@/entities/settings/model/settings.store.ts';
import { EditorBubbleMenu } from '@/features/editor-bubble-menu/ui/EditorBubbleMenu';
import { StaticEditorToolbar } from '@/features/editor-toolbar/ui/StaticEditorToolbar.tsx';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface EditorProps {
	document: Document;
}

export function Editor({ document }: EditorProps) {
	const { updateDocumentContent } = useDocumentStore();
	const { toolbarType } = useSettingsStore();

	// Local state for the "dirty" editor content
	const [dirtyContent, setDirtyContent] = useState<JSONContent | null>(null);

	// Debounce the dirty content. The hook will only return the latest value after 2s of inactivity.
	const debouncedContent = useDebounce(dirtyContent, 2000);

	const editor = useCodexEditor({
		content: document.content,
		onUpdate: (content) => {
			// On every keystroke, update the local dirty state, not the store
			setDirtyContent(content);
		},
	});

	// This effect runs when the debounced content changes
	useEffect(() => {
		if (debouncedContent) {
			const isSame = JSON.stringify(debouncedContent) === JSON.stringify(document.content);
			// If the debounced content is different from what's already saved, save it.
			if (!isSame) {
				updateDocumentContent(document.id, debouncedContent);
			}
		}
	}, [debouncedContent, document.id, document.content, updateDocumentContent]);

	// This effect syncs incoming document changes to the editor
	useEffect(() => {
		if (editor && document) {
			const isSame =
				JSON.stringify(editor.getJSON()) === JSON.stringify(document.content);
			if (!isSame) {
				editor.commands.setContent(document.content);
				// When a new doc is loaded, reset the dirty state
				setDirtyContent(null);
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