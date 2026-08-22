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
      <SidebarProvider className="flex flex-col">
        
        {/* Top Header */}
        <SiteHeader />

        <div className="flex flex-1">
          
          {/* Sidebar */}
          <AppSidebar />

          {/* Page Content */}
          <SidebarInset>
            {children}
          </SidebarInset>

        </div>
      </SidebarProvider>
    </div>
  );
}