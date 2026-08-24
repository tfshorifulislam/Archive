import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CoverImageUploadProps {
    coverImage: string | null;

    onImageChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onImageRemove: () => void;
}

export const CoverImageUpload = ({ coverImage, onImageChange, onImageRemove, }: CoverImageUploadProps) => {
    return (
        <div className="space-y-3">

            {/* Label */}
            <div>
                <Label className="text-sm font-semibold">
                    Cover image
                </Label>

                <p className="mt-1 text-xs text-muted-foreground">
                    Add an image to make your post more attractive.
                </p>
            </div>

            {/* Preview */}
            {coverImage ? (
                <div className="group relative overflow-hidden rounded-xl border">

                    <Image
                        src={coverImage}
                        alt="Cover preview"
                        width={1200}
                        height={600}
                        unoptimized
                        className="max-h-105 w-full object-cover"
                    />

                    <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={onImageRemove}
                        className="absolute right-3 top-3 rounded-full opacity-90"
                    >
                        <X className="h-4 w-4" />
                    </Button>

                </div>
            ) : (
                <label
                    htmlFor="cover-image"
                    className="group flex min-h-45 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/20 transition hover:bg-muted/40"
                >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <ImagePlus className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <p className="text-sm font-medium">
                        Add cover image
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG, WEBP, MP4 or WEBM
                    </p>
                </label>
            )}

            {/* File Input */}
            <Input
                id="cover-image"
                type="file"
                name="file"
                accept="image/png,image/jpeg,image/webp,video/mp4,video/webm"
                onChange={onImageChange}
                className="hidden"
            />

        </div>
    );
};