const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkSavedPost = async (
    postId: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const response = await fetch(
        `${baseUrl}/api/toggle-save/check/${postId}`,
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
            unauthorized:
                response.status === 401,
            message: data.message,
        };
    }

    return data;
};