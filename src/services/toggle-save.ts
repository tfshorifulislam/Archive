const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const toggleSavePost = async (
    postId: string,
    userId: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const response = await fetch(
        `${baseUrl}/api/toggle-save/${postId}`,
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
            saved: false,
            unauthorized:
                response.status === 401,
            message: data.message,
        };
    }

    return data;
};