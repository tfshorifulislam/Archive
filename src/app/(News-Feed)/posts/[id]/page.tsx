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
                <div className="mx-auto flex h-12 w-full max-w-6xl items-center px-4 sm:h-14 sm:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 shrink-0" />
                        <span>Back</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <header className="mx-auto w-full max-w-4xl pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">

                    {/* Title */}
                    <h1
                        className="wrap-break-word text-2x font-bold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.12] lg:text-5xl xl:text-[52px] ">
                        {post.title || "Untitled post"}
                    </h1>

                    {/* Author */}
                    <div className="mt-6 sm:mt-7">
                        <Link
                            href={`/profile/${post.user.userName}`}
                            className="flex min-w-0 items-center gap-3"
                        >
                            <div className="shrink-0">
                                <AvatarWithBadge user={post.user} />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold sm:text-[15px]">
                                    {post.user.name}
                                </p>

                                <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                                    {formattedDate} · 5 min read
                                </p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Hero Image */}
                {post.mediaUrl &&
                    post.mediaType === "image" && (
                        <div className="mx-auto w-full max-w-4xl">
                            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                                <Image
                                    src={post.mediaUrl}
                                    alt={post.title || "Post image"}
                                    width={1200}
                                    height={800}
                                    priority
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                                    className="block h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mx-auto mt-5 flex w-full max-w-4xl flex-wrap gap-2 sm:mt-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="max-w-full wrap-break-word rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="mx-auto mt-8 w-full max-w-3xl sm:mt-10 lg:mt-12">

                    <div
                        className="min-w-0 wrap-break-word text-base leading-7 text-foreground/90 sm:text-[17px] sm:leading-8 lg:text-[18px] lg:leading-[1.85] ">
                        {parse(post.content)}
                    </div>

                    {/* Author Footer */}
                    <div className="my-10 border-y py-7 sm:my-14 sm:py-8 lg:my-16">
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

                                <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
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