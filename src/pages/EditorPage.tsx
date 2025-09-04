import { useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDocumentStore } from '@/entities/document/model/document.store';
import { Editor } from '@/widgets/Editor/Editor';
import { ContentHeader } from '@/widgets/ContentHeader/ContentHeader';
import { useSettingsStore } from '@/entities/settings/model/settings.store.ts';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/ui/resizable';
import { HistorySidebar } from '@/widgets/HistorySidebar/HistorySidebar';
import { cn } from '@/shared/lib/utils.ts';
import type { ImperativePanelHandle } from 'react-resizable-panels';


export function EditorPage() {
	const { documentId } = useParams<{ documentId: string }>();
	const { documents } = useDocumentStore();
	const { fontFamily } = useSettingsStore();

	const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);
	const historyPanelRef = useRef<ImperativePanelHandle>(null);

	const toggleHistorySidebar = () => {
		const panel = historyPanelRef.current;
		if (panel) {
			if (panel.isCollapsed()) {
				panel.resize(25); // Expand to 25%
			} else {
				panel.collapse();
			}
		}
	};

	if (!documentId) {
		return <Navigate to="/" />;
	}

	const document = documents.find(doc => doc.id === documentId);

	if (!document) {
		return (
			<div className="flex h-full flex-col">
				<ContentHeader />
				<div className="flex h-full items-center justify-center p-6">
					<span className="text-muted-foreground">Document not found.</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<ContentHeader/>
			<ResizablePanelGroup direction="horizontal" className="flex-1">
				<ResizablePanel defaultSize={75}>
					<div className="p-6 h-full" data-font={fontFamily}>
						<Editor document={document}/>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle/>
				<ResizablePanel
					ref={historyPanelRef}
					collapsible
					collapsedSize={4}
					defaultSize={25}
					minSize={20}
					onCollapse={() => setIsHistoryCollapsed(true)}
					onExpand={() => setIsHistoryCollapsed(false)}
					className={cn(isHistoryCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
				>
					<HistorySidebar
						document={document}
						isCollapsed={isHistoryCollapsed}
						onCollapse={toggleHistorySidebar}
					/>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}