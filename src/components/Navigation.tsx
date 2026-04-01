"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/lib/sounds";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const navLinks = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Packages", href: "/packages" },
];

const resourceLinks = [
  { label: "Playbooks", href: "/resources" },
  { label: "Blog", href: "/blogs" },
  { label: "The Orchestra", href: "/resources/orchestra" },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > 100 && currentY > lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Close dropdown on outside click
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
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5" onClick={playClickSound}>
        <motion.div
          className="w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </motion.div>
        <span className="text-white font-semibold text-base">Rev Orchestra</span>
      </Link>

      {/* Center Pill Nav */}
      <div className="hidden md:flex items-center gap-1 bg-[rgba(30,30,30,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-full px-2 py-1.5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                isActive
                  ? "text-accent-orange bg-[rgba(232,86,0,0.08)]"
                  : "text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Resources Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full transition-all duration-300 text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
          >
            Resources
            <motion.svg
              width="10" height="10" viewBox="0 0 10 10" fill="none"
              animate={{ rotate: resourcesOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {resourcesOpen && (
              <motion.div
                className="absolute top-full right-0 mt-2 w-48 bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {resourceLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setResourcesOpen(false)}
                      className="block px-4 py-3 text-sm text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Button */}
      <motion.a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center px-6 py-3 text-sm font-medium text-white bg-accent-orange rounded-full hover:brightness-110 transition-all uppercase tracking-wider border border-[rgba(255,255,255,0.1)]"
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
            className="absolute top-full left-0 right-0 bg-[rgb(14,15,17)] border-b border-[rgba(255,255,255,0.06)] p-6 md:hidden"
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
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base transition-colors block py-1 ${pathname === link.href ? "text-accent-orange" : "text-[rgba(255,255,255,0.7)] hover:text-white"}`}
                  >
                    {link.label}
                  </Link>
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
                  className="mt-4 flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-accent-orange rounded-full uppercase tracking-wider"
                >
                  BOOK A CALL WITH DANNY
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
