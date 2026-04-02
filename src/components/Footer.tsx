"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const footerLinks = {
  main: [
    { label: "What We Do", href: "/#agents" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Packages", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  resources: [
    { label: "Playbooks", href: "/resources" },
    { label: "Blog", href: "/blogs" },
    { label: "The Orchestra", href: "/resources/orchestra" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-conditions" },
  ],
};

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/revorchestra",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/revorchestra",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/revorchestra",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const tools = ["n8n", "Claude", "Clay", "Instantly", "HubSpot"];

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const linkHover = {
  x: 4,
  color: "rgba(255,255,255,1)",
  transition: { duration: 0.2 },
};

export default function Footer() {
  return (
    <footer className="relative w-full pt-[100px] pb-0 bg-[rgb(14,15,17)] overflow-hidden">
      {/* Top border — Framer Cryps style */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgb(41,42,43)]" />

      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-20 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* ── LEFT COLUMN — Brand + description + social icons ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-10">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-orange flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">Rev Orchestra</span>
            </motion.div>

            {/* Description — Framer 18px content style */}
            <p className="text-[16px] text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[420px]">
              The AI GTM System for B2B Founders. Six AI agents, connected to your stack, running 24/7. Yours permanently in 90 days.
            </p>

            {/* Social icons row — Framer: gap 16px, 20x20 */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(232,86,0,0.1)] hover:border-[rgba(232,86,0,0.3)] transition-colors"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3 + i * 0.08,
                  }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <motion.a
              href="mailto:hello@revorchestra.com"
              className="text-sm text-[rgba(255,255,255,0.3)] hover:text-accent-orange transition-colors w-fit"
              whileHover={{ x: 3 }}
            >
              hello@revorchestra.com
            </motion.a>
          </motion.div>

          {/* ── RIGHT COLUMN — Link groups (Framer: 2 groups horizontal, gap 40px) ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-10"
          >
            {/* Company links */}
            <div className="min-w-[140px]">
              <motion.h4
                className="text-[16px] text-white font-medium mb-5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, ease }}
              >
                Company
              </motion.h4>
              <div className="flex flex-col gap-3">
                {footerLinks.main.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease }}
                  >
                    <motion.div whileHover={linkHover}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          const hash = link.href.split("#")[1];
                          if (hash) {
                            e.preventDefault();
                            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="text-[16px] text-[rgba(255,255,255,0.45)] hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resources links */}
            <div className="min-w-[140px]">
              <motion.h4
                className="text-[16px] text-white font-medium mb-5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, ease, delay: 0.1 }}
              >
                Resources
              </motion.h4>
              <div className="flex flex-col gap-3">
                {footerLinks.resources.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease }}
                  >
                    <motion.div whileHover={linkHover}>
                      <Link
                        href={link.href}
                        className="text-[16px] text-[rgba(255,255,255,0.45)] hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legal links */}
            <div className="min-w-[140px]">
              <motion.h4
                className="text-[16px] text-white font-medium mb-5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, ease, delay: 0.2 }}
              >
                Legal
              </motion.h4>
              <div className="flex flex-col gap-3">
                {footerLinks.legal.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease }}
                  >
                    <motion.div whileHover={linkHover}>
                      <Link
                        href={link.href}
                        className="text-[16px] text-[rgba(255,255,255,0.45)] hover:text-white transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar — Framer: top border, space-between, 60px padding ── */}
        <motion.div
          className="border-t border-[rgb(41,42,43)] py-[60px] flex flex-col md:flex-row items-center justify-between gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.p
            className="text-[16px] text-[rgba(255,255,255,0.35)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            &copy; 2026 Rev Orchestra. All Rights Reserved.
          </motion.p>

          <motion.div
            className="flex items-center gap-5 text-[16px] text-[rgba(255,255,255,0.35)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/legal/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[rgba(255,255,255,0.15)]">|</span>
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </motion.div>
        </motion.div>

        {/* Built with strip */}
        <motion.div
          className="border-t border-[rgba(255,255,255,0.04)] py-5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-xs text-[rgba(255,255,255,0.2)]">
            Built with {tools.join(" \u00B7 ")} &mdash; US LLC via Stripe Atlas &mdash; Team in Sri Lanka &amp; Singapore
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
