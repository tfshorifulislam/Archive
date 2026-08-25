"use client";

import { useEffect, useState } from "react";
import {
    Bookmark,
    Heart,
    MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { checkSavedPost } from "@/services/check-save-post";
import { toggleSavePost } from "@/services/toggle-save";

import { checkLikePost } from "@/services/check-like";
import { toggleLikePost } from "@/services/toggle-like";

interface PostCardFooterProps {
    postId: string;
}

const PostCardFooter = ({
    postId,
}: PostCardFooterProps) => {
    const router = useRouter();

    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [likeCount, setLikeCount] = useState(0);

    const [saveLoading, setSaveLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        const loadStatus = async () => {
            try {
                const [saveData, likeData] =
                    await Promise.all([
                        checkSavedPost(postId),
                        checkLikePost(postId),
                    ]);

                if (saveData.success) {
                    setIsSaved(saveData.saved);
                }

                if (likeData.success) {
                    setIsLiked(likeData.liked);
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
    }, [postId]);

    const handleLike = async () => {
        if (likeLoading) return;

        try {
            setLikeLoading(true);

            const data =
                await toggleLikePost(postId);

            if (data.unauthorized) {
                router.push("/auth/login");
                return;
            }

            if (data.success) {
                setIsLiked(data.liked);
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

    const handleSave = async () => {
        if (saveLoading) return;

        try {
            setSaveLoading(true);

            const data =
                await toggleSavePost(postId);

            if (data.unauthorized) {
                router.push("/auth/login");
                return;
            }

            if (data.success) {
                setIsSaved(data.saved);
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

    return (
        <div className="mt-7 flex items-center justify-between">

            <div className="flex items-center gap-1">

                {/* Like */}

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    disabled={likeLoading}
                    className="h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${
                            isLiked
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

                {/* Comment */}

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
                >
                    <MessageCircle className="h-4 w-4" />

                    <span className="text-xs sm:text-sm">
                        Comment
                    </span>
                </Button>

            </div>

            {/* Save */}

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSave}
                disabled={saveLoading}
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            >
                <Bookmark
                    className={`h-4 w-4 transition-colors ${
                        isSaved
                            ? "fill-current text-primary"
                            : ""
                    }`}
                />
            </Button>

        </div>
    );
};

export default PostCardFooter;