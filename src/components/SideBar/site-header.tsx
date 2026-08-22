"use client"

import { SearchForm } from "@/components/SideBar/search-form"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Bell, Menu, SquarePen } from "lucide-react"
import { AvatarWithBadge } from "../Shared/Avatar"
import AuthButton from "../SignUp.SignInButton/Auth.Button"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"
import { NavbarSkeleton } from "../Skeleton/NavbarSkeleton"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <NavbarSkeleton />
  }

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center ">

        <Button
          className="cursor-pointer text-gray-600"
          variant="ghost"
          size="lg"
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
              <div className="flex justify-between items-center space-x-5">

                <Link href='/create-post'>
                  <div className="flex space-x-2 items-center justify-between">
                    <SquarePen />
                    <p>Write</p>
                  </div>
                </Link>

                <Link href='/create-post'>
                  <Bell />
                </Link>

                <AvatarWithBadge
                  user={user}
                />

              </div>
              :
              <AuthButton />
          }
        </div>

      </div>
    </header>
  )
}