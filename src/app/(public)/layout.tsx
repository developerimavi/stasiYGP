import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealProvider } from "@/components/home/RevealProvider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* One observer for the whole public side — it picks up every `.reveal`
          element on the page, so pages don't each need their own. */}
      <RevealProvider />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
