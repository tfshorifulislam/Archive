import { Hash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagInputProps {
    tags: string[];
    tagInput: string;
    onTagInputChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (tag: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TagInputSection = ({
    tags,
    tagInput,
    onTagInputChange,
    onAddTag,
    onRemoveTag,
    onKeyDown,
}: TagInputProps) => {
    return (
        <div className="space-y-3">
            <div>
                <Label className="text-sm font-semibold">Tags</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                    Add up to 5 tags to help people discover your post.
                </p>
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={tagInput}
                        onChange={(e) => onTagInputChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="e.g. nextjs"
                        className="h-10 pl-9"
                    />
                </div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onAddTag}
                    disabled={!tagInput.trim() || tags.length >= 5}
                >
                    Add
                </Button>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                        >
                            <Hash className="h-3 w-3" />
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => onRemoveTag(tag)}
                                className="ml-1 rounded-full p-0.5 transition hover:bg-primary/10"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <p className="text-right text-xs text-muted-foreground">{tags.length}/5 tags</p>
        </div>
    );
};