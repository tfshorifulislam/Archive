const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkLikePost = async (
    postId: string,
    userId?: string
) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const url = `${baseUrl}/api/toggle-like/check/${postId}`;

    const response = await fetch(
        userId ? `${url}?userId=${userId}` : url,
        {
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return {
            success: false,
            liked: false,
            likeCount: 0,
            message: data.message,
        };
    }

    return data;
};