const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkUsername = async (userName: string) => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(
        `${baseUrl}/api/user/check-ussername?userName=${encodeURIComponent(userName)}`
    );

    if (!res.ok) {
        throw new Error("Failed to check username");
    }

    return res.json();
};