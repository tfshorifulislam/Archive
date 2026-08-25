import { UpdateProfileData } from "../../types/updateProfileData";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateProfile = async (data: UpdateProfileData) => {
    const response = await fetch(
        `${baseUrl}/api/profile-update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to update profile"
        );
    }

    return result;
};