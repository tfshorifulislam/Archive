"use client";

import { Controller, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { AuthorHeader } from "./author-header";
import { CoverImageUpload } from "./cover-image-upload";
import { TagInputSection } from "./tag-input";
import { PostFormFooter } from "./post-form-footer";
import RichTextEditor from "./rich-text-editor";

import {
    CreatePostFormData,
    PostUser,
} from "../../../types/createPost";
import { Textarea } from "../ui/textarea";

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

    onTagInputChange: (value: string) => void;

    onAddTag: () => void;

    onRemoveTag: (tag: string) => void;

    onSubmit: (
        data: CreatePostFormData
    ) => Promise<void>;
}

const CreatePostForm = ({ user, coverImage, tags, tagInput, loading, onImageChange, onImageRemove, onTagInputChange, onAddTag, onRemoveTag, onSubmit, }: CreatePostFormProps) => {

    const { register, handleSubmit, control, formState: { errors }, } = useForm<CreatePostFormData>();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-2xl border bg-background "
        >
            <AuthorHeader user={user} />

            <Separator />

            <div className="space-y-7 p-5 sm:p-6">

                <div>
                    <Textarea
                        {...register("title", {
                            required: "Title is required",
                        })}
                        placeholder="Title"
                        rows={1}
                        onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = `${textarea.scrollHeight}px`;
                        }}
                        className="w-full resize-none overflow-hidden border-0 px-0 text-4xl font-bold leading-tight shadow-none focus-visible:ring-0 md:text-3xl"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-destructive">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                        Content
                    </Label>

                    <Controller
                        name="content"
                        control={control}
                        rules={{
                            validate: (value) => {
                                const text = value
                                    .replace(/<[^>]*>/g, "")
                                    .trim();

                                return text.length > 0
                                    ? true
                                    : "Content is required";
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <RichTextEditor
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
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

            <PostFormFooter loading={loading} />
        </form>
    );
};

export default CreatePostForm;