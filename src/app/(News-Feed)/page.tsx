import PostCard from "@/components/home/Post.Card";
import { getAllPost } from "@/services/get.All.Posts";

const HomePage = async () => {
  const allPosts = await getAllPost();

  const postsItem = allPosts.posts;


  return (
    <div>

      <div className="space-y-5 my-5">

       
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your Feed
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Discover stories, ideas, and posts from the community.
          </p>
        </div>


        {postsItem.map((post) => (
          <div key={post.id}>
            <PostCard
              post={post} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default HomePage;