import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import drDhia from "@/assets/dr-dhia.jpg";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/allowed", label: "المسموحات" },
  { to: "/forbidden", label: "الممنوعات" },
  { to: "/theories", label: "النظريات" },
  { to: "/about", label: "الدكتور" },
  { to: "/faq", label: "الأسئلة" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className={`glass rounded-3xl px-5 py-3 flex items-center justify-between shadow-soft transition-all ${scrolled ? "shadow-luxe" : ""}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <span className="block size-11 rounded-2xl overflow-hidden ring-2 ring-gold/60 shadow-gold group-hover:scale-110 transition-transform">
              <img src={drDhia} alt="د. ضياء العوضي" className="w-full h-full object-cover object-top" />
            </span>
            <div className="leading-tight">
              <div className="font-extrabold text-lg text-foreground">نظام الطيبات</div>
              <div className="text-[11px] text-muted-foreground">إرث د. ضياء العوضي</div>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent/60 transition-colors"
                  activeProps={{ className: "px-4 py-2 rounded-xl text-sm font-semibold text-primary bg-accent" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/allowed" className="px-5 py-2.5 rounded-xl bg-gradient-emerald text-primary-foreground text-sm font-bold shadow-luxe hover:scale-105 transition-transform">
              ابدأ الآن
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden grid place-items-center size-10 rounded-xl bg-accent">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden glass mt-2 rounded-2xl p-3 shadow-soft"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-foreground/80 hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
