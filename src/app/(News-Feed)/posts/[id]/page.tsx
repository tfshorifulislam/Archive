import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

import { getPostById } from "@/services/get.post_By_Id";
import { AvatarWithBadge } from "@/components/Shared/Avatar";

interface PostDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const PostDetailsPage = async ({
    params,
}: PostDetailsPageProps) => {
    const { id } = await params;

    const data = await getPostById(id);
    const post = data.post;

    const formattedDate = formatDistanceToNow(
        new Date(post.createdAt),
        {
            addSuffix: true,
        }
    );

    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-background">

            {/* Navigation */}
            <div className="w-full border-b">
                <div className="mx-auto flex h-12 w-full max-w-2xl items-center px-4 sm:h-14 sm:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 shrink-0" />
                        <span>Back</span>
                    </Link>
                </div>
            </div>

            {/* Main Article */}
            <article className="mx-auto w-full max-w-2xl px-4 sm:px-6">

                {/* Header */}
                <header className="pt-6 pb-5 sm:pt-8 sm:pb-6">

                    {/* Title */}
                    <Link href={`/posts/${post.id}`}>
                        <h1
                            className="
                                wrap-break-word
                                text-xl
                                font-bold
                                leading-snug
                                tracking-[-0.015em]
                                transition-colors
                                hover:text-primary
                                sm:text-2xl
                            "
                        >
                            {post.title || "Untitled post"}
                        </h1>
                    </Link>

                    {/* Author */}
                    <div className="mt-5">
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
                    </div>
                </header>

                {/* Image */}
                {post.mediaUrl && post.mediaType === "image" && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl">
                        <Image
                            src={post.mediaUrl}
                            alt={post.title || "Post image"}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, 672px"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="
                                    rounded-full
                                    bg-muted
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-medium
                                    text-muted-foreground
                                    sm:text-xs
                                "
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="mt-6 sm:mt-7">

                    <div
                        className="
                            min-w-0
                            wrap-break-word
                            text-sm
                            leading-6
                            text-foreground/90
                            sm:text-[15px]
                            sm:leading-7
                        "
                    >
                        {parse(post.content)}
                    </div>

                    {/* Reading Information */}
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>5 min read</span>

                        <span>·</span>

                        <span>
                            {post.tags.length > 0
                                ? `#${post.tags[0]}`
                                : "Article"}
                        </span>
                    </div>

                    {/* All Tags */}
                    {post.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-full
                                        bg-muted
                                        px-2.5
                                        py-1
                                        text-[11px]
                                        font-medium
                                        text-muted-foreground
                                        sm:text-xs
                                    "
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author Footer */}
                    <div className="my-10 border-y py-6 sm:my-12 sm:py-7">
                        <Link
                            href={`/profile/${post.user.userName}`}
                            className="flex min-w-0 items-center gap-3 sm:gap-4"
                        >
                            <div className="shrink-0">
                                <AvatarWithBadge user={post.user} />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold sm:text-base">
                                    {post.user.name}
                                </p>

                                <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                                    @{post.user.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default PostDetailsPage;