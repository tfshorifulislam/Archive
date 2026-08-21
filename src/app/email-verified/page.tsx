"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const EmailVerify = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Email Verified Successfully!
        </h1>

        <p className="mt-3 text-muted-foreground leading-6">
          Your email address has been successfully verified. Your account is
          now ready to use.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Go to Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
};

export default EmailVerify;