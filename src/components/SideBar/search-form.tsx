"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";

export function SearchForm(
  props: React.ComponentProps<"form">
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(currentSearch);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      router.push("/");
      return;
    }

    router.push(
      `/search?search=${encodeURIComponent(value)}`
    );
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <Label
          htmlFor="search"
          className="sr-only"
        >
          Search
        </Label>

        <SidebarInput
          id="search"
          name="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search posts..."
          className="h-8 pl-7"
        />

        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}