"use client";

import { useSession } from "@/lib/auth-client";
import { useCreatePost } from "./use-create-post";
import CreatePostForm from "./create-post-form";

const CreatePostWrapper = () => {

    const { data: session } = useSession();

    const user = session?.user;

    const {
        coverImage,

        tags,
        tagInput,

        loading,

        setTagInput,

        handleCoverImage,
        removeCoverImage,

        addTag,
        removeTag,

        submitPost,
    } = useCreatePost();

    return (
        <main className="min-h-screen">

            <div className="mx-auto py-8 sm:py-12">

                {/* Page Header */}
                <div className="mb-8">

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Create a post
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Share something with your community.
                    </p>

                </div>

                {/* Form */}
                <CreatePostForm
                    user={user}

                    coverImage={coverImage}

                    tags={tags}
                    tagInput={tagInput}

                    loading={loading}

                    onImageChange={handleCoverImage}
                    onImageRemove={removeCoverImage}

                    onTagInputChange={setTagInput}

                    onAddTag={addTag}
                    onRemoveTag={removeTag}

                    onSubmit={submitPost}
                />

            </div>

        </main>
    );
};

export default CreatePostWrapper;