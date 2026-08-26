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
        <main className="min-h-screen w-full overflow-x-hidden bg-background max-w-2xl mx-auto">

            <div className="w-full border-b">
                <div className="mx-auto flex h-12 w-full max-w-5xl items-center px-4 sm:h-14 sm:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 shrink-0" />

                        <span>Back</span>
                    </Link>
                </div>
            </div>


            <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">


                <header className="mx-auto w-full max-w-3xl pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10">

   
                    <h1
                        className="wrap-break-word text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
                    >
                        {post.title || "Untitled post"}
                    </h1>

       
                    <div className="mt-5 sm:mt-6">
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

                                <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                                    {formattedDate} · 5 min read
                                </p>
                            </div>
                        </Link>
                    </div>
                </header>

    
                {post.mediaUrl &&
                    post.mediaType === "image" && (
                        <div className="mx-auto w-full max-w-3xl">
                            <div className="overflow-hidden rounded-lg sm:rounded-xl">
                                <Image
                                    src={post.mediaUrl}
                                    alt={
                                        post.title ||
                                        "Post image"
                                    }
                                    width={1200}
                                    height={800}
                                    priority
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
                                    className="block h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    )}

        
                {post.tags.length > 0 && (
                    <div className="mx-auto mt-4 flex w-full max-w-3xl flex-wrap gap-2 sm:mt-5">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="max-w-full wrap-break-word rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mx-auto mt-7 w-full max-w-2xl sm:mt-8 lg:mt-10">

                    <div
                        className=" min-w-0 wrap-break-word text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-7 lg:text-[17px] lg:leading-8
                        "
                    >
                        {parse(post.content)}
                    </div>

                    {/* =========================
                        Author Footer
                    ========================= */}
                    <div className="my-10 border-y py-6 sm:my-12 sm:py-7 lg:my-14">

                        <Link
                            href={`/profile/${post.user.userName}`}
                            className="flex min-w-0 items-center gap-3 sm:gap-4"
                        >
                            {/* Avatar */}
                            <div className="shrink-0">
                                <AvatarWithBadge user={post.user} />
                            </div>

                            {/* User Info */}
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