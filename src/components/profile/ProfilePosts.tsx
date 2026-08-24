
import { Post } from "../../../types/createPost";
import PostCard from "../home/Post.Card";

interface ProfilePostsProps {
    posts: Post[];
}

const ProfilePosts = ({
    posts,
}: ProfilePostsProps) => {
    return (
        <div className="w-full py-6">
            <div className="mx-auto w-full">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Posts
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Posts shared by this user
                    </p>
                </div>

                {/* Posts */}
                {posts.length > 0 ? (
                    <div>
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border bg-card p-10 text-center">
                        <h3 className="font-semibold">
                            No posts yet
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            This user hasn&apos;t created any posts yet.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePosts;