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
  const [cat, setCat] = useState<string>("all");

  const cats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedQ = normalizeArabic(q);
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
  }, [items, q, cat]);

  return (
    <div>
      <div className="mb-6 relative z-10">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 ابحث عن صنف..."
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "2px solid #10b981",
            fontSize: "16px",
            fontWeight: "bold",
            outline: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div className="mb-6 block sm:hidden">
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full p-4 rounded-2xl bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-base font-bold shadow-soft"
        >
          {cats.map((c) => (
            <option key={c} value={c}>{c === "all" ? "جميع الأصناف" : c}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:flex flex-wrap gap-2 mb-6">
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
