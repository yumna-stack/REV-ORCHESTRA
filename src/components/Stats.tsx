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
import { Reveal, fadeUp, fadeLeft } from "@/components/motion";

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

/* ── Market Context data matching the user's screenshot exactly ── */
const stats = [
  {
    display: "4\u20137\u00D7", // 4–7×
    animValue: 7,
    animPrefix: "4\u2013",
    animSuffix: "\u00D7",
    headline: "higher conversions for AI-native GTM teams vs. traditional outbound",
    source: "Source: Landbase, 2026. Companies using agentic, signal-led AI see 4-7x conversion rates vs. batch-and-blast outbound.",
  },
  {
    display: "70%",
    animValue: 70,
    animPrefix: "",
    animSuffix: "%",
    headline: "of B2B companies adopting AI-driven GTM by end of 2026",
    source: "Source: Gartner, 2025. The window to build early is now. The 30% not doing it yet are the ones still on the 2024 playbook.",
  },
  {
    display: "$58B \u2192 $240B", // $58B → $240B
    animValue: 240,
    animPrefix: "$58B \u2192 $",
    animSuffix: "B",
    headline: "AI GTM market growing to $240B by 2030 (32.9% CAGR)",
    source: "This is not a niche category. This is the new infrastructure of B2B growth.",
  },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax Y for the right column
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

            <div className="flex items-center gap-4 mt-2">
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
            </div>
          </Reveal>

          {/* ── RIGHT — Market stats, vertical list with scroll parallax ── */}
          <motion.div style={{ y: rightY }} className="flex flex-col">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className={`py-8 ${i < stats.length - 1 ? "border-b border-[rgba(255,255,255,0.06)]" : ""}`}
                initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              >
                {/* Big orange number */}
                <motion.div
                  className="text-[clamp(48px,7vw,80px)] font-medium leading-none tracking-[-3px] text-accent-orange mb-3"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.15 + 0.1 }}
                >
                  <AnimatedNumber
                    value={stat.animValue}
                    prefix={stat.animPrefix}
                    suffix={stat.animSuffix}
                    duration={2 + i * 0.3}
                  />
                </motion.div>

                {/* Bold headline */}
                <motion.p
                  className="text-base md:text-lg font-semibold text-white leading-[140%] mb-2"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15 + 0.25, duration: 0.5 }}
                >
                  {stat.headline}
                </motion.p>

                {/* Source / description — grey italic */}
                <motion.p
                  className="text-sm text-[rgba(255,255,255,0.3)] italic leading-[160%]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15 + 0.35, duration: 0.5 }}
                >
                  {stat.source}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
