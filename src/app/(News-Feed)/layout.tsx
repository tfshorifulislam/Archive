import { AppSidebar } from "@/components/SideBar/app-sidebar";
import { SiteHeader } from "@/components/SideBar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function NewsFeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <div className="[--header-height:calc(--spacing(14))]">
  <SidebarProvider className="flex min-h-svh flex-col">

    {/* Top Header */}
    <SiteHeader />

    <div className="flex min-h-0 flex-1">

      {/* Left Sidebar */}
      <AppSidebar />

      {/* Center Feed */}
      <SidebarInset className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-170 px-4 py-6">
          {children}
        </main>
      </SidebarInset>

      {/* Right Sidebar */}
      <aside className="hidden w-75 shrink-0 border-l lg:block">
        <div className="sticky top-14 p-4">
          {/* Right sidebar content */}
        </div>
      </aside>

    </div>
  </SidebarProvider>
</div>
  );
}