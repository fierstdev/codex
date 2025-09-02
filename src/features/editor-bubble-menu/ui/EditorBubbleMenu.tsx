import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Strikethrough, Link as LinkIcon } from 'lucide-react';
import { Toggle } from '@/shared/components/ui/toggle';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { useCallback } from 'react';

interface EditorBubbleMenuProps {
	editor: Editor | null;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
	const setLink = useCallback(() => {
		if (!editor) return;
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		if (url === null) return;
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<BubbleMenu
			editor={editor}
			options={{ autoPlacement: true }}
			className="flex items-center gap-1 bg-background border rounded-md p-1"
		>
			<Toggle
				size="sm"
				pressed={editor.isActive('bold')}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('italic')}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('strike')}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-6" />
			<Button
				size="sm"
				variant="ghost"
				onClick={setLink}
				className={editor.isActive('link') ? 'is-active' : ''}
			>
				<LinkIcon className="h-4 w-4" />
			</Button>
		</BubbleMenu>
	);
}