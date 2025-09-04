import { useSettingsStore } from '@/entities/settings/model/settings.store';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';

export function ColorModeSelector() {
	const { colorMode, setColorMode } = useSettingsStore();

	return (
		<div className="space-y-2">
			<Label>Color Mode</Label>
			<div className="grid grid-cols-3 gap-4">
				<div
					className={cn('cursor-pointer rounded-md border-2 p-1', colorMode === 'light' ? 'border-primary' : 'border-transparent')}
					onClick={() => setColorMode('light')}
				>
					<Card className="overflow-hidden">
						<CardContent className="p-2 bg-[#ecedef]">
							<div className="flex gap-2">
								<div className="w-1/3 rounded-sm bg-white p-2">
									<div className="h-2 w-full rounded-sm bg-[#ecedef]" />
								</div>
								<div className="w-2/3 flex flex-col gap-2 p-2">
									<div className="h-2 w-full rounded-sm bg-[#ecedef]" />
									<div className="h-2 w-2/3 rounded-sm bg-[#ecedef]" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Label className="block text-center p-2">Light</Label>
				</div>

				<div
					className={cn('cursor-pointer rounded-md border-2 p-1', colorMode === 'dark' ? 'border-primary' : 'border-transparent')}
					onClick={() => setColorMode('dark')}
				>
					<Card className="overflow-hidden bg-[#09090b]">
						<CardContent className="p-2">
							<div className="flex gap-2">
								<div className="w-1/3 rounded-sm bg-[#18181b] p-2">
									<div className="h-2 w-full rounded-sm bg-[#27272a]" />
								</div>
								<div className="w-2/3 flex flex-col gap-2 p-2">
									<div className="h-2 w-full rounded-sm bg-[#27272a]" />
									<div className="h-2 w-2/3 rounded-sm bg-[#27272a]" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Label className="block text-center p-2">Dark</Label>
				</div>

				<div
					className={cn('cursor-pointer rounded-md border-2 p-1', colorMode === 'system' ? 'border-primary' : 'border-transparent')}
					onClick={() => setColorMode('system')}
				>
					<Card className="overflow-hidden">
						<CardContent className="p-2 bg-[#ecedef] dark:bg-[#09090b]">
							<div className="flex gap-2">
								<div className="w-1/3 rounded-sm bg-white dark:bg-[#18181b] p-2">
									<div className="h-2 w-full rounded-sm bg-[#ecedef] dark:bg-[#27272a]" />
								</div>
								<div className="w-2/3 flex flex-col gap-2 p-2">
									<div className="h-2 w-full rounded-sm bg-[#ecedef] dark:bg-[#27272a]" />
									<div className="h-2 w-2/3 rounded-sm bg-[#ecedef] dark:bg-[#27272a]" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Label className="block text-center p-2">System</Label>
				</div>
			</div>
		</div>
	);
}