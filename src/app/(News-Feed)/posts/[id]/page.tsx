import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { getPostById } from "@/services/get.post_By_Id";
import { AvatarWithBadge } from "@/components/Shared/Avatar";
import { Button } from "@/components/ui/button";

interface PostDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const PostDetailsPage = async ({ params }: PostDetailsPageProps) => {
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
        <main className="min-h-screen bg-background">

            {/* Top Navigation */}
            <div className="border-b">
                <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                        >
                            <Bookmark className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </div>

            {/* Article */}
            <article className="mx-auto w-full max-w-4xl px-4 sm:px-6">

                {/* Header */}
                <header className="mx-auto max-w-3xl pt-12 pb-10 sm:pt-16 sm:pb-12">

                    {/* Title */}
                    <h1 className="text-[38px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[48px] lg:text-[56px]">
                        {post.title || "Untitled post"}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
                        {post.content.slice(0, 180)}
                        {post.content.length > 180 && "..."}
                    </p>

                    {/* Author */}
                    <div className="mt-7">
                        <Link
                            href={`/profile/${post.user.userName}`}
                            className="flex items-center gap-3"
                        >
                            <AvatarWithBadge user={post.user} />

                            <div>
                                <p className="text-sm font-medium">
                                    {post.user.name}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                    {formattedDate} · 5 min read
                                </p>
                            </div>
                        </Link>
                    </div>

                </header>

                {/* Hero Image */}
                {post.mediaUrl && post.mediaType === "image" && (
                    <div className="mx-auto mb-12 w-full sm:mb-16">
                        <Image
                            src={post.mediaUrl}
                            alt={post.title || "Post image"}
                            width={1200}
                            height={800}
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                            className="h-auto w-full object-contain"
                        />

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}


                {/* Content */}
                <div className="mx-auto max-w-170">

                    <div className="whitespace-pre-wrap text-[18px] leading-[1.8] text-foreground/90 sm:text-[19px] sm:leading-[1.85]">
                        {post.content}
                    </div>

                    {/* Author Footer */}
                    <div className="my-16 border-y py-8">
                        <Link
                            href={`/profile/${post.user.userName}`}
                            className="flex items-center gap-4"
                        >
                            <AvatarWithBadge user={post.user} />

                            <div>
                                <p className="font-medium">
                                    {post.user.name}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
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