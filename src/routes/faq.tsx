import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { faqs } from "@/data/site";

export const Route = createFileRoute("/faq")({
  component: Page,
  head: () => ({ meta: [{ title: "الأسئلة الشائعة — نظام الطيبات" }, { name: "description", content: "إجابات على أكثر الأسئلة شيوعاً حول نظام الطيبات." }] }),
});

function Page() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageShell>
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-bold text-gold tracking-widest mb-3">❔ تساؤلات</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">الأسئلة الشائعة</h1>
          <p className="text-muted-foreground leading-loose">إجابات مباشرة على أكثر ما يُسأل عنه في نظام الطيبات.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-right flex items-center justify-between gap-4 p-5 hover:bg-accent/40 transition-colors"
              >
                <span className="font-extrabold text-lg">{f.q}</span>
                <ChevronDown className={`size-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="px-5 pb-5 text-muted-foreground leading-loose">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
