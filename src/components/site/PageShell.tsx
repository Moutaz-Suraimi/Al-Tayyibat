import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background ornament">
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}
