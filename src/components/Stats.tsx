"use client";

import { useRef } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { Reveal, fadeLeft } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

/* ── Exact Cryps color tokens from Framer MCP ── */
const COLORS = {
  lightBlack: "rgb(14, 15, 17)",
  preHeader: "rgb(25, 27, 31)",
  lightOutline: "rgba(255, 255, 255, 0.03)",
  outline: "rgb(41, 42, 43)",
  orange: "rgb(232, 86, 0)",
  purple: "rgb(152, 151, 255)",
  gradientOutline: "rgb(255, 142, 104)",
  green: "rgb(183, 233, 50)",
};

/* ── Offer explanation cards — exact Cryps Stat Card structure ── */
const stats = [
  {
    label: "WHAT WE BUILD",
    badge: "THE SYSTEM",
    bigNumber: "6 Agents",
    headline: "AI-orchestrated GTM systems for post-funding B2B founders.",
    description: "Signals, outreach, CRM, and reporting working as one connected system. Not another tool. A system you own.",
    accentColor: COLORS.purple,
    glowImage: `linear-gradient(23deg, transparent 30%, rgba(152, 151, 255, 0.18) 60%, rgba(152, 151, 255, 0.08) 80%, transparent 100%)`,
  },
  {
    label: "WHAT HAPPENS",
    badge: "OUTCOMES",
    bigNumber: "24/7",
    headline: "Buying signals caught. Outreach triggered. CRM updated. Pipeline moving.",
    description: "Your agents find warm leads, write contextual outreach, update your CRM, and alert your team. Every day, without you touching it.",
    accentColor: COLORS.orange,
    glowImage: `linear-gradient(23deg, transparent 30%, rgba(232, 86, 0, 0.22) 60%, rgba(255, 142, 104, 0.08) 80%, transparent 100%)`,
  },
  {
    label: "WHAT YOU GET",
    badge: "90 DAYS",
    bigNumber: "90 Days",
    headline: "Built on your stack, documented, and handed over permanently.",
    description: "No subscriptions. No retainers. No vendor lock-in. You own the agents, the workflows, and the IP.",
    accentColor: "rgba(200, 195, 185, 0.6)",
    glowImage: `linear-gradient(23deg, transparent 30%, rgba(200, 195, 185, 0.08) 60%, rgba(200, 195, 185, 0.03) 80%, transparent 100%)`,
  },
];

/* ── Context7 scroll-driven card — each tracks its own scroll, slides from LEFT ── */
function ScrollStatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Per-element scroll tracking — Context7 useScroll pattern */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end 0.75"],
  });

  /* Scroll-driven transforms: slide from LEFT + fade + scale */
  const rawX = useTransform(scrollYProgress, [0, 1], [-(100 + index * 30), 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.2, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  /* Spring-smoothed for natural physics — Context7 useSpring pattern */
  const x = useSpring(rawX, { stiffness: 100, damping: 22, mass: 0.7 });
  const opacity = useSpring(rawOpacity, { stiffness: 180, damping: 28 });
  const scale = useSpring(rawScale, { stiffness: 180, damping: 24 });

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity, scale, transformPerspective: 1200 }}
      whileHover={{
        y: -4,
        scale: 1.012,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* Outer shell — exact Cryps: 42px radius, 8px padding, 0.93px border */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 42,
          padding: 8,
          border: `0.93px solid ${COLORS.lightOutline}`,
          backgroundColor: COLORS.lightBlack,
        }}
      >
        {/* Inner card — exact Cryps: 34px radius, 36px padding, Pre-header bg */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 34,
            padding: 36,
            backgroundColor: COLORS.preHeader,
          }}
        >
          {/* Glow overlay — 23deg rotated like Cryps Mask element */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: stat.glowImage }}
          />

          {/* Animated bottom glow line */}
          <motion.div
            className="absolute bottom-0 left-[8%] right-[8%] h-px rounded-full z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${stat.accentColor}, transparent)`,
            }}
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          />

          <div className="relative z-[1] flex flex-col" style={{ gap: 12 }}>
            {/* Label + Badge row — exact Cryps: space-between, 14px Inter-Medium uppercase */}
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "140%",
                  textTransform: "uppercase",
                  color: stat.accentColor,
                }}
              >
                {stat.label}
              </span>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "140%",
                    textTransform: "uppercase",
                    color: stat.accentColor,
                  }}
                >
                  {stat.badge}
                </span>
                {/* Badge icon — exact Cryps: 24x24 circle, Light Outline bg */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 20,
                    backgroundColor: COLORS.lightOutline,
                    border: `1px solid ${COLORS.lightOutline}`,
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: stat.accentColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Big number — exact Cryps H3 Big Text: 90px Inter-Medium, -2px letter-spacing */}
            <motion.p
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(52px, 7.5vw, 90px)",
                fontWeight: 500,
                lineHeight: "100%",
                letterSpacing: "-2px",
                color: stat.accentColor,
                whiteSpace: "nowrap",
              }}
            >
              {stat.bigNumber}
            </motion.p>

            {/* Card content */}
            <div className="flex flex-col" style={{ gap: 8, marginTop: 8 }}>
              <p
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: 17,
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.3px",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {stat.headline}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: 14,
                  lineHeight: "155%",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Avatar stack ── */
const avatarColors = ["#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE", "#9897FF"];

export default function Stats() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Smooth spring-damped parallax — Context7 useSpring pattern */
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useSpring(rawY, { stiffness: 80, damping: 30, mass: 0.5 });

  /* Scroll-linked left column opacity */
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <section ref={sectionRef} id="stats" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-14 items-start">
          {/* LEFT — scroll-linked opacity */}
          <motion.div style={{ opacity: leftOpacity }}>
            <Reveal variants={fadeLeft} className="flex flex-col gap-6 lg:sticky lg:top-32">
              <div
                className="relative inline-flex items-center gap-2 w-fit"
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  backgroundColor: COLORS.preHeader,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  What We Do
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 500,
                  lineHeight: "110%",
                  letterSpacing: "-2px",
                  color: "white",
                }}
              >
                One System. Six Agents. Yours.
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: 16,
                  lineHeight: "150%",
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: 400,
                }}
              >
                We don&apos;t sell software. We build your AI GTM engine, connect it to your stack, and hand it over.
              </p>

              <div className="flex items-center gap-5 mt-2">
                <motion.a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent-orange text-white hover:brightness-110 transition-all"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 100,
                    fontFamily: "var(--font-family-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  BOOK A CALL WITH DANNY
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {avatarColors.map((color, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[rgb(14,15,17)]" style={{ background: color }} />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-[rgba(255,255,255,0.5)] font-medium">8M</span>
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* RIGHT — Cards with spring parallax + scroll-driven slide from left */}
          <motion.div
            style={{ y: rightY }}
            className="flex flex-col gap-4"
          >
            {stats.map((stat, i) => (
              <ScrollStatCard key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
