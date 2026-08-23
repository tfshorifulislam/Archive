"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AboutProps } from "../../../types/userProfileTypes";
import { updateProfile } from "@/services/updateProfile";

export function EditProfileDialog({ user }: AboutProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const formData = new FormData(e.currentTarget);

            const name = formData.get("name") as string;
            const userName = formData.get("userName") as string;

            const result = await updateProfile({
                name,
                userName,
            });

            console.log(result);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger render={<Button>Edit</Button>} />

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Edit profile
                        </DialogTitle>

                        <DialogDescription>
                            Make changes to your profile here.
                            Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="py-4">
                        {/* Name */}
                        <Field>
                            <Label htmlFor="name">
                                Name
                            </Label>

                            <Input
                                id="name"
                                name="name"
                                defaultValue={user.name}
                            />
                        </Field>

                        {/* Username */}
                        <Field>
                            <Label htmlFor="userName">
                                Username
                            </Label>

                            <Input
                                id="userName"
                                name="userName"
                                defaultValue={user.userName}
                            />
                        </Field>

                        {error && (
                            <p className="text-sm text-destructive">
                                {error}
                            </p>
                        )}
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            disabled={loading}
                            type="submit"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}