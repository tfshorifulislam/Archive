import Link from "next/link";
import {  Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md text-center">

                <div className="mb-6">
                    <h1 className="text-8xl font-bold tracking-tight">
                        404
                    </h1>

                    <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
                </div>

                <h2 className="text-2xl font-semibold">
                    Page not found
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Sorry, the page you are looking for
                    doesn&apos;t exist or may have been moved.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">

                    <Link href='/'>
                        <Button>
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Button>
                    </Link>

                </div>

            </div>
        </main>
    );
}