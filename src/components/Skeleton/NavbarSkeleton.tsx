import { Skeleton } from "@/components/ui/skeleton"

export function NavbarSkeleton() {
  return (
    <div className="flex w-full items-center">
      <Skeleton className="h-8 w-8 rounded-md" />

      <Skeleton className="ml-4 h-6 w-24" />

      <Skeleton className="ml-4 h-9 w-48 rounded-md" />

      <div className="ml-auto flex items-center gap-5">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="size-5 rounded" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  )
}