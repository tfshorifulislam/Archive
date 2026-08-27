"use client";

import { FormEvent, useEffect, useState } from "react";
import {
    X,
    Send,
    Loader2,
    MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import {
    getComments,
    Comment,
} from "@/services/getComments";
import { createComment } from "@/services/createComment";
import CommentItem from "./CommentItem";

interface CommentModalProps {
    postId: string;
    open: boolean;
    onClose: () => void;
}

const CommentModal = ({
    postId,
    open,
    onClose,
}: CommentModalProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    const userId = session?.user?.id;

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<{
        id: string;
        userName: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open || !postId) return;

        const loadComments = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getComments(postId);

                if (data.success) {
                    setComments(data.comments ?? []);
                } else {
                    setError(
                        data.message ?? "Failed to load comments"
                    );
                }
            } catch (error) {
                console.error("Load comments error:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load comments"
                );
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [open, postId]);

    const handleClose = () => {
        if (submitting) return;

        setCommentText("");
        setReplyTo(null);
        setError(null);

        onClose();
    };

    const handleReply = (
        commentId: string,
        userName: string
    ) => {
        if (!userId) {
            router.push("/auth/login");
            return;
        }

        setReplyTo({
            id: commentId,
            userName,
        });

        setCommentText(`@${userName} `);
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setCommentText("");
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (submitting) return;

        if (!userId) {
            router.push("/auth/login");
            return;
        }

        const content = commentText.trim();

        if (!content) return;

        try {
            setSubmitting(true);
            setError(null);

            const data = await createComment({
                userId,
                postId,
                content,
                parentId: replyTo?.id ?? null,
            });

            if (!data.success) {
                setError(
                    data.message ?? "Failed to create comment"
                );
                return;
            }

            const newComment: Comment = {
                ...data.comment,
                replies: [],
            };

            if (replyTo) {
                setComments((prev) =>
                    addReplyToComment(
                        prev,
                        replyTo.id,
                        newComment
                    )
                );
            } else {
                setComments((prev) => [
                    ...prev,
                    newComment,
                ]);
            }

            setCommentText("");
            setReplyTo(null);
        } catch (error) {
            console.error("Create comment error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create comment"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close comments"
                onClick={handleClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            />

            <div className="absolute inset-x-0 bottom-0 mx-auto flex h-[85vh] w-full max-w-2xl min-w-0 flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:bottom-1/2 sm:translate-y-1/2 sm:rounded-3xl">
                <div className="flex shrink-0 items-center justify-between border-b px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />

                        <h2 className="text-base font-semibold">
                            Comments
                        </h2>

                        {comments.length > 0 && (
                            <span className="text-sm text-muted-foreground">
                                {comments.length}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-5 sm:px-5">
                    {loading && comments.length === 0 && (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                            <p className="max-w-sm break-words text-sm text-destructive">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
                                className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        comments.length === 0 && (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <MessageCircle className="mb-3 h-10 w-10 text-muted-foreground" />

                                <p className="font-medium">
                                    No comments yet
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Be the first to comment.
                                </p>
                            </div>
                        )}

                    {!error && comments.length > 0 && (
                        <div className="w-full min-w-0 space-y-6">
                            {loading && (
                                <div className="flex justify-center">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}

                            {comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    currentUserId={userId}
                                    onReply={handleReply}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {replyTo && (
                    <div className="flex shrink-0 items-center justify-between border-t bg-muted/40 px-4 py-2 sm:px-5">
                        <p className="min-w-0 truncate text-xs text-muted-foreground">
                            Replying to{" "}
                            <span className="font-semibold text-foreground">
                                @{replyTo.userName}
                            </span>
                        </p>

                        <button
                            type="button"
                            onClick={handleCancelReply}
                            className="ml-3 shrink-0 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="shrink-0 border-t bg-background p-3 sm:p-4"
                >
                    <div className="flex min-w-0 items-end gap-2 sm:gap-3">
                        <div className="hidden shrink-0 sm:block">
                            {session?.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name ?? "User"}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                    {session?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-2xl border bg-muted/30 px-4">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(event) =>
                                    setCommentText(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    replyTo
                                        ? `Reply to @${replyTo.userName}...`
                                        : "Add a comment..."
                                }
                                disabled={submitting}
                                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                !commentText.trim()
                            }
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const addReplyToComment = (
    comments: Comment[],
    parentId: string,
    newReply: Comment
): Comment[] => {
    return comments.map((comment) => {
        if (comment.id === parentId) {
            return {
                ...comment,
                replies: [
                    ...(comment.replies ?? []),
                    newReply,
                ],
            };
        }

        if (comment.replies?.length) {
            return {
                ...comment,
                replies: addReplyToComment(
                    comment.replies,
                    parentId,
                    newReply
                ),
            };
        }

        return comment;
    });
};

export default CommentModal;