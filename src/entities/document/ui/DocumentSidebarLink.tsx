import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { Document } from '../model/types';
import { useDocumentStore } from '../model/document.store';

interface DocumentSidebarLinkProps {
	document: Document;
	isCollapsed: boolean;
}

export function DocumentSidebarLink({ document, isCollapsed }: DocumentSidebarLinkProps) {
	const navigate = useNavigate();
	const { activeDocumentId, setActiveDocument } = useDocumentStore();
	const isActive = activeDocumentId === document.id;

	const handleClick = () => {
		setActiveDocument(document.id);
		navigate(`/documents/${document.id}`);
	};

	return (
		<Button
			onClick={handleClick}
			variant={isActive ? 'secondary' : 'ghost'}
			className={cn('h-9 w-full justify-start', isCollapsed && 'justify-center px-2')}
		>
			<FileText className="h-4 w-4" />
			<span className={cn('ml-2 truncate', isCollapsed && 'hidden')}>
        {document.title}
      </span>
		</Button>
	);
}