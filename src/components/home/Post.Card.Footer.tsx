"use client";

import { useState } from "react";
import {Bookmark, Heart, MessageCircle, } from "lucide-react";

import { Button } from "../ui/button";
import { toggleSavePost } from "@/services/toggle-save";
import { useRouter } from "next/navigation";

interface PostCardFooterProps {
    postId: string;
    saved: boolean;
}

const PostCardFooter = ({ postId, saved, }: PostCardFooterProps) => {
    const [isSaved, setIsSaved] = useState(saved);
    const [loading, setLoading] = useState(false);

      const router = useRouter();

    const handleSave = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const data = await toggleSavePost(postId);

             if (data.unauthorized) {
                router.push("/auth/login");
                return;
            }

            if (data.success) {
                setIsSaved(data.saved);
            }
        } catch (error) {
            console.error("Save post error:", error);
        } finally {
            setLoading(false);
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
                    className="h-9 gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
                >
                    <Heart className="h-4 w-4" />

                    <span className="text-xs sm:text-sm">
                        Like
                    </span>
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
                disabled={loading}
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