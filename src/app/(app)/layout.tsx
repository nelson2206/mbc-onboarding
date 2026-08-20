import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <Sidebar />
      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-20 pb-24 md:pb-8 px-4 md:px-8 min-h-screen">
        {children}
      </main>
      {/* Navegación inferior — solo móvil, ya que Sidebar/TopNav se ocultan en < md */}
      <MobileNav />
    </>
  );
}
