import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { ProductsGrid } from "@/components/site/ProductsGrid";
import { products } from "@/data/site";

export const Route = createFileRoute("/forbidden")({
  component: Page,
  head: () => ({ meta: [{ title: "الممنوعات — نظام الطيبات" }, { name: "description", content: "الأطعمة والمواد الممنوعة كلياً في نظام الطيبات." }] }),
});

function Page() {
  return (
    <PageShell>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block text-xs font-bold text-destructive tracking-widest mb-3">❌ الممنوع في النظام</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">الممنوعات</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
            هذه المنتجات ممنوعة نهائياً في نظام الطيبات. تناولها يبطل مفعول النظام — الالتزام الكامل هو الطريق الوحيد للشفاء.
          </p>
        </motion.div>
        <ProductsGrid items={products.forbidden} />
      </section>
    </PageShell>
  );
}
