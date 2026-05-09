import { Link } from "@tanstack/react-router";
import tayebatLogo from "@/assets/tayebat.png";
export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-to-b from-transparent to-accent/30">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-16 w-auto overflow-hidden">
                <img src={tayebatLogo} alt="لوجو نظام الطيبات" className="h-full w-full object-contain" />
              </span>
              <div>
                <div className="font-extrabold text-lg">نظام الطيبات</div>
                <div className="text-xs text-muted-foreground">علم + حكمة + التزام</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              موقع تخليداً لذكرى الدكتور ضياء العوضي رحمه الله — أستاذ الطب الطبيعي وصاحب نظام الطيبات.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">الأقسام</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/allowed" className="text-muted-foreground hover:text-primary">✅ المسموحات</Link></li>
              <li><Link to="/forbidden" className="text-muted-foreground hover:text-primary">❌ الممنوعات</Link></li>
              <li><Link to="/theories" className="text-muted-foreground hover:text-primary">🔬 النظريات</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">📖 عن الدكتور</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">❔ الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">من كلماته</h4>
            <blockquote className="font-serif italic text-foreground/80 leading-loose border-r-2 border-gold pr-4">
              "غذاؤك دواؤك، ودواؤك في غذائك. التوازن سرّ الصحة، والاعتدال سرّ الحياة."
            </blockquote>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} نظام الطيبات — جميع الحقوق محفوظة.</div>
          <div>
            تم تصميم وتطوير الموقع بواسطة{" "}
            <a href="https://suriix.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-gold transition-colors underline-offset-4 hover:underline">شركة Suriix</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
