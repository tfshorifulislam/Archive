"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    User,
    PlusSquare,
    Search,
    Menu,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import GuestSidebar from "../SideBar/guest-sidebar";



const MobileBottomNav = () => {
    const { data: session } = useSession();

    const userName = session?.user?.userName;
    const isLoggedIn = !!session?.user;

    const pathname = usePathname();
    const router = useRouter();

    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [guestSidebarOpen, setGuestSidebarOpen] = useState(false);

    const handleSearch = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const value = search.trim();

        if (!value) return;

        router.push(
            `/search?search=${encodeURIComponent(value)}`
        );

        setSearch("");
        setSearchOpen(false);
    };

    const items = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Post",
            url: "/create-post",
            icon: PlusSquare,
        },
        {
            title: "Profile",
            url: userName
                ? `/profile/${userName}`
                : "/auth/login",
            icon: User,
        },
    ];

    return (
        <>
            {!isLoggedIn && (
                <GuestSidebar
                    open={guestSidebarOpen}
                    onOpenChange={setGuestSidebarOpen}
                />
            )}

            {searchOpen && (
                <div className="fixed inset-x-0 top-0 z-[60] border-b bg-background/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
                    <form
                        onSubmit={handleSearch}
                        className="mx-auto w-full max-w-md"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                autoFocus
                                type="search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search posts..."
                                className="h-10 rounded-full pl-9 pr-4"
                            />
                        </div>
                    </form>
                </div>
            )}

            <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur lg:hidden">
                <div className="mx-auto flex h-16 w-full max-w-md items-center justify-around px-1">

                    {items.map((item) => {
                        const Icon = item.icon;

                        {/* Search */}
                        if (item.title === "Search") {
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() =>
                                        setSearchOpen(
                                            (prev) => !prev
                                        )
                                    }
                                    className={`flex h-full w-full max-w-20 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                                        searchOpen
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Search
                                        className="h-5 w-5"
                                        strokeWidth={
                                            searchOpen ? 2.5 : 2
                                        }
                                    />

                                    <span>Search</span>
                                </button>
                            );
                        }

                        {/* Normal Navigation */}
                        const active =
                            pathname === item.url;

                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={`flex h-full w-full max-w-20 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                                    active
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <Icon
                                    className={`h-5 w-5 ${
                                        active
                                            ? "stroke-[2.5]"
                                            : ""
                                    }`}
                                />

                                <span>{item.title}</span>
                            </Link>
                        );
                    })}

                    {/* =========================
                        Guest Menu
                    ========================= */}
                    {!isLoggedIn && (
                        <button
                            type="button"
                            onClick={() =>
                                setGuestSidebarOpen(true)
                            }
                            className={`flex h-full w-full max-w-20 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                                guestSidebarOpen
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Menu
                                className="h-5 w-5"
                                strokeWidth={
                                    guestSidebarOpen
                                        ? 2.5
                                        : 2
                                }
                            />

                            <span>Menu</span>
                        </button>
                    )}


                    {isLoggedIn && (
                        <Link
                            href="/menu"
                            className="flex h-full w-full max-w-20 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Menu className="h-5 w-5" />

                            <span>Menu</span>
                        </Link>
                    )}

                </div>
            </nav>
        </>
    );
};

export default MobileBottomNav;