import AdminSidebar from "./_components/admin_sidebar";
import TopNav from "./_components/top_nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="bg-black text-white flex items-center justify-end h-16 shrink-0 gap-2">
          <TopNav />
        </header>

        {/* ScrollArea height minus to header height (h-16/64px) */}
        <ScrollArea className="bg-gray-200 w-full h-[calc(100vh-4rem)]">{children}</ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
