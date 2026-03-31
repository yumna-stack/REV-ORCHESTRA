"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/danny-revorchestra";

const navLinks = [
  { label: "What We Do", href: "#agents" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Packages", href: "#pricing" },
];

const resourceLinks = [
  { label: "Playbooks", href: "/resources", desc: "Downloadable GTM frameworks" },
  { label: "Blog", href: "/blogs", desc: "Articles on agents, outbound & GTM" },
  { label: "The Orchestra", href: "/resources/orchestra", desc: "Weekly newsletter" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-5"
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-[1200px] mx-auto mt-4">
        <nav
          className="flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300"
          style={{
            background: scrolled ? "rgba(8,8,15,0.85)" : "rgba(8,8,15,0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">Rev Orchestra</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.04)] px-2 py-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors rounded-full hover:bg-[rgba(255,255,255,0.06)]">
                {link.label}
              </a>
            ))}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 px-4 py-2 text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors rounded-full hover:bg-[rgba(255,255,255,0.06)]"
              >
                Resources
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 w-[260px] rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(8,8,15,0.95)] backdrop-blur-xl p-2 shadow-2xl"
                  >
                    {resourceLinks.map((r) => (
                      <Link key={r.label} href={r.href} onClick={() => setResourcesOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                        <div className="text-sm text-white font-medium">{r.label}</div>
                        <div className="text-xs text-[rgba(255,255,255,0.4)] mt-0.5">{r.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-accent-orange text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
            Book a Call with Danny
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col gap-1.5 p-2">
            <span className={`w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-2 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,15,0.95)] backdrop-blur-xl overflow-hidden">
              <div className="p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-[rgba(255,255,255,0.6)] hover:text-white rounded-xl hover:bg-[rgba(255,255,255,0.06)]">{link.label}</a>
                ))}
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-2 mt-1">
                  <p className="px-4 py-1 text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Resources</p>
                  {resourceLinks.map((r) => (
                    <Link key={r.label} href={r.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-[rgba(255,255,255,0.6)] hover:text-white rounded-xl hover:bg-[rgba(255,255,255,0.06)]">{r.label}</Link>
                  ))}
                </div>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-accent-orange text-white text-sm font-semibold rounded-full">Book a Call with Danny →</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
