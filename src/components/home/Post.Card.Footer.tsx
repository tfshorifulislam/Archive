"use client";

import { useEffect, useState } from "react";
import {
    Bookmark,
    Heart,
    MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import { Button } from "../ui/button";
import { checkSavedPost } from "@/services/check-save-post";
import { toggleSavePost } from "@/services/toggle-save";

interface PostCardFooterProps {
    postId: string;
}

const PostCardFooter = ({
    postId,
}: PostCardFooterProps) => {
    const router = useRouter();

    const {
        data: session,
        isPending,
    } = useSession();

    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isPending) {
            return;
        }

        const checkSaveStatus = async () => {
            try {
                const data = await checkSavedPost(
                    postId,
                    session?.user?.id
                );

                if (data.success) {
                    setIsSaved(data.saved);
                }
            } catch (error) {
                console.error(
                    "Check save status error:",
                    error
                );
            }
        };

        checkSaveStatus();
    }, [
        postId,
        session?.user?.id,
        isPending,
    ]);

    const handleSave = async () => {
        if (loading) {
            return;
        }

        if (!session?.user?.id) {
            router.push("/auth/login");
            return;
        }

        try {
            setLoading(true);

            const data = await toggleSavePost(
                postId,
                session.user.id
            );

            if (!data.success) {
                console.error(data.message);
                return;
            }

            setIsSaved(data.saved);
        } catch (error) {
            console.error(
                "SAVE POST ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-1">
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

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSave}
                disabled={
                    loading || isPending
                }
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