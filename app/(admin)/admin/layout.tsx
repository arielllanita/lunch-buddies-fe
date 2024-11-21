import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./_components/admin_sidebar";
import TopNav from "./_components/top_nav";

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

        <div className="flex flex-1 flex-col bg-gray-200">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
