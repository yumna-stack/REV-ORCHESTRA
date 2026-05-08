"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";
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

  /* Light nav on blog detail pages (`/blogs/<slug>/...`) so it sits
   * naturally over the white reading view. Dark everywhere else. */
  const isLightNav = /^\/blogs\/[^/]+/.test(pathname ?? "");
  const themeBg = isLightNav ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
  const themeBorder = isLightNav ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)";
  const themeBorderTransparent = isLightNav ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)";
  const themeShadow = isLightNav
    ? "0 10px 30px rgba(0, 0, 0, 0.08)"
    : "0 10px 30px rgba(0, 0, 0, 0.8)";
  const themeText = isLightNav ? "rgb(14, 15, 17)" : "var(--text)";
  const themeLinkText = isLightNav ? "text-[rgba(14,15,17,0.7)]" : "text-[rgba(255,255,255,0.7)]";
  const themeLinkHover = isLightNav ? "hover:text-[rgb(14,15,17)]" : "hover:text-white";
  const themeHoverBg = isLightNav ? "bg-[rgba(0,0,0,0.06)]" : "bg-white/10";
  const themeBarColor = isLightNav ? "bg-[rgb(14,15,17)]" : "bg-white";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Standalone fixed scrim, just below the nav z-50, guaranteed above
          page content. Renders BEFORE the nav so its z-index resolves cleanly
          without depending on the nav's stacking context. */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[999] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          height: 120,
          backgroundColor: themeBg,
        }}
      />
    <motion.nav
      className="fixed left-0 right-0 z-[1000] flex justify-center pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: 0 }}
    >
      <motion.div
        className="pointer-events-auto flex items-center justify-between"
        animate={{
          width: scrolled ? "min(94%, 1200px)" : "100%",
          marginTop: scrolled ? 20 : 0,
          paddingLeft: scrolled ? 32 : 24,
          paddingRight: scrolled ? 16 : 24,
          paddingTop: scrolled ? 12 : 24,
          paddingBottom: scrolled ? 12 : 24,
          borderRadius: scrolled ? 24 : 0,
          backgroundColor: themeBg,
          borderColor: scrolled ? themeBorder : themeBorderTransparent,
          boxShadow: scrolled ? themeShadow : "0 0 0 rgba(0,0,0,0)",
          translateZ: 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderWidth: 1, borderStyle: "solid", overflow: "visible" }}
      >
        {/* Left: Wordmark */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="flex items-center"
            onClick={(e) => {
              playClickSound();
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              window.dispatchEvent(new CustomEvent("revorchestra:orchestrator-on"));
            }}
          >
            <span className="font-semibold text-base tracking-tight" style={{ color: themeText }}>Rev Orchestra</span>
          </Link>
        </div>

        {/* Center: Links Pill */}
        <div className="hidden md:flex flex-none items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: themeBg, borderWidth: 1, borderStyle: "solid", borderColor: themeBorder }}>
          {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  const hash = link.href.split("#")[1];
                  // Only intercept for in-page smooth scroll when we're
                  // already on the page that contains the target element.
                  // Otherwise let the link navigate normally (e.g. /blogs → /#stats).
                  if (hash && pathname === "/") {
                    e.preventDefault();
                    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-300 ${themeLinkText} ${themeLinkHover} whitespace-nowrap overflow-hidden group`}
                whileHover="hover"
              >
                <motion.span
                  className={`absolute inset-0 ${themeHoverBg} rounded-full`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  variants={{ hover: { opacity: 1, scale: 1 } }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10 font-medium">{link.label}</span>
              </motion.a>
            ))}
        </div>

        {/* Right: CTA Button */}
        <div className="flex-1 flex justify-end">
          <motion.a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("cta_clicked", { location: "nav_desktop", destination: CAL_URL })}
            className="hidden md:flex items-center px-6 py-2.5 text-[13px] btn-primary"
            whileTap={{ scale: 0.97 }}
          >
            BOOK A CALL WITH DANNY
          </motion.a>
        </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <motion.span className={`w-6 h-0.5 ${themeBarColor} block`} animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} transition={{ duration: 0.3 }} />
        <motion.span className={`w-6 h-0.5 ${themeBarColor} block`} animate={{ opacity: mobileOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
        <motion.span className={`w-6 h-0.5 ${themeBarColor} block`} animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} transition={{ duration: 0.3 }} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 p-6 md:hidden"
            style={{
              backgroundColor: themeBg,
              borderBottom: `1px solid ${isLightNav ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }}
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
                      // Only intercept for in-page smooth scroll when on the page that has the target.
                      if (hash && pathname === "/") {
                        e.preventDefault();
                        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`text-base transition-colors block py-1 ${themeLinkText} ${themeLinkHover}`}
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
                <p className={`text-xs ${isLightNav ? "text-[rgba(14,15,17,0.4)]" : "text-[rgba(255,255,255,0.3)]"} uppercase tracking-wider mb-2 mt-2`}>Resources</p>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base ${themeLinkText} ${themeLinkHover} transition-colors block py-1 pl-3`}
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
                  onClick={() => posthog.capture("cta_clicked", { location: "nav_mobile", destination: CAL_URL })}
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
    </>
  );
}
