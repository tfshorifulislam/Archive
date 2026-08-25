const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSavedPosts = async () => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const response = await fetch(`${baseUrl}/api/saved-posts`, {
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch saved posts"
        );
    }

    return data;
};