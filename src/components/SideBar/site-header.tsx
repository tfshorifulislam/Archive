"use client"

import { SearchForm } from "@/components/SideBar/search-form"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import { AvatarWithBadge } from "../Shared/Avatar"
import AuthButton from "../SignUp.SignInButton/Auth.Button"
import { useSession } from "@/lib/auth-client"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  const { data: session, isPending } = useSession();
  const user = session
  console.log(user)

  if (isPending) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">

        <Button
          className="cursor-pointer h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          {/* <PanelLeftIcon /> */}
          <Menu strokeWidth={2} />
        </Button>

        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />


        <Breadcrumb className="hidden sm:block">
          <h1 className="text-2xl font-black">
            Archive
          </h1>
        </Breadcrumb>


        <div className="ml-4">
          <SearchForm className="w-full sm:w-auto" />
        </div>


        <div className="ml-auto">
          {
            user ?
            <AvatarWithBadge />
            :
            <AuthButton />
          }
        </div>

      </div>
    </header>
  )
}