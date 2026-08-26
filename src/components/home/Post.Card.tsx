import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

import { Post } from "../../../types/createPost";
import { Button } from "@/components/ui/button";
import { AvatarWithBadge } from "../Shared/Avatar";
import PostCardFooter from "./Post.Card.Footer";

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const formattedDate = formatDistanceToNow(
        new Date(post.createdAt),
        {
            addSuffix: true,
        }
    );

    return (
        <article className="group border-b bg-background py-5 sm:py-8">

            {/* Author */}
            <div className="flex items-center justify-between">
                <Link
                    href={`/profile/${post.user.userName}`}
                    className="flex min-w-0 items-center gap-3"
                >
                    <div className="shrink-0">
                        <AvatarWithBadge user={post.user} />
                    </div>

                    <div className="min-w-0 leading-tight">
                        <p className="truncate text-sm font-semibold">
                            {post.user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground sm:text-[13px]">
                            @{post.user.userName} · {formattedDate}
                        </p>
                    </div>
                </Link>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Post */}
            <div className="mt-5 sm:mt-6">

                {/* Title */}
                <Link href={`/posts/${post.id}`}>
                    <h2 className="line-clamp-3 text-xl font-bold leading-snug tracking-[-0.015em] transition-colors group-hover:text-primary sm:text-2xl">
                        {post.title || "Untitled post"}
                    </h2>
                </Link>

                {/* Image */}
                {post.mediaUrl && post.mediaType === "image" && (
                    <Link
                        href={`/posts/${post.id}`}
                        className="relative mt-4 block aspect-video w-full overflow-hidden rounded-lg sm:mt-5 sm:rounded-xl"
                    >
                        <Image
                            src={post.mediaUrl}
                            alt={post.title || "Post image"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    </Link>
                )}

                {/* Description */}
                <div className="mt-4 sm:mt-5">
                    <div className="line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-6">
                        {parse(post.content)}
                    </div>

                    <Link
                        href={`/posts/${post.id}`}
                        className="mt-1.5 inline-block text-xs font-medium text-primary hover:underline sm:text-sm"
                    >
                        See more
                    </Link>
                </div>

                {/* Reading Time */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>5 min read</span>

                    <span>·</span>

                    <span>
                        {post.tags.length > 0
                            ? `#${post.tags[0]}`
                            : "Article"}
                    </span>
                </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/80 sm:text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
 
            {/* Footer */}
            <PostCardFooter postId={post.id} />
        </article>
    );
};

export default PostCard;