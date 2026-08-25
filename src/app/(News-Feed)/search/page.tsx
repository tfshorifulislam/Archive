import PostCard from "@/components/home/Post.Card";
import { searchPosts } from "@/services/search-post";
import { Post } from "../../../../types/createPost";

const SearchPage = async ({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
    }>;
}) => {
    const params = await searchParams;

    const search =
        params.search?.trim() || "";

    if (!search) {
        return (
            <div className="py-10 text-center text-muted-foreground">
                Search for something...
            </div>
        );
    }

    const data = await searchPosts(search);

    const posts: Post[] = data.posts ?? [];

    return (
        <div className="py-5">
            <div className="mb-6">
                <h1 className="text-xl font-semibold">
                    Search results
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Results for &quot;{search}&quot;
                </p>
            </div>

            {posts.length > 0 ? (
                <div className="space-y-5">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border bg-card p-10 text-center">
                    <h2 className="font-semibold">
                        No posts found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        We couldn&apos;t find any posts
                        matching &quot;{search}&quot;.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;