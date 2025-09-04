import { useSettingsStore } from '@/entities/settings/model/settings.store';
import type { ThemeColor } from '@/entities/settings/model/types';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Check } from 'lucide-react';

const themes: { name: ThemeColor; label: string; color: string }[] = [
	{ name: 'zinc', label: 'Zinc', color: 'bg-zinc-500' },
	{ name: 'rose', label: 'Rose', color: 'bg-rose-500' },
	{ name: 'blue', label: 'Blue', color: 'bg-blue-500' },
	{ name: 'green', label: 'Green', color: 'bg-green-500' },
	{ name: 'orange', label: 'Orange', color: 'bg-orange-500' },
];

export function ThemeSelector() {
	const { theme, setTheme } = useSettingsStore();

	return (
		<div className="space-y-2">
			<Label>Theme</Label>
			<div className="grid grid-cols-3 gap-4">
				{themes.map((t) => (
					<Button
						key={t.name}
						variant="outline"
						className="justify-start gap-2"
						onClick={() => setTheme(t.name)}
					>
            <span
				className={cn('h-4 w-4 rounded-full', t.color)}
			/>
						{t.label}
						{theme === t.name && <Check className="h-4 w-4 ml-auto" />}
					</Button>
				))}
			</div>
		</div>
	);
}