import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { ProfileHeaderProps } from "../../../types/userProfileTypes";
import { Button } from "../ui/button";
import { EditProfileDialog } from "./EditProfile";

const ProfileHeader = ({
    user,
    isOwnProfile,
}: ProfileHeaderProps) => {
    return (
        <div className="flex w-full flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between mt-10">

            {/* Profile Info */}
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <Image
                    width={100}
                    height={100}
                    src={user.image || "/placeholder.jpg"}
                    alt={user.userName}
                    className="size-20 shrink-0 rounded-full object-cover sm:size-24"
                />

                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-bold sm:text-3xl md:text-4xl">
                        {user.name}
                    </h1>

                    <p className="mt-1 truncate text-sm text-muted-foreground sm:text-base md:text-lg">
                        @{user.userName}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 self-start sm:gap-4 lg:self-auto">
                <div>
                    {isOwnProfile ?
                        <EditProfileDialog
                            user={user} />
                        :
                        <Button>Follow</Button>}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                    <Ellipsis className="size-5 sm:size-6" />
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;