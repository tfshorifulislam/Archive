import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URI,

    plugins: [
        inferAdditionalFields({
            user: {
                userName: {
                    type: "string",
                },
            },
        }),
    ],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;