const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkSavedPost = async (
    postId: string,
    userId?: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const url = new URL(
        `${baseUrl}/api/toggle-save/check/${postId}`
    );

    if (userId) {
        url.searchParams.set(
            "userId",
            userId
        );
    }

    const response = await fetch(
        url.toString(),
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
            saved: false,
            message: data.message,
        };
    }

    return data;
};