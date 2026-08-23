import Link from "next/link";
import { MessageCircle, Heart, Bookmark, MoreHorizontal } from "lucide-react";

import { Post } from "../../../types/createPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarWithBadge } from "../Shared/Avatar";

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    const excerpt =
        post.content.length > 180
            ? `${post.content.slice(0, 180)}...`
            : post.content;

    return (
        <article className="group rounded-xl border bg-background transition hover:border-foreground/20 hover:shadow-sm">
            <div className="p-5 sm:p-6">

                {/* Author */}
                <div className="flex items-center justify-between">
                    <Link
                        href={`/profile/${post.user.userName}`}
                        className="flex items-center gap-3"
                    >
                        <AvatarWithBadge
                            user={post.user}
                        />

                        <div className="leading-tight">
                            <p className="text-sm font-semibold">
                                {post.user.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                @{post.user.userName} · {formattedDate}
                            </p>
                        </div>
                    </Link>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="mt-5">
                    <Link href={`/posts/${post.id}`}>
                        <h2 className="text-xl font-bold leading-tight tracking-tight transition group-hover:text-primary sm:text-2xl">
                            {post.title || "Untitled post"}
                        </h2>
                    </Link>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {excerpt}
                    </p>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-1">

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground"
                        >
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">Like</span>
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">Comment</span>
                        </Button>

                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                </div>

            </div>
        </article>
    );
};

export default PostCard;