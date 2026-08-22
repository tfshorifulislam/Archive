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

      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset className="min-w-0 flex-1">
        {children}
      </SidebarInset>

      {/* Right Sidebar */}
      <aside className="hidden w-72 shrink-0 border-l lg:block xl:w-80 2xl:w-96">
        {/* Right sidebar content */}
      </aside>

    </div>
  </SidebarProvider>
</div>
  );
}