import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { ProductsGrid } from "@/components/site/ProductsGrid";
import { products } from "@/data/site";

export const Route = createFileRoute("/allowed")({
  component: Page,
  head: () => ({ meta: [{ title: "المسموحات — نظام الطيبات" }, { name: "description", content: "جميع الأطعمة والمشروبات الطبيعية المسموحة في نظام الطيبات." }] }),
});

function Page() {
  return (
    <PageShell>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block text-xs font-bold text-success tracking-widest mb-3">✅ المسموح في النظام</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">المسموحات</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
            جميع الأطعمة والمشروبات الطبيعية المسموح بها في نظام الطيبات. تذكّر: لا تأكل إلا عند الجوع، ولا تأكل حتى الشبع.
          </p>
        </motion.div>
        <ProductsGrid items={products.allowed} />
      </section>
    </PageShell>
  );
}
