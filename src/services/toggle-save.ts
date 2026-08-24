import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkSavedPost = async (postId: string) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const cookieStore = await cookies();

    const res = await fetch(
        `${baseUrl}/api/toggle-save/${postId}`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to check saved post");
    }

    return res.json();
};