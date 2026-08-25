const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;

export const toggleLikePost = async (
    postId: string,
    userId: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const response = await fetch(
        `${baseUrl}/api/toggle-like/${postId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                userId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return {
            success: false,
            liked: false,
            likeCount: 0,
            unauthorized:
                response.status === 401,
            message: data.message,
        };
    }

    return data;
};