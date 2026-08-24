"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value?: string;
    onChange: (value: string) => void;
    error?: string;
}

const RichTextEditor = ({
    value = "",
    onChange,
    error,
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },

        editorProps: {
            attributes: {
                class:
                    "min-h-[400px] w-full p-5 outline-none text-[17px] leading-8 " +
                    "[&_p]:my-3 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-7 " +
                    "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-7 " +
                    "[&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:pl-5",
            },
        },
    });

    if (!editor) return null;

    const preventBlur = (e: React.MouseEvent) => e.preventDefault();

    return (
        <div className="overflow-hidden rounded-xl border bg-background">

            <div className="flex gap-1 border-b bg-muted/30 p-2">

                <Button
                    type="button"
                    size="icon"
                    variant={editor.isActive("bold") ? "secondary" : "ghost"}
                    onMouseDown={preventBlur}
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    <Bold className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant={editor.isActive("italic") ? "secondary" : "ghost"}
                    onMouseDown={preventBlur}
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onMouseDown={preventBlur}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onMouseDown={preventBlur}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onMouseDown={preventBlur}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote className="h-4 w-4" />
                </Button>

            </div>

            <EditorContent editor={editor} />

            {error && (
                <p className="px-5 pb-3 text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
};

export default RichTextEditor;