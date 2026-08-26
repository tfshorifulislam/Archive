"use client";

import LoginForm from "@/components/Auth-Form/LoginForm";
import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative grid min-h-svh lg:grid-cols-2">


      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="absolute left-4 top-4 z-20 inline-flex h-10 items-center gap-2 rounded-full border bg-background/90 px-3 text-sm font-medium backdrop-blur transition-colors hover:bg-muted md:left-6 md:top-6"
      >
        <ArrowLeft className="size-4" />

        <span className="hidden sm:inline">
          Back
        </span>
      </button>

      <div className="flex flex-col gap-4 p-6 pt-20 md:p-10 md:pt-24">

        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>

            <span className="text-lg font-semibold">
              StoryHub.
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>


      <div className="relative hidden min-h-svh overflow-hidden bg-muted lg:block">
        <Image
          fill
          priority
          src="/placeholder2.jpg"
          alt="StoryHub"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
      </div>
    </div>
  );
}