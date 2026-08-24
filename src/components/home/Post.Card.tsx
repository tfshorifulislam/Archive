import Image from "next/image";
import Link from "next/link";
import {
    MessageCircle,
    Heart,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Post } from "../../../types/createPost";
import { Button } from "@/components/ui/button";
import { AvatarWithBadge } from "../Shared/Avatar";

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
        <article className="group border-b bg-background py-8 sm:py-10">
            {/* ================= AUTHOR ================= */}
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

            {/* ================= POST ================= */}
            <div className="mt-7 flex gap-6 sm:mt-8 sm:gap-8">
                {/* ================= TEXT ================= */}
                <div className="min-w-0 flex-1">
                    <Link href={`/posts/${post.id}`}>
                        <h2 className="line-clamp-2 text-2xl font-bold leading-[1.2] tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-3xl">
                            {post.title || "Untitled post"}
                        </h2>
                    </Link>

                    <div className="mt-4">
                        <p className="line-clamp-3 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-7">
                            {post.content}
                        </p>

                        <Link
                            href={`/posts/${post.id}`}
                            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            See more
                        </Link>
                    </div>

                    {/* Meta */}
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

                {/* ================= IMAGE ================= */}
                {post.mediaUrl &&
                    post.mediaType === "image" && (
                        <Link
                            href={`/posts/${post.id}`}
                            className="
                                relative
                                flex
                                h-32
                                w-40
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-xl
                                sm:h-36
                                sm:w-52
                                md:h-40
                                md:w-60
                            "
                        >
                            <Image
                                src={post.mediaUrl}
                                alt={
                                    post.title ||
                                    "Post image"
                                }
                                fill
                                sizes="
                                    (max-width: 640px) 160px,
                                    (max-width: 768px) 208px,
                                    240px
                                "
                                className="
                                    object-contain
                                    transition-transform
                                    duration-300
                                    group-hover:scale-[1.02]
                                "
                            />
                        </Link>
                    )}
            </div>

            {/* ================= TAGS ================= */}
            {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="
                                rounded-full
                                bg-muted
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-muted-foreground
                                transition-colors
                                hover:bg-muted/80
                            "
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* ================= FOOTER ================= */}
            <div className="mt-7 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    {/* Like */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="
                            h-9
                            gap-2
                            rounded-full
                            px-3
                            text-muted-foreground
                            hover:text-foreground
                        "
                    >
                        <Heart className="h-4 w-4" />

                        <span className="text-xs sm:text-sm">
                            Like
                        </span>
                    </Button>

                    {/* Comment */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className=" h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground "
                    >
                        <MessageCircle className="h-4 w-4" />

                        <span className="text-xs sm:text-sm">
                            Comment
                        </span>
                    </Button>
                </div>

                {/* Bookmark */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground">
                    <Bookmark className="h-4 w-4" />
                </Button>
            </div>
        </article>
    );
};

export default PostCard;