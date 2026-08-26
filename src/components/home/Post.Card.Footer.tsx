"use client";

import { useEffect, useState } from "react";
import {
    Bookmark,
    Heart,
    MessageCircle,
} from "lucide-react";

import { Button } from "../ui/button";

import { checkSavedPost } from "@/services/check-save-post";
import { toggleSavePost } from "@/services/toggle-save";

import { checkLikePost } from "@/services/check-like";
import { toggleLikePost } from "@/services/toggle-like";

import CommentModal from "../Comments/CommentModal";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface PostCardFooterProps {
    postId: string;
}

const PostCardFooter = ({
    postId,
}: PostCardFooterProps) => {

    const { data: session } = useSession();

    const userId = session?.user?.id;

    const router = useRouter();

    const [isSaved, setIsSaved] =
        useState(false);

    const [isLiked, setIsLiked] =
        useState(false);

    const [commentOpen, setCommentOpen] =
        useState(false);

    const [likeCount, setLikeCount] =
        useState(0);

    const [saveLoading, setSaveLoading] =
        useState(false);

    const [likeLoading, setLikeLoading] =
        useState(false);


    // ============================================
    // LOAD LIKE + SAVE STATUS
    // ============================================

    useEffect(() => {

        const loadStatus = async () => {

            try {

                const [
                    saveData,
                    likeData,
                ] = await Promise.all([
                    checkSavedPost(
                        postId,
                        userId
                    ),
                    checkLikePost(
                        postId,
                        userId
                    ),
                ]);


                if (saveData.success) {

                    setIsSaved(
                        saveData.saved
                    );

                }


                if (likeData.success) {

                    setIsLiked(
                        likeData.liked
                    );

                    setLikeCount(
                        likeData.likeCount ?? 0
                    );

                }

            } catch (error) {

                console.error(
                    "Load post status error:",
                    error
                );

            }

        };

        loadStatus();

    }, [postId, userId]);


    // ============================================
    // LIKE
    // ============================================

    const handleLike = async () => {

        if (likeLoading) return;


        if (!userId) {

            router.push(
                "/auth/login"
            );

            return;

        }


        try {

            setLikeLoading(true);

            const data =
                await toggleLikePost(
                    postId,
                    userId
                );


            if (data.success) {

                setIsLiked(
                    data.liked
                );

                setLikeCount(
                    data.likeCount ?? 0
                );

            }

        } catch (error) {

            console.error(
                "Like post error:",
                error
            );

        } finally {

            setLikeLoading(false);

        }

    };


    // ============================================
    // SAVE
    // ============================================

    const handleSave = async () => {

        if (saveLoading) return;


        if (!userId) {

            router.push(
                "/auth/login"
            );

            return;

        }


        try {

            setSaveLoading(true);

            const data =
                await toggleSavePost(
                    postId,
                    userId
                );


            if (data.success) {

                setIsSaved(
                    data.saved
                );

            }

        } catch (error) {

            console.error(
                "Save post error:",
                error
            );

        } finally {

            setSaveLoading(false);

        }

    };


    // ============================================
    // UI
    // ============================================

    return (
        <>
            <div className="mt-7 flex items-center justify-between">

                <div className="flex items-center gap-1">

                    {/* ================================= */}
                    {/* LIKE */}
                    {/* ================================= */}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        disabled={likeLoading}
                        className="h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
                    >

                        <Heart
                            className={`h-4 w-4 transition-colors ${isLiked
                                    ? "fill-current text-red-500"
                                    : ""
                                }`}
                        />

                        <span className="text-xs sm:text-sm">
                            Like
                        </span>

                        {likeCount > 0 && (
                            <span className="text-xs">
                                {likeCount}
                            </span>
                        )}

                    </Button>


                    {/* ================================= */}
                    {/* COMMENT */}
                    {/* ================================= */}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            setCommentOpen(true)
                        }
                        className="h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
                    >
                        <MessageCircle className="h-4 w-4" />

                        <span className="text-xs sm:text-sm">
                            Comment
                        </span>
                    </Button>

                </div>


                {/* ================================= */}
                {/* SAVE */}
                {/* ================================= */}

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
                    disabled={saveLoading}
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >

                    <Bookmark
                        className={`h-4 w-4 transition-colors ${isSaved
                                ? "fill-current text-primary"
                                : ""
                            }`}
                    />

                </Button>

            </div>


            {/* ===================================== */}
            {/* COMMENT MODAL */}
            {/* ===================================== */}

            <CommentModal
                postId={postId}
                open={commentOpen}
                onClose={() =>
                    setCommentOpen(false)
                }
            />

        </>
    );
};

export default PostCardFooter;