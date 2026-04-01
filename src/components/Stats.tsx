"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useScroll,
} from "framer-motion";
import { Reveal, fadeLeft } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

/* ── Animated Counter ── */
function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className="inline">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ── Stat card data — Cryps colors + original market research content ── */
const stats = [
  {
    label: "CONVERSION RATE",
    badge: "LANDBASE 2026",
    badgeIcon: "circle",
    animValue: 7,
    animPrefix: "4\u2013",
    animSuffix: "\u00D7",
    headline: "higher conversions for AI-native GTM teams vs. traditional outbound",
    source: "Source: Landbase, 2026. Companies using agentic, signal-led AI see 4-7x conversion rates vs. batch-and-blast outbound.",
    color: "#9897FF",
    glow: "rgba(152,151,255,0.15)",
    glowMid: "rgba(152,151,255,0.06)",
    lineColor: "#9897FF",
  },
  {
    label: "B2B ADOPTION",
    badge: "GARTNER 2025",
    badgeIcon: "square",
    animValue: 70,
    animPrefix: "",
    animSuffix: "%",
    headline: "of B2B companies adopting AI-driven GTM by end of 2026",
    source: "Source: Gartner, 2025. The window to build early is now. The 30% not doing it yet are the ones still on the 2024 playbook.",
    color: "#E8650A",
    glow: "rgba(232,101,10,0.25)",
    glowMid: "rgba(232,101,10,0.10)",
    lineColor: "#E8650A",
  },
  {
    label: "MARKET SIZE",
    badge: "32.9% CAGR",
    badgeIcon: "gear",
    animValue: 240,
    animPrefix: "$58B \u2192 $",
    animSuffix: "B",
    headline: "AI GTM market growing to $240B by 2030",
    source: "This is not a niche category. This is the new infrastructure of B2B growth.",
    color: "#E8650A",
    glow: "rgba(232,101,10,0.10)",
    glowMid: "rgba(232,101,10,0.04)",
    lineColor: "rgba(232,101,10,0.4)",
  },
];

/* ── Badge icon component ── */
function BadgeIcon({ type, color }: { type: string; color: string }) {
  if (type === "circle") return <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" stroke={color} strokeWidth="1.5" fill="none" /><circle cx="5" cy="5" r="1.5" fill={color} /></svg>;
  if (type === "square") return <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" rx="2" fill={color} /></svg>;
  return <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" stroke={color} strokeWidth="1" fill="none" /><path d="M3 5h4M5 3v4" stroke={color} strokeWidth="1" strokeLinecap="round" /></svg>;
}

/* ── Card slide variants — alternating left/right per Context7 dynamic variants ── */
const cardSlideVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -120 : 120,
    rotateY: i % 2 === 0 ? 8 : -8,
    scale: 0.92,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

/* ── Glassmorphic stat card — Cryps screenshot style + sideways slide ── */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardSlideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease, delay: index * 0.15 }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.25 } }}
      style={{ transformPerspective: 1200 }}
    >
      {/* Outer shell */}
      <div className="rounded-[24px] p-[4px] border border-[rgba(255,255,255,0.04)]">
        {/* Inner card */}
        <div className="relative rounded-[20px] bg-[rgb(18,19,22)] border border-[rgb(38,39,42)] overflow-hidden">
          {/* Colored glow — right side, strong like Cryps */}
          <div
            className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0"
            style={{
              background: `radial-gradient(ellipse 90% 80% at 100% 50%, ${stat.glow} 0%, ${stat.glowMid} 40%, transparent 70%)`,
            }}
          />
          {/* Animated bottom glow line */}
          <motion.div
            className="absolute bottom-0 left-[8%] right-[8%] h-[2px] rounded-full z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${stat.lineColor}, transparent)`,
            }}
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          />

          <div className="relative z-[1] px-7 pt-5 pb-6">
            {/* Top row: label + badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.18em] font-medium">
                {stat.label}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] text-[rgba(255,255,255,0.35)] font-medium tracking-wider">
                {stat.badge}
                <BadgeIcon type={stat.badgeIcon} color={stat.color} />
              </span>
            </div>

            {/* Big animated number — large like Cryps */}
            <motion.div
              className="text-[clamp(40px,6vw,60px)] font-medium leading-[1] tracking-[-2px] mb-3 whitespace-nowrap"
              style={{ fontFamily: "var(--font-family-heading)", color: stat.color }}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease, delay: index * 0.12 + 0.1 }}
            >
              <AnimatedNumber
                value={stat.animValue}
                prefix={stat.animPrefix}
                suffix={stat.animSuffix}
                duration={2 + index * 0.3}
              />
            </motion.div>

            {/* Headline */}
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[160%]">
              {stat.headline}
            </p>
            {/* Source */}
            <p className="text-[11px] text-[rgba(255,255,255,0.25)] leading-[155%] mt-2 italic">
              {stat.source}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Avatar stack — like screenshot ── */
const avatarColors = ["#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE", "#9897FF"];

export default function Stats() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rightY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="stats" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── LEFT — Title + subtitle + CTA ── */}
          <Reveal variants={fadeLeft} className="flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">
                Market Context
              </span>
            </div>

            <h2
              className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              What the Research Shows
            </h2>

            <p className="text-sm text-[rgba(255,255,255,0.35)] italic leading-relaxed max-w-[400px]">
              These are real numbers from live market research, March 2026. Use as supporting evidence.
            </p>

            <div className="flex items-center gap-5 mt-2">
              <motion.a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                BOOK A CALL WITH DANNY
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              {/* Avatar stack */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {avatarColors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[rgb(14,15,17)]"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-[rgba(255,255,255,0.5)] font-medium">8M</span>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT — Stacked glassmorphic stat cards with parallax ── */}
          <motion.div style={{ y: rightY }} className="flex flex-col gap-5">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
