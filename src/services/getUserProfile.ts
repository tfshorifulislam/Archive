import { UserProfileResponse } from "../../types/userProfileTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserProfile = async (
    userName: string
): Promise<UserProfileResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const res = await fetch(`${baseUrl}/api/profile/${userName}`, {
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json();
};