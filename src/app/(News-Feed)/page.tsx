import HeaderHome from "@/components/home/header.home";
import { getAllPost } from "@/services/get.All.Posts";

const HomePage = async () => {

  const allPosts = await getAllPost()
  console.log(allPosts?.posts)
  const postsItem = allPosts?.posts;

  return (
    <div>
      <HeaderHome />
    </div>
  );
};

export default HomePage;