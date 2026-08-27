export interface DeletePostResponse {
    success: boolean;
    message: string;
}

export const deletePost = async ( postId: string ): Promise<DeletePostResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${baseUrl}/api/posts/delete/${postId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete post"
        );
    }

    return data;
};