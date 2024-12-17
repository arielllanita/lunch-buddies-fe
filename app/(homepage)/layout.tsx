import Footer from "@/components/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomepageProvider } from "./homepage/_context/homepage.context";
import TopNav from "./_components/top_nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomepageProvider>
      <TopNav />
      <ScrollArea className="h-[calc(100vh-4rem)]">{children}</ScrollArea>
      <Footer className="fixed bottom-0 w-full" />
    </HomepageProvider>
  );
}
