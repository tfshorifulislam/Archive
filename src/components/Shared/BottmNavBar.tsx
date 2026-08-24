"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, PlusSquare, Settings2 } from "lucide-react";

const MobileBottomNav = ({ user }: { user?: { userName?: string } }) => {
    const pathname = usePathname();

    const items = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Profile",
            url: `/profile/${user?.userName}`,
            icon: User,
        },
        {
            title: "Post",
            url: "/create-post",
            icon: PlusSquare,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
    ];

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur lg:hidden">
            <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.url;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={`flex h-full w-20 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Icon
                                className={`h-5 w-5 ${
                                    active ? "stroke-[2.5]" : ""
                                }`}
                            />

                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileBottomNav;