"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Dialog,
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
import { useRouter } from "next/navigation";
import { checkUsername } from "@/services/checkUsername";


type FormData = {
    name: string;
    userName: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function EditProfileDialog({ user }: AboutProps) {
    const [loading, setLoading] = useState(false);
    const [userNameMessage, setUserNameMessage] = useState("");
    const [userNameAvailable, setUserNameAvailable] = useState(true);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: user.name,
            userName: user.userName,
        },
    });

    const userName = watch("userName");

    useEffect(() => {

        if (userName === user.userName) {
            setUserNameMessage("");
            setUserNameAvailable(true);
            return;
        }

        if (!userName || userName.length < 3) {
            setUserNameMessage("");
            setUserNameAvailable(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                
                const data = await checkUsername(userName);

                setUserNameMessage(data.message);
                setUserNameAvailable(data.available);
            } catch (error) {
                console.error(error);

                setUserNameMessage("Unable to check username");
                setUserNameAvailable(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [userName, user.userName]);

  const onSubmit = async (data: FormData) => {
    if (!userNameAvailable) {
        return;
    }

    try {
        setLoading(true);

        await updateProfile(data);

        router.replace(`/profile/${data.userName}`);
        router.refresh();

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    return (
        <Dialog>
            <DialogTrigger render={<Button>Edit</Button>} />

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>

                        <DialogDescription>
                            Update your name and username.
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
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </Field>

                        {/* Username */}
                        <Field>
                            <Label htmlFor="userName">
                                Username
                            </Label>

                            <Input
                                id="userName"
                                {...register("userName", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Username must be at least 3 characters",
                                    },
                                })}
                            />

                            {errors.userName && (
                                <p className="text-sm text-destructive">
                                    {errors.userName.message}
                                </p>
                            )}

                            {!errors.userName && userNameMessage && (
                                <p
                                    className={`text-sm ${userNameAvailable
                                        ? "text-green-600"
                                        : "text-destructive"
                                        }`}
                                >
                                    {userNameMessage}
                                </p>
                            )}
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => { }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                (!userNameAvailable &&
                                    userName !== user.userName)
                            }
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