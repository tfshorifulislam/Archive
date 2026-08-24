"use client"

import * as React from "react"

import { NavMain } from "@/components/SideBar/nav-main"
import { NavUser } from "@/components/SideBar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TerminalSquareIcon, Settings2Icon, LifeBuoyIcon, SendIcon, FrameIcon, PieChartIcon, MapIcon, TerminalIcon, SquarePlus, UserShield } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session } = useSession();
  const user = session?.user;

  const data = {
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: (
          <TerminalSquareIcon
          />
        ),
        isActive: true,

      },
      {
        title: "Profile",
        url: `/profile/${user?.userName}`,
        icon: (
          <UserShield />
        ),
      },
      {
        title: "Post",
        url: "/create-post",
        icon: (
          <SquarePlus />
        ),
      },
      {
        title: "Settings",
        url: "#",
        icon: (
          <Settings2Icon
          />
        ),
      },
    ],


    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: (
          <LifeBuoyIcon
          />
        ),
      },
      {
        title: "Feedback",
        url: "#",
        icon: (
          <SendIcon
          />
        ),
      },
    ],


    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: (
          <FrameIcon
          />
        ),
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: (
          <PieChartIcon
          />
        ),
      },
      {
        name: "Travel",
        url: "#",
        icon: (
          <MapIcon
          />
        ),
      },
    ],
  }

  if (!user) {
    return null
  }

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <TerminalIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Archive</span>
                <span className="truncate text-xs">Share your thoughts</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
