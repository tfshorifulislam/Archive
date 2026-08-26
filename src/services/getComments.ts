export interface CommentUser {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
}

export interface CommentLike {
    id: string;
    userId: string;
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

    replies: Comment[];

    likes?: CommentLike[];

    _count?: {
        likes: number;
    };

    isLiked?: boolean;
}

export interface GetCommentsResponse {
    success: boolean;
    message: string;
    comments: Comment[];
}

export const getComments = async (
    postId: string
): Promise<GetCommentsResponse> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-comment/${postId}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to fetch comments"
        );
    }

    return data;
};