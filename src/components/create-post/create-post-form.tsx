"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { AuthorHeader } from "./author-header";
import { CoverImageUpload } from "./cover-image-upload";
import { TagInputSection } from "./tag-input";
import { PostFormFooter } from "./post-form-footer";

import { CreatePostFormData, PostUser } from "../../../types/createPost";

interface CreatePostFormProps {
     user: PostUser | undefined;

    coverImage: string | null;

    tags: string[];
    tagInput: string;

    loading: boolean;

    onImageChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onImageRemove: () => void;

    onTagInputChange: (
        value: string
    ) => void;

    onAddTag: () => void;

    onRemoveTag: (
        tag: string
    ) => void;

    onSubmit: (
        data: CreatePostFormData
    ) => Promise<void>;
}

const CreatePostForm = ({
    user,

    coverImage,

    tags,
    tagInput,

    loading,

    onImageChange,
    onImageRemove,

    onTagInputChange,
    onAddTag,
    onRemoveTag,

    onSubmit,
}: CreatePostFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePostFormData>();

    return (
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
                        className="
                            h-auto
                            border-0
                            bg-transparent
                            px-0
                            text-4xl
                            font-bold
                            tracking-tight
                            shadow-none
                            placeholder:text-muted-foreground/50
                            focus-visible:ring-0
                            md:text-5xl
                        "
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
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            bg-background
                            px-4
                            py-4
                            text-sm
                            leading-7
                            outline-none
                            placeholder:text-muted-foreground
                            focus:ring-1
                            focus:ring-ring
                        "
                    />

                    {errors.content && (
                        <p className="text-sm text-destructive">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Cover Image */}
                <CoverImageUpload
                    coverImage={coverImage}
                    onImageChange={onImageChange}
                    onImageRemove={onImageRemove}
                />

                {/* Tags */}
                <TagInputSection
                    tags={tags}
                    tagInput={tagInput}
                    onTagInputChange={onTagInputChange}
                    onAddTag={onAddTag}
                    onRemoveTag={onRemoveTag}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onAddTag();
                        }
                    }}
                />

            </div>

            <Separator />

            <PostFormFooter
                loading={loading}
            />

        </form>
    );
};

export default CreatePostForm;