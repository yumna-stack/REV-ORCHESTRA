"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Section({ children, className = "", id, delay = 0 }: { children: ReactNode; className?: string; id?: string; delay?: number }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ text }: { text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)]">
      <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
      <span className="w-2 h-2 rounded-full bg-accent-orange" />
      <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">{text}</span>
    </div>
  );
}

export function PageHero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <section className="relative w-full pt-[140px] pb-20 bg-[rgb(14,15,17)] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
      }} />

      <motion.div
        className="relative z-10 max-w-[900px] mx-auto px-5 text-center flex flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
          <Badge text={badge} />
        </motion.div>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.8, ease }}
          className="text-[clamp(32px,5vw,72px)] font-medium leading-[110%] tracking-[-2px] text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease }}
          className="text-lg text-[rgba(255,255,255,0.5)] leading-[160%] max-w-[600px]"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function CTAButton({ text, href = "#contact", variant = "primary" }: { text: string; href?: string; variant?: "primary" | "secondary" }) {
  return variant === "primary" ? (
    <motion.a
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </motion.a>
  ) : (
    <motion.a
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] transition-all"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </motion.a>
  );
}

/* ── Stagger Grid: wraps grid children with staggered reveal ── */
export function StaggerGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

/* ── Grid Item: individual card in a stagger grid ── */
export function GridItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
