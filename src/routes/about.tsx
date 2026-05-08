import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import drDhia from "@/assets/dr-dhia.jpg";
import { quotes } from "@/data/site";

export const Route = createFileRoute("/about")({
  component: Page,
  head: () => ({ meta: [{ title: "الدكتور ضياء العوضي — نظام الطيبات" }, { name: "description", content: "تخليداً لذكرى أستاذ الطب الطبيعي الدكتور ضياء العوضي." }] }),
});

function Page() {
  return (
    <PageShell>
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -inset-4 bg-gradient-emerald rounded-[2.5rem] opacity-20 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden glass shadow-luxe p-3">
              <img src={drDhia} alt="الدكتور ضياء العوضي" className="w-full aspect-[4/5] object-cover rounded-[1.5rem]" />
            </div>
          </motion.div>
          <div>
            <div className="inline-block text-xs font-bold text-gold tracking-widest mb-3">✦ تخليداً لذكرى</div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">الدكتور ضياء العوضي</h1>
            <p className="text-lg text-primary font-bold mb-6">رحمه الله — أستاذ الطب الطبيعي وصاحب نظام الطيبات</p>
            <div className="prose-lg text-muted-foreground leading-loose space-y-4">
              <p>
                هذا الموقع تخليداً لذكرى العالم الجليل الدكتور ضياء العوضي، الذي أهدى حياته لخدمة الإنسانية من خلال علم التغذية الطبيعية.
              </p>
              <p>
                نظام الطيبات هو إرثه العلمي الخالد — منهج يستند إلى التوازن والاعتدال، يربط بين الغذاء والصحة، ويعيد للجسم قدرته الفطرية على الشفاء.
              </p>
            </div>
            <blockquote className="mt-8 font-serif text-xl leading-loose text-foreground/90 border-r-4 border-gold pr-6 py-2">
              "غذاؤك دواؤك ودواؤك في غذائك. التوازن سرّ الصحة، والاعتدال سرّ الحياة."
            </blockquote>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-black text-center mb-10">من كلماته</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {quotes.map((q, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl bg-card border border-border p-7 shadow-soft"
              >
                <p className="font-serif text-lg leading-loose mb-3">"{q.text}"</p>
                <div className="text-xs font-bold text-primary">{q.topic}</div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
