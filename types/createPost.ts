export interface PostUser {
    id: string;
    name: string;
    userName: string;
    image?: string | null;
}

export interface Post {
    id: string;
    title: string | null;
    content: string;
    mediaUrl: string | null;
    mediaType: "image" | "video" | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: PostUser;
}

export interface SavedPost {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    post: Post;
}

export interface CreatePostResponse {
    success: boolean;
    message: string;
    post: Post;
}

export interface GetAllPostsResponse {
    success: boolean;
    message: string;
    posts: Post[];
}

export interface GetSavedPostsResponse {
    success: boolean;
    savedPosts: SavedPost[];
    message: string;
}

export type CreatePostFormData = {
    title: string;
    content: string;
};