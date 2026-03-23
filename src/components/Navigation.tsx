"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Products", href: "#features" },
  { label: "About", href: "#stats" },
  { label: "Blogs", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ease-in-out"
      style={{
        transform: hidden ? "translateY(-120%)" : "translateY(0)",
        opacity: hidden ? 0 : 1,
      }}
    >
      {/* Logo */}
      <Link href="/" className="text-white font-semibold text-base tracking-[1.5px] uppercase">
        REVORCHESTRA
      </Link>

      {/* Center Pill Nav */}
      <div className="hidden md:flex items-center gap-1 bg-[rgba(30,30,30,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-full px-2 py-1.5">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-2 text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition-colors duration-300 rounded-full hover:bg-[rgba(255,255,255,0.05)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#contact"
        className="hidden md:flex items-center px-6 py-3 text-sm font-medium text-white bg-accent-orange rounded-full hover:brightness-110 transition-all duration-300 uppercase tracking-wider"
      >
        BUY TEMPLATE
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgb(14,15,17)] border-b border-[rgba(255,255,255,0.06)] p-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-accent-orange rounded-full uppercase tracking-wider"
              onClick={() => setMobileOpen(false)}
            >
              BUY TEMPLATE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
