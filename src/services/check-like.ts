const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkLikePost = async (
    postId: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const response = await fetch(
        `${baseUrl}/api/toggle-like/check/${postId}`,
        {
            method: "GET",
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
        };
    }

    return data;
};