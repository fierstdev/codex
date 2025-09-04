import { useSettingsStore } from '@/entities/settings/model/settings.store';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils';
import { ChevronsRight, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

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
					<ChevronsRight className={cn("h-4 w-4 ml-auto text-muted-foreground", isCollapsed && "hidden")} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-2" side="right" align="start">
				<div className="flex flex-col space-y-1 mb-2">
					<p className="text-sm font-medium leading-none">Austin</p>
					<p className="text-xs leading-none text-muted-foreground">
						austin@example.com
					</p>
				</div>
				<Separator />
				<Button asChild variant="ghost" className="w-full justify-start mt-2">
					<Link to="/settings">
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</Link>
				</Button>
				<Separator className="my-2" />
				<Button variant="ghost" className="w-full justify-start" onClick={toggleLogin}>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</Button>
			</PopoverContent>
		</Popover>
	);
}