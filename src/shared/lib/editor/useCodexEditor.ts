import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { JSONContent } from '@tiptap/core';

interface UseCodexEditorProps {
	content: JSONContent;
	onUpdate: (content: JSONContent) => void;
}

export function useCodexEditor({ content, onUpdate }: UseCodexEditorProps) {
	return useEditor({
		extensions: [
			StarterKit.configure({
				link: {
					openOnClick: false,
					autolink: true,
				}
			}),
			// SlashCommand,
			// GlobalShortcuts
		],
		content: content,
		editorProps: {
			attributes: {
				class: 'prose dark:prose-invert max-w-none prose-sm sm:prose-base focus:outline-none',
			},
		},
		onUpdate: ({editor}) => {
			onUpdate(editor.getJSON());
		},
	});
}