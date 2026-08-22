import { cookies } from "next/headers";
import { UserProfileResponse } from "../../types/userProfileTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserProfile = async (
    userName: string
): Promise<UserProfileResponse> => {
    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    const cookieStore = await cookies();

    const res = await fetch(
        `${baseUrl}/api/profile/${userName}`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json();
};