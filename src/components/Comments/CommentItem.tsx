"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Reply } from "lucide-react";

import type { Comment } from "@/services/getComments";

interface CommentItemProps {
    comment: Comment;
    currentUserId?: string;
    onReply: (commentId: string, userName: string) => void;
}

const REPLIES_PER_PAGE = 4;

const CommentItem = ({
    comment,
    currentUserId,
    onReply,
}: CommentItemProps) => {
    const [showReplies, setShowReplies] = useState(false);
    const [visibleReplies, setVisibleReplies] = useState(REPLIES_PER_PAGE);

    const replies = comment.replies ?? [];
    const hasReplies = replies.length > 0;

    const displayedReplies = replies.slice(0, visibleReplies);
    const remainingReplies = replies.length - visibleReplies;
    const hasMoreReplies = remainingReplies > 0;
    const hasExpandedMore = visibleReplies > REPLIES_PER_PAGE;

    const handleOpenReplies = () => {
        setShowReplies(true);
        setVisibleReplies(REPLIES_PER_PAGE);
    };

    const handleViewMore = () => {
        setVisibleReplies((prev) =>
            Math.min(prev + REPLIES_PER_PAGE, replies.length)
        );
    };

    const handleShowLess = () => {
        setVisibleReplies(REPLIES_PER_PAGE);
    };

    const handleHideReplies = () => {
        setShowReplies(false);
        setVisibleReplies(REPLIES_PER_PAGE);
    };

    return (
        <div className="w-full min-w-0">
            <div className="flex w-full min-w-0 gap-3">
                <div className="relative z-10 shrink-0">
                    {comment.user?.image ? (
                        <img
                            src={comment.user.image}
                            alt={comment.user.name ?? "User"}
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                        />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-2 ring-background">
                            {comment.user?.name?.charAt(0).toUpperCase() ?? "U"}
                        </div>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="inline-block max-w-[calc(100%-4px)] rounded-2xl bg-muted/60 px-4 py-2.5">
                        <p className="break-words text-sm font-semibold">
                            {comment.user?.name ?? "User"}
                        </p>

                        <p className="mt-0.5 break-words whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {comment.content}
                        </p>
                    </div>

                    <div className="mt-1.5 flex items-center gap-4 px-2">
                        <button
                            type="button"
                            onClick={() =>
                                onReply(
                                    comment.id,
                                    comment.user?.userName ??
                                        comment.user?.name ??
                                        "user"
                                )
                            }
                            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Reply className="h-3.5 w-3.5" />
                            <span>Reply</span>
                        </button>

                        {currentUserId === comment.userId && (
                            <span className="text-xs text-muted-foreground">
                                You
                            </span>
                        )}
                    </div>

                    {hasReplies && (
                        <div className="mt-2.5">
                            {!showReplies && (
                                <button
                                    type="button"
                                    onClick={handleOpenReplies}
                                    className="ml-1 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <ChevronDown className="h-3.5 w-3.5" />
                                    <span>
                                        View {replies.length}{" "}
                                        {replies.length === 1
                                            ? "reply"
                                            : "replies"}
                                    </span>
                                </button>
                            )}

                            {showReplies && (
                                <div className="relative mt-3 ml-1 pl-4 sm:ml-2 sm:pl-5">
                                    <div className="absolute bottom-0 left-0 top-0 w-px bg-border" />

                                    <div className="space-y-4">
                                        {displayedReplies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="relative min-w-0"
                                            >
                                                <div className="absolute -left-4 top-4 h-px w-3 bg-border sm:-left-5 sm:w-4" />

                                                <CommentItem
                                                    comment={reply}
                                                    currentUserId={currentUserId}
                                                    onReply={onReply}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                        {hasMoreReplies && (
                                            <button
                                                type="button"
                                                onClick={handleViewMore}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <ChevronDown className="h-3.5 w-3.5" />
                                                <span>
                                                    View{" "}
                                                    {Math.min(
                                                        REPLIES_PER_PAGE,
                                                        remainingReplies
                                                    )}{" "}
                                                    more{" "}
                                                    {remainingReplies === 1
                                                        ? "reply"
                                                        : "replies"}
                                                </span>
                                            </button>
                                        )}

                                        {hasExpandedMore && !hasMoreReplies && (
                                            <button
                                                type="button"
                                                onClick={handleShowLess}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <ChevronUp className="h-3.5 w-3.5" />
                                                <span>Show less</span>
                                            </button>
                                        )}

                                        {!hasMoreReplies && (
                                            <button
                                                type="button"
                                                onClick={handleHideReplies}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <ChevronUp className="h-3.5 w-3.5" />
                                                <span>Hide replies</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;