import { Post } from "../../types/createPost";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface GetPostResponse {
    success: boolean;
    message: string;
    post: Post;
}

export const getPostById = async (id: string): Promise<GetPostResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const response = await fetch(`${baseUrl}/api/posts/${id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch post"
        );
    }

    return data;
};