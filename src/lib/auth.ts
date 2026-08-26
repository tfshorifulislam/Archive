import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: process.env.FRONTEND_URL,

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      userName: {
        type: "string",
        required: true,
        input: true,
        returned: true,
      },
    },
  },

  trustedOrigins: [
    process.env.FRONTEND_URL!,
  ],
});