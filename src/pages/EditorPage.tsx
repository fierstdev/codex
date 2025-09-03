import { useParams, Navigate } from 'react-router-dom';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Editor } from '@/widgets/Editor/Editor';
import { ContentHeader } from '@/widgets/ContentHeader/ContentHeader';

export function EditorPage() {
	const { documentId } = useParams<{ documentId: string }>();
	const { documents } = useDocumentStore();

	if (!documentId) {
		return <Navigate to="/" />;
	}

	const document = documents.find(doc => doc.id === documentId);

	if (!document) {
		return (
			<div className="flex h-full items-center justify-center p-6">
        <span className="text-muted-foreground">
          Document not found.
        </span>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<ContentHeader />
			<div className="p-6 flex-1">
				<Editor document={document} />
			</div>
		</div>
	);
}