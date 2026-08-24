import { getPostById } from "@/services/get.post_By_Id";

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

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            <article>
                <h1 className="text-4xl font-bold tracking-tight">
                    {post.title}
                </h1>

                <p className="mt-3 text-muted-foreground">
                    @{post.user.userName}
                </p>

                <div className="mt-8">
                    <p className="whitespace-pre-wrap leading-8">
                        {post.content}
                    </p>
                </div>
            </article>
        </main>
    );
};

export default PostDetailsPage;