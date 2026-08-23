import { CreatePostResponse } from "../../types/createPost";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPost = async (
    formData: FormData
): Promise<CreatePostResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const response = await fetch(
        `${baseUrl}/api/create/posts`,
        {
            method: "POST",
            credentials: "include",
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to create post"
        );
    }

    return result;
};