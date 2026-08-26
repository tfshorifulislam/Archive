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
        <article className="group border-b bg-background py-6 sm:py-10">

            {/* Author */}
            <div className="flex items-center justify-between">
                <Link
                    href={`/profile/${post.user.userName}`}
                    className="flex items-center gap-3"
                >
                    <AvatarWithBadge user={post.user} />

                    <div className="leading-tight">
                        <p className="text-sm font-semibold sm:text-[15px]">
                            {post.user.name}
                        </p>

                        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                            @{post.user.userName} · {formattedDate}
                        </p>
                    </div>
                </Link>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </div>

            {/* Post Content */}
            <div className="mt-6 sm:mt-8">

                {/* Desktop: Text + Image */}
                <div className="flex flex-col gap-5 md:flex-row md:gap-8">

                    {/* Text */}
                    <div className="min-w-0 flex-1">

                        {/* Title */}
                        <Link href={`/posts/${post.id}`}>
                            <h2 className="line-clamp-3 text-2xl font-bold leading-[1.2] tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-3xl">
                                {post.title || "Untitled post"}
                            </h2>
                        </Link>

                        {/* Mobile Image */}
                        {post.mediaUrl &&
                            post.mediaType === "image" && (
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="relative mt-5 block aspect-video w-full overflow-hidden rounded-xl md:hidden"
                                >
                                    <Image
                                        src={post.mediaUrl}
                                        alt={
                                            post.title ||
                                            "Post image"
                                        }
                                        fill
                                        sizes="100vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                </Link>
                            )}

                        {/* Description */}
                        <div className="mt-4 sm:mt-5">
                            <div className="line-clamp-3 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-7">
                                {parse(post.content)}
                            </div>

                            <Link
                                href={`/posts/${post.id}`}
                                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                            >
                                See more
                            </Link>
                        </div>

                        {/* Reading time + first tag */}
                        <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground sm:text-sm">
                            <span>5 min read</span>

                            <span>·</span>

                            <span>
                                {post.tags.length > 0
                                    ? `#${post.tags[0]}`
                                    : "Article"}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Image */}
                    {post.mediaUrl &&
                        post.mediaType === "image" && (
                            <Link
                                href={`/posts/${post.id}`}
                                className="relative hidden h-36 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-40 sm:w-56 md:flex md:h-44 md:w-64"
                            >
                                <Image
                                    src={post.mediaUrl}
                                    alt={
                                        post.title ||
                                        "Post image"
                                    }
                                    fill
                                    sizes="(max-width: 768px) 224px, 256px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </Link>
                        )}
                </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80"
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