import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { useSettingsStore } from '@/entities/settings/model/settings.store';
import type { ToolbarType } from '@/entities/settings/model/types';


interface SettingsDialogProps {
	children: React.ReactNode;
}

export function SettingsDialog({ children }: SettingsDialogProps) {
	const { toolbarType, setToolbarType } = useSettingsStore();

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>
						Customize your Codex experience. Changes are saved automatically.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<div className="space-y-2">
						<Label>Editor Toolbar Style</Label>
						<RadioGroup
							value={toolbarType}
							onValueChange={(value) => setToolbarType(value as ToolbarType)}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="bubble" id="r1" />
								<Label htmlFor="r1">Bubble Menu</Label>
							</div>
							<p className="text-sm text-muted-foreground pl-6">
								A floating menu that appears when you select text.
							</p>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="static" id="r2" />
								<Label htmlFor="r2">Static Toolbar</Label>
							</div>
							<p className="text-sm text-muted-foreground pl-6">
								A fixed toolbar at the top of the editor.
							</p>
						</RadioGroup>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}