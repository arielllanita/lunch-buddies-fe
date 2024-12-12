import Footer from "@/components/footer";
import TopNav from "@/components/top_nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomepageProvider } from "./_context/homepage.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomepageProvider>
      <TopNav />
      {/* ScrollArea height minus to header height (h-16/64px/4rem) */}
      <ScrollArea className="h-[calc(100vh-4rem)]">{children}</ScrollArea>
      <Footer className="fixed bottom-0 w-full" />
    </HomepageProvider>
  );
}
