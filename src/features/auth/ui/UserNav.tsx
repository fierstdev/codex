import { useSettingsStore } from '@/entities/settings/model/settings.store';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Separator } from '@/shared/components/ui/separator';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import { cn } from '@/shared/lib/utils';
import { ChevronsUpDown } from 'lucide-react';

interface UserNavProps {
	isCollapsed: boolean;
}

export function UserNav({ isCollapsed }: UserNavProps) {
	const { isLoggedIn, toggleLogin } = useSettingsStore();

	if (!isLoggedIn) {
		return (
			<div className="p-2">
				<Button onClick={toggleLogin} className="w-full">
					Login
				</Button>
			</div>
		);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className={cn("w-full justify-start gap-2 p-2 h-12", isCollapsed && 'justify-center h-12 w-12')}>
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@shadcn" />
						<AvatarFallback>AU</AvatarFallback>
					</Avatar>
					<div className={cn("flex flex-col items-start", isCollapsed && "hidden")}>
						<span className="text-sm font-medium leading-none">Austin</span>
						<span className="text-xs leading-none text-muted-foreground">
              austin@example.com
            </span>
					</div>
					<ChevronsUpDown className={cn("h-4 w-4 ml-auto text-muted-foreground", isCollapsed && "hidden")} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64" side="right" align="start">
				<div className="p-2">
					<div className="flex flex-col space-y-1 mb-4">
						<p className="text-sm font-medium leading-none">Austin</p>
						<p className="text-xs leading-none text-muted-foreground">
							austin@example.com
						</p>
					</div>
					<Separator />
					<div className="py-2">
						<ThemeToggle />
					</div>
					<Separator />
					<Button variant="ghost" className="w-full justify-start mt-2" onClick={toggleLogin}>
						Log out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}