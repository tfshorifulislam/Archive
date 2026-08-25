import { getSavedPosts } from "@/services/getSavePost";
import PostCard from "@/components/home/Post.Card";

const SavedPost = async () => {
    const savePost = await getSavedPosts();
    const allSavePost = savePost.savedPosts;

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Saved Posts
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Posts you saved for later.
                        </p>
                    </div>

                    <div className="rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium">
                        {allSavePost.length}{" "}
                        {allSavePost.length === 1 ? "post" : "posts"}
                    </div>
                </div>
            </div>

            {/* Saved Posts */}
            {allSavePost.length > 0 ? (
                <div className="space-y-4">
                    {allSavePost.map((savedPost) => (
                        <PostCard
                            key={savedPost.id}
                            post={savedPost.post}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>

                    <h2 className="text-lg font-semibold">
                        No saved posts yet
                    </h2>

                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        When you save a post, it will appear here so you can
                        easily find it later.
                    </p>
                </div>
            )}
        </main>
    );
};

export default SavedPost;