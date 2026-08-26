import PostCard from "@/components/home/Post.Card";
import { getAllPost } from "@/services/get.All.Posts";

const HomePage = async () => {
    const allPosts = await getAllPost();
    const postsItem = allPosts.posts;

    return (
        <main className="mx-auto min-h-screen w-full max-w-2xl bg-background">

            {/* Feed Header */}
            <header className="border-b bg-background">
                <div className="flex min-h-14 items-center px-4 sm:min-h-16 sm:px-6">
                    <div>
                        <h1 className="text-base font-semibold tracking-tight sm:text-lg">
                            Home
                        </h1>

                        <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                            Latest stories from the community
                        </p>
                    </div>
                </div>
            </header>

            {/* Feed */}
            <section className="w-full ">
                {postsItem.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </section>

        </main>
    );
};

export default HomePage;