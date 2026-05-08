import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/site";

export function ProductsGrid({ items }: { items: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const cats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchQ = !q || i.name.includes(q) || i.description.includes(q);
      const matchC = cat === "all" || i.category === cat;
      return matchQ && matchC;
    });
  }, [items, q, cat]);

  return (
    <div>
      <div className="glass rounded-3xl p-4 md:p-5 shadow-soft mb-6 flex flex-col md:flex-row gap-3 sticky top-24 z-30">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن صنف..."
            className="w-full pr-12 pl-4 py-3 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-semibold"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              cat === c
                ? "bg-gradient-emerald text-primary-foreground shadow-luxe scale-105"
                : "bg-card border border-border text-foreground/70 hover:text-foreground hover:border-primary/40"
            }`}
          >
            {c === "all" ? "الكل" : c}
          </button>
        ))}
      </div>

      <div className="text-sm text-muted-foreground mb-4">عرض {filtered.length} صنف</div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground">
          لا توجد نتائج مطابقة
        </motion.div>
      )}
    </div>
  );
}
