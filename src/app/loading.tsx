import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />

                <p className="text-sm text-muted-foreground">
                    Loading...
                </p>
            </div>
        </main>
    );
}