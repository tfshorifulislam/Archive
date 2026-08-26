interface CreateCommentResponse {
    success: boolean;
    message: string;
    comment: {
        id: string;
        content: string;
        userId: string;
        postId: string;
        parentId: string | null;
        createdAt: string;
        updatedAt: string;

        user: {
            id: string;
            name: string | null;
            userName: string | null;
            image: string | null;
        };
    };
}

export const createComment = async ({
    userId,
    postId,
    content,
    parentId,
}: {
    userId: string;
    postId: string;
    content: string;
    parentId?: string | null;
}): Promise<CreateCommentResponse> => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-comment`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                userId,
                postId,
                content,
                parentId: parentId || null,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create comment"
        );
    }

    return data;
};