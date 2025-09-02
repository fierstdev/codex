import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { Providers } from '@/app/providers';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/shared/components/ui/resizable';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { cn } from '@/shared/lib/utils';

// Helper to get layout from localStorage
const getInitialLayout = (): number[] => {
	const layout = localStorage.getItem('codex-sidebar-layout');
	return layout ? JSON.parse(layout) : [20, 80];
};

export function RootLayout() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [layout, setLayout] = useState<number[]>(getInitialLayout());
	const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

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
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={onLayout}
				className="min-h-screen w-full rounded-none border-0"
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
						onCollapse={toggleSidebar}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={layout[1]}>
					<Outlet />
				</ResizablePanel>
			</ResizablePanelGroup>
		</Providers>
	);
}