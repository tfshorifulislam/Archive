const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllPost = async () => {

    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(`${baseUrl}/api/posts`, {
        cache: "no-cache"
    })

    const data = await res.json();
    return data;
}