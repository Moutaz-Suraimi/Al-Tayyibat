import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, BookOpen, Stethoscope, Quote } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import drDhia from "@/assets/dr-dhia.jpg";
import tayebatLogo from "@/assets/tayebat.png";
import { products, frequencyTiers, goldenRules, quotes, theories, stats, testimonials } from "@/data/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "نظام الطيبات — إرث الدكتور ضياء العوضي" },
      { name: "description", content: "غذاء متوازن = جسم قوي = عقل صافي = طاقة نقية. نظام طبيعي قائم على علم وحكمة." },
    ],
  }),
});

function Home() {
  const featured = [...products.allowed.slice(0, 4), ...products.forbidden.slice(0, 4)];
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
        <div className="absolute top-40 -left-32 size-96 rounded-full bg-gold/15 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 py-16 lg:py-28 relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-bold text-primary mb-6 shadow-soft">
                <Sparkles className="size-4" /> نظام غذائي طبيعي
              </div>
              <div className="flex items-center gap-4 mb-6">
                <img src={tayebatLogo} alt="شعار الطيبات" className="w-16 h-16 lg:w-24 lg:h-24 object-contain" />
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  نظام <span className="text-shimmer">الطيبات</span>
                </h1>
              </div>
              <p className="text-xl lg:text-2xl text-foreground/80 leading-relaxed mb-4 font-semibold">
                غذاء متوازن = جسم قوي = عقل صافي = طاقة نقية
              </p>
              <p className="text-base text-muted-foreground mb-8 max-w-xl leading-loose">
                نظام قائم على علم وخبرة وحكمة، تركه لنا الدكتور <span className="font-bold text-primary">ضياء العوضي رحمه الله</span> — إرثٌ خالد ينفع الناس إلى يوم الدين.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/allowed" className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-emerald text-primary-foreground font-bold shadow-luxe hover:scale-105 transition-transform">
                  ✅ المسموحات
                  <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link to="/forbidden" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass text-foreground font-bold shadow-soft hover:shadow-luxe transition-all">
                  ❌ الممنوعات
                </Link>
                <Link to="/theories" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-foreground text-background font-bold hover:bg-foreground/90 transition-colors">
                  🔬 النظريات
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                <div className="glass rounded-2xl p-4 text-center shadow-soft">
                  <div className="text-3xl font-black text-primary">91</div>
                  <div className="text-xs text-muted-foreground mt-1">مسموح</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center shadow-soft">
                  <div className="text-3xl font-black text-destructive">81</div>
                  <div className="text-xs text-muted-foreground mt-1">ممنوع</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center shadow-soft">
                  <div className="text-3xl font-black text-gold">172</div>
                  <div className="text-xs text-muted-foreground mt-1">إجمالي</div>
                </div>
              </div>
            </motion.div>

            {/* Doctor portrait */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="absolute -inset-6 bg-gradient-emerald rounded-[3rem] opacity-20 blur-2xl animate-glow" />
              <div className="relative rounded-[2.5rem] glass shadow-luxe p-3">
                <div className="rounded-[2rem] overflow-hidden aspect-[4/5] bg-gradient-emerald">
                  <img src={drDhia} alt="الدكتور ضياء العوضي" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 glass rounded-2xl p-3 sm:p-4 shadow-luxe max-w-[200px] sm:max-w-[240px]">
                  <div className="text-xs text-muted-foreground mb-1">✦ صاحب النظام</div>
                  <div className="font-extrabold text-base sm:text-lg leading-tight">الدكتور ضياء العوضي</div>
                  <div className="text-xs text-primary font-semibold mt-1">رحمه الله</div>
                </div>
                <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 bg-gradient-gold text-gold-foreground rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-gold text-[11px] sm:text-xs font-extrabold">
                  ✦ أستاذ الطب الطبيعي
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 py-12">
        <div className="glass rounded-3xl p-6 md:p-8 shadow-soft grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENCY INDEX */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading kicker="⏱️ القاعدة الذهبية" title="مؤشّر التكرار" subtitle="كم مرّة تأكل كل صنف؟" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {frequencyTiers.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 text-center shadow-soft hover:shadow-luxe transition-all"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${t.color}`} />
              <div className="text-3xl mb-3">{t.emoji}</div>
              <div className="text-4xl font-black text-foreground">{t.count}</div>
              <div className="font-bold text-sm mt-2">{t.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.note}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTES */}
      <section className="py-20 bg-gradient-to-b from-transparent via-accent/30 to-transparent">
        <div className="container mx-auto px-4">
          <SectionHeading kicker="✦ من كلماته ✦" title="اقتباسات تُعيد تشكيل الفهم" subtitle="كلام كان يقوله بثبات العالم — يهدم اليقين الزائف ويفتح أبواب الحقيقة" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {quotes.map((q, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl bg-card p-7 border border-border shadow-soft hover:shadow-luxe transition-all group"
              >
                <Quote className="size-8 text-gold/60 mb-4" />
                <p className="font-serif text-lg leading-loose text-foreground/90 mb-4">"{q.text}"</p>
                <div className="text-xs font-bold text-primary">{q.topic}</div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* GOLDEN RULES */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading kicker="📜 الأسس" title="القواعد الذهبية" subtitle="الأسس التي لا يُحاد عنها في نظام الطيبات" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {goldenRules.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-3xl bg-card p-7 border border-border shadow-soft hover:shadow-luxe hover:-translate-y-1 transition-all"
            >
              <div className="absolute -top-10 -left-10 size-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <div className="size-14 rounded-2xl bg-gradient-emerald grid place-items-center text-2xl shadow-luxe mb-4">{r.icon}</div>
                <h3 className="font-extrabold text-lg mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THEORIES */}
      <section className="py-20 bg-gradient-to-b from-transparent to-accent/30">
        <div className="container mx-auto px-4">
          <SectionHeading kicker="🔬 العلم" title="نظريات الدكتور" subtitle="رؤية فريدة تفسّر الأمراض من جذورها" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {theories.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-luxe transition-all"
              >
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="font-extrabold text-lg mb-3">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-loose">{t.summary}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/theories" className="inline-flex items-center gap-2 text-primary font-bold hover:text-gold transition-colors">
              <BookOpen className="size-4" /> اقرأ النظريات بالكامل ←
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading kicker="🌿 استعرض النظام" title="عيّنة من المسموحات والممنوعات" subtitle="172 صنفاً مدروساً بدقّة في نظام الطيبات" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {featured.map((p, i) => <ProductCard key={p.name + i} product={p} index={i} />)}
        </div>
        <div className="flex justify-center gap-3 mt-10">
          <Link to="/allowed" className="px-6 py-3 rounded-2xl bg-gradient-emerald text-primary-foreground font-bold shadow-luxe">عرض كل المسموحات</Link>
          <Link to="/forbidden" className="px-6 py-3 rounded-2xl bg-foreground text-background font-bold">عرض كل الممنوعات</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-transparent to-accent/40">
        <div className="container mx-auto px-4">
          <SectionHeading kicker="✦ شهادات حقيقية" title="تجارب الناس مع النظام" subtitle="قصص من زوّار طبّقوا النظام وشاركونا أثره في حياتهم" />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-luxe transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-2xl bg-gradient-emerald grid place-items-center text-primary-foreground font-black text-lg">{t.name[0]}</div>
                  <div>
                    <div className="font-extrabold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.country}</div>
                  </div>
                </div>
                <h4 className="font-bold mb-2 text-foreground">{t.title}</h4>
                <p className="text-sm text-muted-foreground leading-loose mb-4">{t.body}</p>
                <div className="flex gap-2 flex-wrap">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-emerald p-10 md:p-16 text-center shadow-luxe">
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative">
            <Stethoscope className="size-12 text-primary-foreground/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">ابدأ رحلة الشفاء اليوم</h2>
            <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto mb-8 leading-loose">
              التزم بالنظام كاملاً، واترك جسدك يصلح نفسه بإذن الله.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link to="/allowed" className="px-7 py-4 rounded-2xl bg-background text-foreground font-bold shadow-luxe hover:scale-105 transition-transform">ابدأ بالمسموحات</Link>
              <Link to="/about" className="px-7 py-4 rounded-2xl glass-dark text-primary-foreground font-bold">تعرّف على الدكتور</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block text-xs font-bold text-gold tracking-widest mb-3">{kicker}</div>
      <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
