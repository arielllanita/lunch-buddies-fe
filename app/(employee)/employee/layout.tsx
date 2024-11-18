import Footer from "@/components/footer";
import TopNav from "@/components/top_nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopNav />
      {children}
      <Footer className="fixed bottom-0 w-full" />
    </div>
  );
}
