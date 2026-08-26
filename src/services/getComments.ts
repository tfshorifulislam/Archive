import { Post } from "../../types/createPost";

interface CommentUser {
    id: string;
    name: string;
    userName: string;
    image: string | null;
}

export interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
    user: CommentUser;
}

interface GetCommentsResponse {
    success: boolean;
    message: string;
    comments: Comment[];
}

export const getComments = async (
    postId: string
): Promise<GetCommentsResponse> => {

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${baseUrl}/api/get-comment/${postId}`,
        {
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch comments"
        );
    }

    return data;
};