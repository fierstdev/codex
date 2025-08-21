import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Basic CSS for the editor's appearance
const editorStyles = `
.tiptap {
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  min-height: 20rem;
  outline: none;
}

.tiptap:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 1px #6366f1;
}

.tiptap p {
  margin: 0;
}

.tiptap h1, .tiptap h2, .tiptap h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.2;
}
`

const TiptapEditor = () => {
	// Initialize the editor with the StarterKit extension
	// StarterKit includes common text editing features like bold, italic, headings, etc.
	const editor = useEditor({
		extensions: [
			StarterKit,
		],
		content: `
      <h1>Welcome to your new writing app!</h1>
      <p>This is a basic TipTap editor. Start typing here...</p>
    `,
		// Apply an autofocus to the editor when it mounts
		autofocus: true,
		// Make the editor editable
		editable: true,
	})

	return (
		<div>
			{/* Inject the basic editor styles into the document head */}
			<style>{editorStyles}</style>
			{/* The EditorContent component renders the actual editor */}
			<EditorContent editor={editor} />
		</div>
	)
}

function App() {
	return (
		// Main container with Tailwind CSS classes for layout and styling
		<main className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
			<div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Writer's PWA</h1>
				<TiptapEditor />
			</div>
		</main>
	)
}

export default App