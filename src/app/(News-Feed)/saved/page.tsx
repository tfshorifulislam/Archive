"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getSavedPosts } from "@/services/getSavePost";
import SavedPosts from "@/components/home/SavedPosts";
import { SavedPost } from "../../../../types/createPost";
import Loading from "@/app/(News-Feed)/loading";

export default function SavedPage() {
    const {
        data: session,
        isPending,
    } = useSession();

    const [savedPosts, setSavedPosts] =
        useState<SavedPost[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (!session?.user?.id) {
            return;
        }

        let cancelled = false;

        const fetchSavedPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getSavedPosts(session?.user?.id);

                if (cancelled) {
                    return;
                }

                setSavedPosts(
                    data.savedPosts ?? []
                );
            } catch (error) {
                console.error(
                    "GET SAVED POSTS ERROR:",
                    error
                );

                if (!cancelled) {
                    setError(
                        "Failed to load saved posts"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchSavedPosts();

        return () => {
            cancelled = true;
        };
    }, [
        session?.user?.id,
        isPending,
    ]);

    if (isPending) {
        return (
            <Loading/>
        );
    }

    if (!session?.user?.id) {
        return (
            <main className="mx-auto min-h-screen w-full p-6 ">
                <div className="text-center">
                    Please login to view your saved posts.
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="mx-auto min-h-screen w-full p-6">
                Loading saved posts...
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto min-h-screen w-full p-6">
                <div className="text-center text-destructive">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-2xl">
            <SavedPosts
                allSavePost={savedPosts}
            />
        </main>
    );
}