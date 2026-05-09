import { motion } from "framer-motion";
import type { Product } from "@/data/site";

const freqStyle = (f: string) => {
  if (f.includes("بلا قيود")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (f.includes("يومياً")) return "bg-teal-100 text-teal-800 border-teal-200";
  if (f.includes("أسبوعياً")) return "bg-amber-100 text-amber-800 border-amber-200";
  if (f.includes("أحياناً")) return "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200";
  return "bg-rose-100 text-rose-800 border-rose-200";
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const isAllowed = product.status === "allowed";
  return (
    <article
      className="group relative bg-card rounded-[2rem] p-4 sm:p-5 border border-border shadow-soft hover:shadow-luxe hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: "both" }}
    >
      <div className={`absolute top-3 left-3 z-10 size-10 grid place-items-center rounded-2xl text-lg font-bold ${
        isAllowed ? "bg-gradient-emerald text-primary-foreground" : "bg-gradient-to-br from-rose-500 to-red-700 text-white"
      } shadow-luxe`}>
        {isAllowed ? "✓" : "✗"}
      </div>

      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-accent to-muted relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-7xl">{product.emoji ?? "🌿"}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <div className="text-[11px] font-semibold text-muted-foreground mb-2">{product.category}</div>
        <h3 className="font-extrabold text-lg text-foreground mb-2 line-clamp-1">{product.name}</h3>
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${freqStyle(product.frequency)}`}>
          {product.frequency}
        </span>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{product.description}</p>
      </div>
    </article>
  );
}
