import { SavedPost } from "../../../types/createPost";
import PostCard from "./Post.Card";

interface SavedPostsProps {
    allSavePost: SavedPost[];
}

const SavedPosts = ({ allSavePost }: SavedPostsProps) => {
    return (
        <div className="w-full py-6">
            <div className="mx-auto w-full">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Saved Posts
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Your saved posts
                    </p>
                </div>

                {allSavePost.length > 0 ? (
                    <div>
                        {allSavePost.map((savedPost) => (
                            <PostCard
                                key={savedPost.id}
                                post={savedPost.post}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border bg-card p-10 text-center">
                        <h3 className="font-semibold">
                            No saved posts yet
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            You haven&apos;t saved any posts yet.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SavedPosts;