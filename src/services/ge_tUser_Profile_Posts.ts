import { Post } from "../../types/createPost";

interface GetUserPostsResponse {
    success: boolean;
    message: string;
    posts: Post[];
}

export const getUserPosts = async (
    userName: string
): Promise<GetUserPostsResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(
        `${baseUrl}/api/user/${userName}`,
        {
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch user posts"
        );
    }

    return data;
};