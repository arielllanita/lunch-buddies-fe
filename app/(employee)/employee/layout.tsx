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
    </div>
  );
}
