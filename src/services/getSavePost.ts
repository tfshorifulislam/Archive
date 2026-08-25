const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSavedPosts = async (userId: string) => {
    const response = await fetch(
        `${baseUrl}/api/saved-posts?userId=${userId}`,
        {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch saved posts"
        );
    }

    return data;
};