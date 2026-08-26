import { Comment } from "./getComments";

interface CreateCommentPayload {
    userId: string;
    postId: string;
    content: string;
    parentId?: string | null;
}

interface CreateCommentResponse {
    success: boolean;
    message: string;
    comment: Comment;
}

export const createComment = async (
    payload: CreateCommentPayload
): Promise<CreateCommentResponse> => {

    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(
        `${baseUrl}/api/create-comment`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(payload),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to create comment"
        );
    }

    return data;
};