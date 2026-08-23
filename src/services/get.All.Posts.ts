import { GetAllPostsResponse } from "../../types/createPost";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllPost = async (): Promise<GetAllPostsResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(`${baseUrl}/api/posts`, {
        cache: "no-store",
    });

    const data: GetAllPostsResponse = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts");
    }

    return data;
};