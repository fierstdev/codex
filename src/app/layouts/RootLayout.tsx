import { useState, useRef, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { Providers } from '@/app/providers';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/shared/components/ui/resizable';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { cn } from '@/shared/lib/utils';
import { FileSystemProvider } from '@/app/providers/FileSystemProvider.tsx';
import { useProjectStore } from '@/entities/project/model/project.store';
import { useDocumentStore } from '@/entities/document/model/document.store';

export type AppLayoutContext = {
	onSidebarToggle: () => void;
};

// Helper to get layout from localStorage
const getInitialLayout = (): number[] => {
	const layout = localStorage.getItem('codex-sidebar-layout');
	return layout ? JSON.parse(layout) : [20, 80];
};

export function RootLayout() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [layout, setLayout] = useState<number[]>(getInitialLayout());
	const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

	const loadProjects = useProjectStore((state) => state.loadProjects);
	const loadDocuments = useDocumentStore((state) => state.loadDocuments);

	useEffect(() => {
		// After the FileSystemProvider initializes, load the data into our stores.
		loadProjects();
		loadDocuments();
	}, [loadProjects, loadDocuments]);

	const onLayout = (sizes: number[]) => {
		// Only save the layout to state and localStorage if the sidebar is not collapsed
		if (sizes[0] > 5) {
			setLayout(sizes);
			localStorage.setItem('codex-sidebar-layout', JSON.stringify(sizes));
		}
	};

	const toggleSidebar = () => {
		const sidebarPanel = sidebarPanelRef.current;
		if (sidebarPanel) {
			if (isCollapsed) {
				// If it's currently collapsed, expand it to the last known size
				sidebarPanel.resize(layout[0]);
			} else {
				// Otherwise, collapse it
				sidebarPanel.collapse();
			}
		}
	};

	return (
		<Providers>
			<FileSystemProvider>
				<ResizablePanelGroup
					direction="horizontal"
					onLayout={onLayout}
					className="min-h-screen w-full"
				>
					<ResizablePanel
						ref={sidebarPanelRef}
						collapsible
						collapsedSize={4}
						minSize={15}
						maxSize={20}
						defaultSize={layout[0]}
						onCollapse={() => setIsCollapsed(true)}
						onExpand={() => setIsCollapsed(false)}
						className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
					>
						<Sidebar
							isCollapsed={isCollapsed}
						/>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={layout[1]}>
						<Outlet context={{ onSidebarToggle: toggleSidebar } satisfies AppLayoutContext} />
					</ResizablePanel>
				</ResizablePanelGroup>
			</FileSystemProvider>
		</Providers>
	);
}

// Helper to get Outlet context type
export function useAppLayout() {
	return useOutletContext<AppLayoutContext>();
}