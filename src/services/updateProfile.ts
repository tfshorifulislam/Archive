import { UpdateProfileData, UpdateProfileResponse } from "../../types/updateProfileData";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateProfile = async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {

    if (!baseUrl) {
        throw new Error("Backend URL is not configured");
    }

    console.log(data)
    const response = await fetch(`${baseUrl}/api/profile-update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
    }

    return result;
};