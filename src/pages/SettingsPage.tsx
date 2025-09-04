import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { AppearanceSettingsTab } from '@/features/appearance-settings/AppearanceSettingsTab';
import { EditorSettingsTab } from '@/features/editor-settings/EditorSettingsTab';

export function SettingsPage() {
	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Settings</h1>
				<p className="text-muted-foreground">Manage your workspace and editor preferences.</p>
			</div>
			<Tabs defaultValue="appearance">
				<TabsList>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="editor">Editor</TabsTrigger>
				</TabsList>
				<TabsContent value="appearance" className="pt-4">
					<AppearanceSettingsTab />
				</TabsContent>
				<TabsContent value="editor" className="pt-4">
					<EditorSettingsTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}