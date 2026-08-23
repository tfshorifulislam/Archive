export interface PostUser {
  id: string;
  name: string;
  userName: string;
  image: string | null;
}

export interface Post {
  id: string;
  title: string | null;
  content: string;
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: PostUser;
}

export interface CreatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export type CreatePostFormData = {
  title: string;
  content: string;
  file: FileList;
};