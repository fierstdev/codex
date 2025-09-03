import { Editor } from '@tiptap/react';
import { Bold, Italic, Strikethrough, Link as LinkIcon } from 'lucide-react';
import { Toggle } from '@/shared/components/ui/toggle';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { useLinkCommand } from '@/shared/lib/editor/hooks/useLinkCommand.ts';

interface StaticEditorToolbarProps {
	editor: Editor | null;
}

export function StaticEditorToolbar({ editor }: StaticEditorToolbarProps) {
	const setLink = useLinkCommand(editor);

	if (!editor) {
		return null;
	}

	return (
		<div className="flex items-center gap-1 border rounded-md p-1 mb-4">
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
				variant={editor.isActive('link') ? 'secondary' : 'ghost'}
				onClick={setLink}
			>
				<LinkIcon className="h-4 w-4" />
			</Button>
		</div>
	);
}