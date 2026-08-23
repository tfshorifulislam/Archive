import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarWithBadgeProps } from "../../../types/avatarWithBadgeProps";


export function AvatarWithBadge({ user }: AvatarWithBadgeProps) {

  if (!user) {
    return null;
  }

  const fallback =
    user.name?.charAt(0).toUpperCase() ||
    user.userName?.charAt(0).toUpperCase() ||
    "U";

  return (
    <Avatar>
      <AvatarImage
        src={user.image || "/placeholder.jpg"}
        alt={user.name || user.userName || "User"}
      />

      <AvatarFallback>
        {fallback}
      </AvatarFallback>

      {/* <AvatarBadge className="bg-green-600 dark:bg-green-800" /> */}
    </Avatar>
  );
}