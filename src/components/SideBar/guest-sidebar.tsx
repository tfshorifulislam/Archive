"use client";

import Link from "next/link";
import { LogIn, UserPlus, X } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

interface GuestSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const GuestSidebar = ({
    open,
    onOpenChange,
}: GuestSidebarProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="w-[280px] p-0"
            >
                {/* Header */}
                <SheetHeader className="border-b px-5 py-5 text-left">
                    <SheetTitle className="text-xl font-bold">
                        Welcome
                    </SheetTitle>

                    <SheetDescription>
                        Login or create an account to continue.
                    </SheetDescription>
                </SheetHeader>

                {/* Content */}
                <div className="flex flex-col gap-3 p-5">

                    {/* Login */}
                    <Link
                        href="/auth/login"
                        onClick={() => onOpenChange(false)}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <LogIn className="h-4 w-4" />
                        Login
                    </Link>

                    {/* Sign Up */}
                    <Link
                        href="/auth/signup"
                        onClick={() => onOpenChange(false)}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                    </Link>

                </div>
            </SheetContent>
        </Sheet>
    );
};

export default GuestSidebar;