const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;

export const searchPosts = async (
    search: string
) => {
    if (!baseUrl) {
        throw new Error(
            "Backend URL is not configured"
        );
    }

    const response = await fetch(
        `${baseUrl}/api/posts/search?search=${encodeURIComponent(
            search
        )}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to search posts"
        );
    }

    return data;
};