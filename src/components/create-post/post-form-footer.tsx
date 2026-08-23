import { Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostFormFooterProps {
    loading: boolean;
}

export const PostFormFooter = ({
    loading,
}: PostFormFooterProps) => {
    return (
        <div className="flex flex-col gap-3 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <p className="text-xs text-muted-foreground">
                Your post will be visible to everyone.
            </p>

            <div className="flex gap-2">

                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    disabled={loading}
                >
                    <Save className="h-4 w-4" />
                    Save draft
                </Button>

                <Button
                    type="submit"
                    className="gap-2"
                    disabled={loading}
                >
                    <Send className="h-4 w-4" />

                    {loading
                        ? "Publishing..."
                        : "Publish"}
                </Button>

            </div>
        </div>
    );
};