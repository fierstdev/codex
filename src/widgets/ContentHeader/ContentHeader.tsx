import { PanelLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { useAppLayout } from '@/app/layouts/RootLayout.tsx';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export function ContentHeader() {
	const { onSidebarToggle } = useAppLayout()

	return (
		<div className="flex h-14 items-center gap-4 border-b bg-background px-6">
			<Button size="icon" variant="ghost" className="h-9 w-9" onClick={onSidebarToggle}>
				<PanelLeft className="h-5 w-5"/>
				<span className="sr-only">Toggle Sidebar</span>
			</Button>
			<Separator orientation="vertical" className="h-8"/>
			<Breadcrumbs/>
		</div>
	);
}