import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/site";

const normalizeArabic = (text: string) => {
  if (!text) return "";
  return text
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

export function ProductsGrid({ items }: { items: Product[] }) {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(timer);
  }, [q]);

  const cats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedQ = normalizeArabic(debouncedQ);
    const searchTerms = normalizedQ.split(" ").filter(Boolean);

    return items.filter((i) => {
      const normalizedName = normalizeArabic(i.name);
      const normalizedDesc = normalizeArabic(i.description);

      const matchQ =
        searchTerms.length === 0 ||
        searchTerms.every(
          (term) =>
            normalizedName.includes(term) || normalizedDesc.includes(term)
        );
      const matchC = cat === "all" || i.category === cat;
      return matchQ && matchC;
    });
  }, [items, deferredQ, cat]);

  return (
    <div>
      <div className="glass rounded-3xl p-3 md:p-5 shadow-soft mb-6 flex flex-col md:flex-row gap-3 relative z-10">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن صنف..."
            className="w-full pr-12 pl-4 py-3 rounded-2xl bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-semibold"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
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

      <div className="text-sm text-muted-foreground mb-4 px-1">عرض {filtered.length} صنف</div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground font-bold">
          لا توجد نتائج مطابقة
        </motion.div>
      )}
    </div>
  );
}
