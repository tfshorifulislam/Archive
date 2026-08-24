const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const toggleSavePost = async (postId: string) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(
        `${baseUrl}/api/toggle-save/${postId}`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (res.status === 401) {
        return {
            success: false,
            unauthorized: true,
        };
    }

    if (!res.ok) {
        throw new Error(
            data.message || "Failed to toggle saved post"
        );
    }

    return data;
};