import { useTheme } from '@/shared/ui/theme-provider';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="space-y-2">
			<Label>Theme</Label>
			<RadioGroup
				value={theme}
				onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
			>
				<div className="flex items-center justify-between">
					<Label htmlFor="theme-light" className="font-normal">Light</Label>
					<RadioGroupItem value="light" id="theme-light" />
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="theme-dark" className="font-normal">Dark</Label>
					<RadioGroupItem value="dark" id="theme-dark" />
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="theme-system" className="font-normal">System</Label>
					<RadioGroupItem value="system" id="theme-system" />
				</div>
			</RadioGroup>
		</div>
	);
}