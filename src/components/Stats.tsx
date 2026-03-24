"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Reveal, fadeLeft } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const cardSlide = (delay: number) => ({
  hidden: { opacity: 0, x: 80, scale: 0.95, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease, delay } },
});

/* ── Animated Counter Component ── */
function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  color,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value >= 1000000) return `${(v / 1000000).toFixed(0)}`;
    if (value >= 1000) return `${Math.round(v)}`;
    return `${Math.round(v)}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className="text-[72px] font-medium leading-none tracking-[-2px] relative z-10 block" style={{ color }}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ── Pulsing glow ring behind numbers ── */
function PulsingGlow({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      className="absolute bottom-4 left-8 w-[200px] h-[80px] rounded-full pointer-events-none"
      style={{ background: `radial-gradient(ellipse, ${color}15 0%, transparent 70%)` }}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Stats Cards — staggered slide-in, NO overlap ── */
function StatsCards() {
  const cards = [
    {
      label: "REQUESTS PROCESSED",
      tag: "6 DAYS",
      icon: "⚡",
      value: 2000000,
      suffix: " Million",
      duration: 2.5,
      color: "#9897FF",
      bg: "linear-gradient(180deg, rgba(100,80,180,0.12) 0%, rgba(14,15,17,1) 100%)",
      hasGrid: true,
      iconAnim: { rotate: [0, 10, -10, 0] },
    },
    {
      label: "CHAINS TRACKED",
      tag: "IN 2025",
      icon: "📦",
      value: 12,
      suffix: "+",
      duration: 1.5,
      color: "#E85600",
      bg: "linear-gradient(135deg, rgba(14,15,17,1) 0%, rgba(14,15,17,1) 40%, rgba(232,86,0,0.15) 100%)",
      hasGlow: true,
      hasLine: true,
      iconAnim: { scale: [1, 1.15, 1] },
    },
    {
      label: "CLIENTS SUPPORTED",
      tag: "GLOBALLY",
      icon: "🌐",
      value: 2300,
      suffix: "+",
      duration: 2,
      color: "rgba(255,255,255,0.15)",
      bg: "linear-gradient(180deg, rgba(30,30,30,0.5) 0%, rgba(14,15,17,1) 100%)",
      iconAnim: { rotate: [0, 360] },
      iconDur: 8,
      iconEase: "linear" as const,
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, x: 80, scale: 0.95, filter: "blur(8px)" },
            visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ scale: 1.01, y: -2 }}
        >
          <div className="rounded-[36px] overflow-hidden" style={{ border: "1px solid rgba(41,42,43,1)" }}>
            <div className="relative px-8 pt-6 pb-8" style={{ background: card.bg }}>
              {/* Grid pattern for first card */}
              {card.hasGrid && (
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              )}
              {/* Orange glow for second card */}
              {card.hasGlow && (
                <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(232,86,0,0.2) 0%, transparent 60%)" }} />
              )}
              <PulsingGlow color={card.color} delay={i * 0.5} />

              {/* Header row */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">{card.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{card.tag}</span>
                  <motion.div
                    className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center"
                    animate={card.iconAnim}
                    transition={{ duration: card.iconDur || 2.5, repeat: Infinity, ease: card.iconEase || "easeInOut" }}
                  >
                    <span className="text-[10px]">{card.icon}</span>
                  </motion.div>
                </div>
              </div>

              {/* Animated number */}
              <AnimatedNumber value={card.value} suffix={card.suffix} duration={card.duration} color={card.color} />

              {/* Orange bottom line for second card */}
              {card.hasLine && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, #E85600, transparent)" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative w-full py-16 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <Reveal variants={fadeLeft} className="flex flex-col gap-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Our Stats</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white">Join The CRYPS Community Of Millions</h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">A simple, fast, and secure platform to manage your cryptocurrencies in just a few steps.</p>
            <div className="flex items-center gap-4 mt-2">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                JOIN CRYPS NOW <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[rgb(14,15,17)]"
                      style={{ background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 10%, ${30 + i * 10}%), hsl(${i * 40 + 200}, 10%, ${50 + i * 8}%))` }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    />
                  ))}
                </div>
                <motion.span
                  className="ml-3 text-sm font-semibold text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                >
                  8M
                </motion.span>
              </div>
            </div>
          </Reveal>

          {/* Right - Staggered slide-in cards, fully visible */}
          <StatsCards />
        </div>
      </div>
    </section>
  );
}
