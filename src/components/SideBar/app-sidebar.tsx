"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark, HelpCircle, Home, MessageSquare, PenLine, Settings, User } from "lucide-react"

import { NavUser } from "@/components/SideBar/nav-user"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const user = session?.user
  const pathname = usePathname()

  if (!user) return null

  const profileUrl = user.userName ? `/profile/${user.userName}` : "/profile"

  const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Profile", href: profileUrl, icon: User },
    { title: "Bookmarks", href: "/saved", icon: Bookmark },
    { title: "Settings", href: "/settings", icon: Settings },
  ]

  const bottomItems = [
    { title: "Help & Support", href: "#", icon: HelpCircle },
    { title: "Feedback", href: "#", icon: MessageSquare },
  ]

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <Sidebar 
      {...props} 
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! border-r bg-background"
    >
      {/* App Brand / Header */}
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="group flex items-center gap-3 px-2 transition-opacity hover:opacity-90">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            <PenLine className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-semibold tracking-tight text-foreground">StoryHub</h1>
            <p className="text-xs text-muted-foreground truncate">Ideas worth sharing</p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Main Navigation Content */}
      <SidebarContent className="px-3 py-2 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Main Links */}
          <SidebarMenu className="gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={active} 
                    tooltip={item.title} 
                    className="h-10 rounded-lg px-3 text-sm font-medium transition-colors data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className={`size-4 ${active ? "text-foreground" : "text-muted-foreground"}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>

          {/* Action Button (Write Post) */}
          <div className="px-1">
            <Link 
              href="/create-post" 
              className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <PenLine className="size-4 transition-transform duration-200 group-hover:-rotate-12" />
              <span>Write a Post</span>
            </Link>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="pb-4">
          <SidebarMenu className="gap-1">
            {bottomItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={active} 
                    tooltip={item.title} 
                    className="h-9 rounded-lg px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="border-t px-3 py-3 bg-muted/20">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}