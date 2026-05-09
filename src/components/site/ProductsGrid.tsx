import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
  const [cat, setCat] = useState<string>("all");
  const [search, setSearch] = useState("");

  const cats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    set.delete("🌐 الكل");
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let result = items;
    if (cat !== "all") {
      result = result.filter((i) => i.category === cat);
    }
    if (search.trim()) {
      const q = normalizeArabic(search);
      result = result.filter(
        (i) =>
          normalizeArabic(i.name).includes(q) ||
          normalizeArabic(i.description).includes(q) ||
          normalizeArabic(i.category).includes(q)
      );
    }
    return result;
  }, [items, cat, search]);

  return (
    <div>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
          <Search className="size-5" />
        </div>
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-2xl py-4 pr-12 pl-4 text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
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
        {filtered.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground font-bold">
          لا توجد نتائج مطابقة
        </motion.div>
      )}
    </div>
  );
}
