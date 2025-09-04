import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { useSettingsStore } from '@/entities/settings/model/settings.store';
import type { FontFamily, ToolbarType } from '@/entities/settings/model/types';
import { Separator } from '@/shared/components/ui/separator';

export function EditorSettingsTab() {
	const { toolbarType, setToolbarType, fontFamily, setFontFamily } = useSettingsStore();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Editor</CardTitle>
				<CardDescription>
					Customize your writing environment.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label>Toolbar Style</Label>
					<RadioGroup
						value={toolbarType}
						onValueChange={(value) => setToolbarType(value as ToolbarType)}
						className="space-y-1"
					>
						<div>
							<RadioGroupItem value="bubble" id="r1" className="peer sr-only" />
							<Label htmlFor="r1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
								Bubble
							</Label>
						</div>
						<div>
							<RadioGroupItem value="static" id="r2" className="peer sr-only" />
							<Label htmlFor="r2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
								Static
							</Label>
						</div>
					</RadioGroup>
				</div>
				<Separator />
				<div className="space-y-2">
					<Label>Font Family</Label>
					<RadioGroup
						value={fontFamily}
						onValueChange={(value) => setFontFamily(value as FontFamily)}
						className="grid grid-cols-3 gap-4"
					>
						<div>
							<RadioGroupItem value="sans" id="f1" className="peer sr-only" />
							<Label htmlFor="f1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
								Sans Serif
							</Label>
						</div>
						<div>
							<RadioGroupItem value="serif" id="f2" className="peer sr-only" />
							<Label htmlFor="f2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
								Serif
							</Label>
						</div>
						<div>
							<RadioGroupItem value="mono" id="f3" className="peer sr-only" />
							<Label htmlFor="f3" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
								Monospace
							</Label>
						</div>
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	);
}