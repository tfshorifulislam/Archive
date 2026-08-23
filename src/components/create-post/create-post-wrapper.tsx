"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { AuthorHeader } from "@/components/create-post/author-header";
import { CoverImageUpload } from "@/components/create-post/cover-image-upload";
import { TagInputSection } from "@/components/create-post/tag-input";
import { PostFormFooter } from "@/components/create-post/post-form-footer";

import { useSession } from "@/lib/auth-client";
import { createPost } from "@/services/upload.media";
import { useRouter } from "next/navigation";

type CreatePostFormData = {
    title: string;
    content: string;
    file: FileList;
};

const CreatePostWrapper = () => {
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePostFormData>();

    const onSubmit = async (data: CreatePostFormData) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("content", data.content);

            formData.append("tags",JSON.stringify(tags));

            if (data.file?.[0]) {
                formData.append(
                    "file",
                    data.file[0]
                );
            }

            const result = await createPost(formData);
            console.log(result);
            router.push('/')

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCoverImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setCoverImage(
            URL.createObjectURL(file)
        );
    };

    const removeCoverImage = () => {
        setCoverImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

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

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Create a post
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Share something with your community.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="overflow-hidden rounded-2xl border bg-background shadow-sm"
                >
                    <AuthorHeader user={user} />

                    <Separator />

                    <div className="space-y-7 p-5 sm:p-6">

                        {/* Title */}
                        <div>
                            <Input
                                {...register("title", {
                                    required: "Title is required",
                                })}
                                placeholder="Title"
                                className="h-auto border-0 bg-transparent px-0 text-4xl font-bold tracking-tight shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0 md:text-5xl"
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="content"
                                className="text-sm font-semibold"
                            >
                                Content
                            </Label>

                            <textarea
                                id="content"
                                {...register("content", {
                                    required: "Content is required",
                                })}
                                rows={5}
                                placeholder="Write your story, idea or thoughts..."
                                className="w-full resize-none rounded-xl border bg-background px-4 py-4 text-sm leading-7 outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                            />

                            {errors.content && (
                                <p className="text-sm text-destructive">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

                        {/* Media */}
                        <CoverImageUpload
                            coverImage={coverImage}
                            onImageChange={handleCoverImage}
                            onImageRemove={removeCoverImage}
                            fileInputRef={fileInputRef}
                            register={register}
                        />

                        {/* Tags */}
                        <TagInputSection
                            tags={tags}
                            tagInput={tagInput}
                            onTagInputChange={setTagInput}
                            onAddTag={addTag}
                            onRemoveTag={removeTag}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag();
                                }
                            }}
                        />
                    </div>

                    <Separator />

                    <PostFormFooter loading={loading} />
                </form>
            </div>
        </main>
    );
};

export default CreatePostWrapper;