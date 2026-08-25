import { cookies } from "next/headers";
import { GetSavedPostsResponse } from "../../types/createPost";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSavedPosts = async (): Promise<GetSavedPostsResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const cookieStore = await cookies();

    const response = await fetch(`${baseUrl}/api/saved-posts`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    const data: GetSavedPostsResponse = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch saved posts"
        );
    }

    return data;
};