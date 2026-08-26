export default function Loading() {
    return (
        <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">

            <div className="flex flex-col items-center">

                {/* Logo */}
                <div className="relative flex h-14 w-14 items-center justify-center">

                    <div className="absolute inset-0 rounded-full border border-border" />

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            border-2
                            border-transparent
                            border-t-foreground
                            animate-spin
                        "
                        style={{
                            animationDuration: "1s",
                        }}
                    />

                    <span className="font-serif text-xl font-bold">
                        S
                    </span>

                </div>

                {/* Brand */}
                <div className="mt-4 font-serif text-xl font-bold">
                    StoryHub
                </div>

                {/* Dots */}
                <div className="mt-6 flex gap-1">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-foreground" />
                    <span
                        className="h-1 w-1 animate-pulse rounded-full bg-foreground"
                        style={{ animationDelay: "150ms" }}
                    />
                    <span
                        className="h-1 w-1 animate-pulse rounded-full bg-foreground"
                        style={{ animationDelay: "300ms" }}
                    />
                </div>

            </div>

        </main>
    );
}