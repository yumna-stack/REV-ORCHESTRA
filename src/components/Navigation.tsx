"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/lib/sounds";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const navLinks = [
  { label: "Benefits", href: "/#stats" },
  { label: "Services", href: "/#agents" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog", href: "/blogs" },
];

const resourceLinks = [
  { label: "Playbooks", href: "/resources" },
  { label: "Blog", href: "/blogs" },
  { label: "The Orchestra", href: "/resources/orchestra" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <motion.nav
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: 0 }}
    >
      <motion.div
        className="pointer-events-auto flex items-center justify-between"
        animate={{
          width: scrolled ? "min(92%, 960px)" : "100%",
          marginTop: scrolled ? 16 : 0,
          paddingLeft: scrolled ? 20 : 24,
          paddingRight: scrolled ? 8 : 24,
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
          borderRadius: scrolled ? 9999 : 0,
          backgroundColor: scrolled ? "var(--surface)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.35)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderWidth: 1, borderStyle: "solid", overflow: "visible", WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(0px)" }}
      >
      {/* Wordmark — also resets Orchestrator Mode toggle to ON */}
      <Link
        href="/"
        className="flex items-center"
        onClick={(e) => {
          playClickSound();
          // If already on home, prevent route change, scroll to top, reset toggle
          if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          window.dispatchEvent(new CustomEvent("revorchestra:orchestrator-on"));
        }}
      >
        <span className="font-semibold text-base tracking-tight" style={{ color: "var(--text)" }}>Rev Orchestra</span>
      </Link>

      {/* Center Pill Nav — absolutely positioned so it's truly viewport-centered */}
      <div className="hidden md:flex items-center gap-6 backdrop-blur-xl rounded-full px-6 py-2 absolute left-1/2 -translate-x-1/2" style={{ backgroundColor: "var(--surface)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)" }}>
        {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                const hash = link.href.split("#")[1];
                if (hash) {
                  e.preventDefault();
                  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-3 py-2 text-sm rounded-full transition-all duration-300 nav-link whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

      </div>

      {/* CTA Button */}
      <motion.a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center px-6 py-3 text-sm font-medium text-white rounded-full hover:brightness-110 transition-all uppercase tracking-wider"
        style={{ backgroundColor: "#E85600" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        BOOK A CALL WITH DANNY
      </motion.a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} transition={{ duration: 0.3 }} />
        <motion.span className="w-6 h-0.5 bg-white block" animate={{ opacity: mobileOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
        <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} transition={{ duration: 0.3 }} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-[rgb(0, 0, 0)] border-b border-[rgba(255,255,255,0.06)] p-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      const hash = link.href.split("#")[1];
                      if (hash) {
                        e.preventDefault();
                        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-base transition-colors block py-1 text-[rgba(255,255,255,0.7)] hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              {/* Resources section in mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.3 }}
              >
                <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-2 mt-2">Resources</p>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base text-[rgba(255,255,255,0.7)] hover:text-white transition-colors block py-1 pl-3"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: "#E85600" }}
                >
                  BOOK A CALL WITH DANNY
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
