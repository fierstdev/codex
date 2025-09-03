import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Strikethrough, Heading1, Heading2, Quote, Code, Link as LinkIcon } from 'lucide-react';
import { Toggle } from '@/shared/components/ui/toggle';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { useLinkCommand } from '@/shared/lib/editor/hooks/useLinkCommand.ts';
import { cn } from '@/shared/lib/utils.ts';

interface EditorBubbleMenuProps {
	editor: Editor | null;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
	const setLink = useLinkCommand(editor);

	if (!editor) {
		return null;
	}

	return (
		<BubbleMenu
			editor={editor}
			options={{ autoPlacement: true }}
			className="flex items-center gap-1 bg-background border rounded-md p-1"
		>
			{/* Group 1: Text Style Toggles */}
			<Toggle
				size="sm"
				pressed={editor.isActive('heading', { level: 1 })}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<Heading1 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('heading', { level: 2 })}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				<Heading2 className="h-4 w-4" />
			</Toggle>

			<Separator orientation="vertical" className={cn("w-[1px] mx-1 bg-border data-[orientation=vertical]:h-6")} />

			{/* Group 2: Mark Toggles */}
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

			<Separator orientation="vertical" className={cn("w-[1px] mx-1 bg-border data-[orientation=vertical]:h-6")} />

			{/* Group 3: Block Toggles */}
			<Toggle
				size="sm"
				pressed={editor.isActive('blockquote')}
				onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<Quote className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('codeBlock')}
				onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<Code className="h-4 w-4" />
			</Toggle>

			<Separator orientation="vertical" className={cn("w-[1px] mx-1 bg-border data-[orientation=vertical]:h-6")} />

			{/* Group 4: Link Button */}
			<Button
				size="sm"
				variant={editor.isActive('link') ? 'secondary' : 'ghost'}
				onClick={setLink}
				className="px-2"
			>
				<LinkIcon className="h-4 w-4" />
			</Button>
		</BubbleMenu>
	);
}