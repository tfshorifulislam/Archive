import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkSavedPost = async (postId: string) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const cookieStore = await cookies();

    const res = await fetch(
        `${baseUrl}/api/toggle-save/check/${postId}`,
        {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    // User is not logged in
    if (res.status === 401) {
        return {
            success: true,
            saved: false,
        };
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.message || "Failed to check saved post"
        );
    }

    return data;
};