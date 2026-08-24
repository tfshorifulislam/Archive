const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkSavedPost = async (postId: string) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(
        `${baseUrl}/api/toggle-save/check/${postId}`,
        {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            saved: false,
            unauthorized: res.status === 401,
        };
    }

    return data;
};