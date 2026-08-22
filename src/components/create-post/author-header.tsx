import { Globe2 } from "lucide-react";
import { AvatarWithBadge } from "../Shared/Avatar";

export const AuthorHeader = ({ user }) => {
    return (
        <div className="flex items-center gap-3 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                <AvatarWithBadge
                    user={user} />
            </div>
            <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe2 className="h-3.5 w-3.5" />
                    <span>Public</span>
                </div>
            </div>
        </div>
    );
};