import PostCard from "@/components/home/Post.Card";
import { getAllPost } from "@/services/get.All.Posts";

const HomePage = async () => {
  const allPosts = await getAllPost();

  const postsItem = allPosts.posts;
  

  return (
    <div>
      <div className="space-y-5 my-5">

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