"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

/* ── Agent data ── */
const agents = [
  {
    id: "signal",
    label: "Signal",
    fullLabel: "Signal Agent",
    short: "Catches buying signals the moment they appear.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h2" /><path d="M6.5 6.5l1.4 1.4" /><path d="M12 2v2" /><path d="M17.5 6.5l-1.4 1.4" /><path d="M22 12h-2" /><circle cx="12" cy="12" r="4" /><path d="M12 16v6" />
      </svg>
    ),
  },
  {
    id: "research",
    label: "Research",
    fullLabel: "Research Agent",
    short: "Builds deep account context before anyone reaches out.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "copy",
    label: "Copy",
    fullLabel: "Copy Agent",
    short: "Writes personalised messaging in your voice.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "outbound",
    label: "Outbound",
    fullLabel: "Outbound Agent",
    short: "Runs email and LinkedIn outreach automatically.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    ),
  },
  {
    id: "crm",
    label: "CRM",
    fullLabel: "CRM Agent",
    short: "Updates records and routes leads without manual work.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "monitoring",
    label: "Monitoring",
    fullLabel: "Monitoring Agent",
    short: "Watches performance and system health around the clock.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const CYCLE_MS = 3500;

/* ── Scroll-driven agent card ── */
function ScrollCard({
  agent,
  index,
  isActive,
  onHover,
}: {
  agent: (typeof agents)[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end 0.85"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [40 + index * 8, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.4, 1]);

  const y = useSpring(rawY, { stiffness: 150, damping: 28, mass: 0.5 });
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="group relative"
      onMouseEnter={onHover}
    >
      <div
        className="relative rounded-2xl px-5 py-5 transition-all duration-300"
        style={{
          backgroundColor: isActive ? "rgba(232,86,0,0.04)" : "rgba(255,255,255,0.02)",
          border: isActive
            ? "1px solid rgba(232,86,0,0.18)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-start gap-3.5">
          <div
            className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
            style={{
              backgroundColor: isActive ? "rgba(232,86,0,0.1)" : "rgba(255,255,255,0.04)",
              border: isActive
                ? "1px solid rgba(232,86,0,0.2)"
                : "1px solid rgba(255,255,255,0.06)",
              color: isActive ? "#E85600" : "rgba(255,255,255,0.4)",
            }}
          >
            {agent.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-[14px] font-medium mb-0.5 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-family-heading)",
                letterSpacing: "-0.01em",
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
              }}
            >
              {agent.fullLabel}
            </h3>
            <p
              className="text-[13px] leading-[150%] transition-colors duration-300"
              style={{
                color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
              }}
            >
              {agent.short}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Orbit Visual ── */
function OrbitVisual({ activeIndex }: { activeIndex: number }) {
  const RADIUS = 130;
  const CENTER = 170;

  return (
    <div
      className="relative mx-auto"
      style={{ width: CENTER * 2, height: CENTER * 2 }}
    >
      {/* Outer orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          top: CENTER - RADIUS,
          left: CENTER - RADIUS,
          width: RADIUS * 2,
          height: RADIUS * 2,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Inner orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          top: CENTER - 70,
          left: CENTER - 70,
          width: 140,
          height: 140,
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      />

      {/* Center hub */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: CENTER - 34,
          left: CENTER - 34,
          width: 68,
          height: 68,
        }}
      >
        <motion.div
          className="w-full h-full rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(232,86,0,0.15), rgba(232,86,0,0.05))",
            border: "1px solid rgba(232,86,0,0.2)",
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </motion.div>
        <span
          className="mt-2 whitespace-nowrap"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Command Center
        </span>
      </div>

      {/* Agent nodes */}
      {agents.map((agent, i) => {
        const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
        const x = CENTER + Math.cos(angle) * RADIUS - 20;
        const y = CENTER + Math.sin(angle) * RADIUS - 20;
        const isActive = i === activeIndex;

        return (
          <motion.div
            key={agent.id}
            className="absolute"
            style={{
              top: y,
              left: x,
              width: 40,
              height: 40,
              zIndex: isActive ? 10 : 1,
            }}
            animate={{ scale: isActive ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Connection line */}
            <svg
              className="absolute pointer-events-none"
              style={{
                top: 20,
                left: 20,
                width: 1,
                height: 1,
                overflow: "visible",
                zIndex: -1,
              }}
            >
              <motion.line
                x1="0"
                y1="0"
                x2={CENTER - x - 20}
                y2={CENTER - y - 20}
                strokeWidth="1"
                strokeDasharray="3 5"
                animate={{
                  stroke: isActive ? "rgba(232,86,0,0.3)" : "rgba(255,255,255,0.04)",
                }}
                transition={{ duration: 0.4 }}
              />
            </svg>

            {/* Active glow ring */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-[-5px] rounded-full"
                  style={{
                    border: "1px solid rgba(232,86,0,0.3)",
                    boxShadow: "0 0 16px rgba(232,86,0,0.1)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Node */}
            <motion.div
              className="w-full h-full rounded-full flex items-center justify-center"
              animate={{
                backgroundColor: isActive ? "rgba(232,86,0,0.12)" : "rgba(255,255,255,0.03)",
                borderColor: isActive ? "rgba(232,86,0,0.3)" : "rgba(255,255,255,0.06)",
              }}
              style={{
                border: "1px solid",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                animate={{
                  color: isActive ? "#E85600" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                {agent.icon}
              </motion.span>
            </motion.div>

            {/* Label */}
            <motion.span
              className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
              animate={{
                color: isActive ? "rgba(232,86,0,0.85)" : "rgba(255,255,255,0.35)",
              }}
              transition={{ duration: 0.3 }}
            >
              {agent.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Main Section ── */
export default function SixAgents() {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % agents.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, CYCLE_MS);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <section id="agents" className="relative w-full bg-[rgb(14,15,17)] overflow-hidden" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <div className="max-w-[1120px] mx-auto px-6">

        {/* ── Top: 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center" style={{ marginBottom: 72 }}>

          {/* LEFT — Text content */}
          <div className="flex flex-col" style={{ gap: 20 }}>
            {/* Section label */}
            <Reveal variants={fadeUp}>
              <div
                className="inline-flex items-center gap-2 w-fit"
                style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  backgroundColor: "rgb(25,27,31)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  Inside the System
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal variants={fadeUp}>
              <h2
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 500,
                  lineHeight: "120%",
                  letterSpacing: "-1px",
                  color: "white",
                }}
              >
                Six agents.{" "}
                <span style={{ color: "rgba(232,86,0,0.8)" }}>One command center.</span>
              </h2>
            </Reveal>

            {/* Supporting copy */}
            <Reveal variants={fadeUp}>
              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: 15,
                  lineHeight: "170%",
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: 420,
                }}
              >
                Each agent handles one part of the GTM motion: signals, research, copy, outreach, CRM, and monitoring. They hand off to each other automatically. One system, always moving pipeline forward.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal variants={fadeUp}>
              <motion.a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-orange text-white hover:brightness-110 transition-all w-fit"
                style={{
                  padding: "11px 22px",
                  borderRadius: 100,
                  fontFamily: "var(--font-family-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.04em",
                  marginTop: 4,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Call with Danny
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </Reveal>
          </div>

          {/* RIGHT — Orbit visual */}
          <Reveal variants={fadeUp}>
            <OrbitVisual activeIndex={activeIndex} />
          </Reveal>
        </div>

        {/* ── Bottom: 6 Agent Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.map((agent, i) => (
            <ScrollCard
              key={agent.id}
              agent={agent}
              index={i}
              isActive={i === activeIndex}
              onHover={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
