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
    const timer = setTimeout(() => setDebouncedQ(q), 250);
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
  }, [items, debouncedQ, cat]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-3 md:p-4 shadow-soft mb-6 relative z-10 border border-emerald-500/30">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-emerald-600 pointer-events-none" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن صنف..."
            style={{
              width: "100%",
              padding: "16px 20px",
              paddingRight: "56px",
              borderRadius: "16px",
              backgroundColor: "transparent",
              color: "inherit",
              border: "2px solid #10b981",
              fontSize: "16px",
              fontWeight: "bold",
              outline: "none"
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-3 rounded-2xl text-base font-bold transition-all text-right ${
              cat === c
                ? "bg-gradient-emerald text-primary-foreground shadow-luxe scale-[1.02]"
                : "bg-card border border-border text-foreground/80 hover:text-foreground hover:border-primary/40"
            }`}
          >
            {c === "all" ? "الكل" : c}
          </button>
        ))}
      </div>

      <div className="text-sm text-muted-foreground mb-4 px-1">عرض {filtered.length} صنف</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
