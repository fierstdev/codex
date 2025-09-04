import { useState, useEffect, useRef } from 'react';
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

	// Use a ref to store the latest state for access in the unmount cleanup function
	const saveStateRef = useRef({
		dirtyContent,
		document,
		updateDocumentContent,
	});

	useEffect(() => {
		saveStateRef.current = { dirtyContent, document, updateDocumentContent };
	});

	const editor = useCodexEditor({
		content: document.content,
		onUpdate: (content) => {
			// On every keystroke, update the local dirty state, not the store
			setDirtyContent(content);
		},
	});

	// Effect for debounced autosaving
	useEffect(() => {
		const saveContent = async () => {
			if (debouncedContent) {
				const isSame = JSON.stringify(debouncedContent) === JSON.stringify(document.content);
				if (!isSame) {
					await updateDocumentContent(document.id, debouncedContent);
				}
			}
		};

		saveContent().catch(console.error);

	}, [debouncedContent, document.id, document.content, updateDocumentContent]);

	// Effect for syncing incoming document changes to the editor
	useEffect(() => {
		if (editor && document) {
			const isSame =
				JSON.stringify(editor.getJSON()) === JSON.stringify(document.content);

			if (!isSame) {
				editor.commands.setContent(document.content);
				setDirtyContent(null);
			}
		}
	}, [document, editor]);

	// Effect for saving any pending changes when the user navigates away
	useEffect(() => {
		return () => {
			const { dirtyContent: latestDirtyContent, document: latestDocument, updateDocumentContent: latestUpdate } = saveStateRef.current;

			if (latestDirtyContent) {
				const isSame = JSON.stringify(latestDirtyContent) === JSON.stringify(latestDocument.content);
				if (!isSame) {
					console.log("Saving unsaved changes on exit...");
					// Handle the returned promise to resolve the warning
					(async () => {
						await latestUpdate(latestDocument.id, latestDirtyContent);
					})().catch(err => {
						console.error("Failed to save on exit:", err);
					});
				}
			}
		}
	}, []);

	return (
		<div>
			{toolbarType === 'static' && <StaticEditorToolbar editor={editor} />}
			{toolbarType === 'bubble' && <EditorBubbleMenu editor={editor} />}
			<EditorContent editor={editor} />
		</div>
	);
}