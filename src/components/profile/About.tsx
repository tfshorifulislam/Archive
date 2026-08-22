import { CalendarDays, UserRound } from "lucide-react";
import { AboutProps } from "../../../types/userProfileTypes";



const About = ({ user }: AboutProps) => {
    const joinedDate = new Date(user.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="w-full py-6">
            <div className="rounded-xl border bg-card p-5 sm:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        About
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Information about {user.name}
                    </p>
                </div>

                {/* Information */}
                <div className="space-y-5">

                    {/* Name */}
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            <UserRound className="size-5 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Name
                            </p>

                            <p className="font-medium">
                                {user.name}
                            </p>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            <span className="text-sm font-semibold text-muted-foreground">
                                @
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Username
                            </p>

                            <p className="font-medium">
                                @{user.userName}
                            </p>
                        </div>
                    </div>

                    {/* Joined */}
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            <CalendarDays className="size-5 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Joined
                            </p>

                            <p className="font-medium">
                                {joinedDate}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;