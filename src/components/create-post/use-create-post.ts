"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/upload.media";
import { CreatePostFormData } from "../../../types/createPost";

export const useCreatePost = () => {
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // -------------------------
    // Image
    // -------------------------

    const handleCoverImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setSelectedFile(file);

        const previewUrl = URL.createObjectURL(file);
        setCoverImage(previewUrl);
    };

    const removeCoverImage = () => {
        setCoverImage(null);
        setSelectedFile(null);
    };

    // -------------------------
    // Tags
    // -------------------------

    const addTag = () => {
        const tag = tagInput
            .trim()
            .replace(/^#/, "");

        if (
            !tag ||
            tags.includes(tag) ||
            tags.length >= 5
        ) {
            return;
        }

        setTags((prev) => [
            ...prev,
            tag,
        ]);

        setTagInput("");
    };

    const removeTag = (tagToRemove: string) => {
        setTags((prev) =>
            prev.filter(
                (tag) => tag !== tagToRemove
            )
        );
    };

    // -------------------------
    // Submit
    // -------------------------

    const submitPost = async (
        data: CreatePostFormData
    ) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append(
                "title",
                data.title
            );

            formData.append(
                "content",
                data.content
            );

            formData.append(
                "tags",
                JSON.stringify(tags)
            );

            if (selectedFile) {
                formData.append(
                    "file",
                    selectedFile
                );
            }

            const result = await createPost(formData);

            console.log(
                "CREATE POST RESULT:",
                result
            );

            router.push("/");
        } catch (error) {
            console.error(
                "CREATE POST ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        coverImage,
        selectedFile,

        tags,
        tagInput,

        loading,

        setTagInput,

        handleCoverImage,
        removeCoverImage,

        addTag,
        removeTag,

        submitPost,
    };
};