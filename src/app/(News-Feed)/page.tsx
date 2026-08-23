import HeaderHome from "@/components/home/header.home";
import PostCard from "@/components/home/Post.Card";
import { getAllPost } from "@/services/get.All.Posts";

const HomePage = async () => {
  const allPosts = await getAllPost();

  const postsItem = allPosts.posts;

  return (
    <div>
      <HeaderHome />

      <div>
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