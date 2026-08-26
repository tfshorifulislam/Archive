interface CommentUser {
    id: string;
    name: string;
    userName: string;
    image: string | null;
}

export interface NestedComment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
    user: CommentUser;
    replies: NestedComment[];
}

interface GetNestedCommentsResponse {
    success: boolean;
    message: string;
    comments: NestedComment[];
}

export const getNestedComments = async (
    postId: string
): Promise<GetNestedCommentsResponse> => {

    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(
        `${baseUrl}/api/get-nested-comment/${postId}`,
        {
            credentials: "include",
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch nested comments"
        );
    }

    return data;
};