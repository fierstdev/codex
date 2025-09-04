import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { ColorModeSelector } from './ui/ColorModeSelector';
import { ThemeSelector } from './ui/ThemeSelector';

export function AppearanceSettingsTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Appearance</CardTitle>
				<CardDescription>
					Customize the look and feel of your workspace.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<ColorModeSelector />
				<Separator />
				<ThemeSelector />
			</CardContent>
		</Card>
	);
}