"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await authClient.requestPasswordReset({
      email,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Something went wrong");
      return;
    }

    setMessage(
      "If an account exists with this email, a password reset link has been sent."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border bg-background p-8 shadow-sm">

          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Forgot your password?
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              No worries. Enter your email address and we'll send you a
              link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleForgotPassword}
            className={cn("flex flex-col gap-5")}
          >
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="email">
                  Email address
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="h-11"
                />
              </Field>

              {/* Success message */}
              {message && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900 dark:bg-green-950/30">
                  <p className="text-sm leading-5 text-green-700 dark:text-green-400">
                    {message}
                  </p>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="rounded-lg border border-black-200 bg-black-50 px-4 py-3 dark:border-black-900 dark:bg-black-950/30">
                  <p className="text-sm leading-5 text-black-700 dark:text-black-400">
                    {error}
                  </p>
                </div>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full"
                >
                  {loading ? "Sending reset link..." : "Send reset link"}
                </Button>
              </Field>

            </FieldGroup>
          </form>

          {/* Back to login */}
          <div className="mt-7 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 px-4 text-center text-xs leading-5 text-muted-foreground">
          If you don't receive an email within a few minutes, check your
          spam folder.
        </p>

      </div>
    </div>
  );
}