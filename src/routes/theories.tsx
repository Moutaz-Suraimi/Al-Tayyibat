import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { theories } from "@/data/site";

export const Route = createFileRoute("/theories")({
  component: Page,
  head: () => ({ meta: [{ title: "النظريات العلمية — نظام الطيبات" }, { name: "description", content: "نظريات الدكتور ضياء العوضي في الفسيولوجيا والتغذية." }] }),
});

function Page() {
  return (
    <PageShell>
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-bold text-gold tracking-widest mb-3">🔬 العلم والحكمة</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">النظريات العلمية</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
            رؤية الدكتور ضياء العوضي للجسد والمرض — تشخيص يبدأ من الجذور لا من الأعراض.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {theories.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-3xl bg-card border border-border p-8 shadow-soft hover:shadow-luxe transition-all"
            >
              <div className="size-16 rounded-2xl bg-gradient-emerald grid place-items-center text-3xl mb-5 shadow-luxe">{t.icon}</div>
              <h2 className="text-2xl font-extrabold mb-3">{t.title}</h2>
              <p className="text-muted-foreground leading-loose">{t.summary}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
