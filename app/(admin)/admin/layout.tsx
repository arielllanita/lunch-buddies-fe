import TopNav from "@/components/top_nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./_components/admin_sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="w-full">
        <TopNav />
        {/* <SidebarTrigger /> */}
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
