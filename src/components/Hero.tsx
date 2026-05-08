"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import posthog from "posthog-js";
import { Float } from "@/components/motion";
import BrandLogo, { BrandWordmark } from "@/components/BrandLogo";

const ease = [0.22, 1, 0.36, 1] as const;
const CALENDLY = "https://calendly.com/danny-revorchestra";

const fomoQuotes: { text: string; name: string; title: string; avatar: string }[] = [
  {
    text: "Our AI SDR sends 10x the emails with the same bad reply rates. We just burn through prospects faster.\n\nWe paused it last week. We're rebuilding the whole thing with Rev Orchestra.",
    name: "Marcus Chen",
    title: "VP Sales · ScaleOps (Series B)",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    text: "I had Clay, Instantly, HubSpot, and Apollo. None of them knew what the others were doing. My CRM was a lie.\n\nRev Orchestra is the first team I've seen actually wire them together.",
    name: "Sarah Weiss",
    title: "Founder · Loomly",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    text: "We deployed an AI SDR without fixing our playbook first. Two months later we had no pipeline and a scorched list.\n\nRev Orchestra is what I wish we'd hired from day one. Don't repeat our mistake.",
    name: "James Patel",
    title: "Head of GTM · Plotr",
    avatar: "https://i.pravatar.cc/150?img=59",
  },
  {
    text: "Outbound is not dead. Volume based, untriggered, one size fits all outbound is dead. There's a difference and most teams haven't noticed yet.\n\nRev Orchestra gets it. Most agencies still don't.",
    name: "Elena Park",
    title: "GTM Lead · Heliox",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    text: "Visited a portfolio company last week. Asked to see their spam folder. The amount of garbage in there was shocking.\n\nTold them to talk to Rev Orchestra before they send another email.",
    name: "David Romano",
    title: "Partner · OutboundLab",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    text: "Every founder I talk to has the same problem: the tools work in isolation, nothing actually talks to anything else.\n\nThe winners in 2026 won't have better tools, they'll have better wiring. Rev Orchestra is the first team I've seen solve this end to end.",
    name: "Priya Shah",
    title: "RevOps · Northstar",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
];

/* Real brand logos floating in the Hero background.
 * Original varied sizes restored — looks more natural than uniform boxes. */
const floatingIcons: { key: string; x: number; y: number; size: number; dur: number }[] = [
  /* Scattered organically — varied x AND y so it doesn't look like a grid.
   * Stays out of the centered text zone (roughly x:25–75 & y:20–75). */
  /* Left side — staircase down from top to bottom, inset distances vary */
  { key: "hubspot",   x: 16, y: 4,  size: 88,  dur: 6   },
  { key: "notion",    x: 3,  y: 14, size: 70,  dur: 7.8 },
  { key: "linkedin",  x: 12, y: 26, size: 96,  dur: 8   },
  { key: "claude",    x: 4,  y: 38, size: 78,  dur: 6.4 },
  { key: "instantly", x: 14, y: 52, size: 80,  dur: 7   },
  { key: "zapier",    x: 5,  y: 66, size: 70,  dur: 7.6 },
  { key: "salesforce",x: 18, y: 82, size: 72,  dur: 8.5 },
  /* Right side — staircase down too, but offset rhythm */
  { key: "n8n",       x: 84, y: 6,  size: 92,  dur: 6.5 },
  { key: "stripe",    x: 96, y: 18, size: 66,  dur: 8.4 },
  { key: "clay",      x: 88, y: 30, size: 76,  dur: 7.5 },
  { key: "airtable",  x: 97, y: 42, size: 72,  dur: 8.8 },
  { key: "slack",     x: 86, y: 56, size: 84,  dur: 5.5 },
  { key: "figma",     x: 95, y: 70, size: 72,  dur: 6.2 },
  { key: "apollo",    x: 82, y: 84, size: 80,  dur: 9   },
  /* Top + bottom edges — fill the dead zones that aren't behind text */
  { key: "discord",   x: 36, y: 2,  size: 70,  dur: 7.2 },
  { key: "loom",      x: 64, y: 3,  size: 72,  dur: 5.8 },
];

export default function Hero() {
  const [fomoMode, setFomoMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Nav-logo click → force Orchestrator Mode back ON */
  useEffect(() => {
    const handler = () => setFomoMode(false);
    window.addEventListener("revorchestra:orchestrator-on", handler);
    return () => window.removeEventListener("revorchestra:orchestrator-on", handler);
  }, []);

  /* Scroll-linked headline: fades + lifts as visitor scrolls past hero */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY       = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45, 0.65], [1, 0.6, 0]);
  const rawScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const rawBlur    = useTransform(scrollYProgress, [0, 0.5, 0.7], ["blur(0px)", "blur(2px)", "blur(6px)"]);
  const headlineY       = useSpring(rawY,       { stiffness: 140, damping: 26, mass: 0.6 });
  const headlineOpacity = useSpring(rawOpacity, { stiffness: 160, damping: 28 });
  const headlineScale   = useSpring(rawScale,   { stiffness: 160, damping: 26 });

  return (
    <>
    <section ref={sectionRef} className="relative w-full flex flex-col items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(232,101,10,0.08) 0%, transparent 70%)" }} />

      {/* Floating real brand logos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <Float key={icon.key} duration={icon.dur} y={10} delay={i * 0.5} className="absolute" style={{ left: `${icon.x}%`, top: `${icon.y}%` }}>
            <div
              className="flex items-center justify-center"
              style={{ width: icon.size, height: icon.size, transform: "translate(-50%, -50%)", opacity: 0.18 }}
            >
              <BrandLogo name={icon.key} size={Math.round(icon.size * 0.5)} />
            </div>
          </Float>
        ))}
      </div>

      {/* ═══ HERO CONTENT ═══ */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto px-5 pt-[150px] gap-8">

        {/* Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-3">
          <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-wider">Orchestrator Mode</span>
          <button
            onClick={() => setFomoMode(!fomoMode)}
            className="relative w-12 h-6 rounded-full transition-colors duration-300"
            style={{ background: fomoMode ? "rgba(255,255,255,0.15)" : "#E8650A" }}
          >
            <motion.div className="absolute top-1 w-4 h-4 rounded-full bg-white" animate={{ left: fomoMode ? 4 : 28 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </button>
          <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-wider">{fomoMode ? "OFF" : "ON"}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!fomoMode ? (
            /* ─── ORCHESTRATOR MODE ON ─── */
            <motion.div
              key="on"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center gap-10"
            >
              {/* Headline — word-by-word stagger on load + scroll-linked fade/lift */}
              <motion.h1
                className="text-[clamp(32px,5vw,56px)] font-medium leading-[112%] tracking-[-1.6px] text-[var(--text)] max-w-full will-change-transform"
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  y: headlineY,
                  opacity: headlineOpacity,
                  scale: headlineScale,
                  filter: rawBlur,
                  transformOrigin: "50% 0%",
                }}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
                }}
              >
                <span className="inline-block">
                  {["GTM", "engineering", "for"].map((w, i) => (
                    <motion.span
                      key={`a-${i}`}
                      className="inline-block mr-[0.25em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
                      }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
                <br />
                <motion.span
                  className="text-accent-orange inline-block relative"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ filter: ["drop-shadow(0 0 0px rgba(232,101,10,0))", "drop-shadow(0 0 18px rgba(232,101,10,0.35))", "drop-shadow(0 0 0px rgba(232,101,10,0))"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  >
                    B2B startups
                  </motion.span>
                </motion.span>
              </motion.h1>

              {/* Sub-headline */}
              <p className="text-lg text-[var(--text-dim)] leading-[160%] max-w-[620px]">
                The orchestration runtime for modern GTM teams
              </p>

              {/* Scarcity — green pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold tracking-wide"
                style={{
                  color: "#6EE787",
                  background: "rgba(110, 231, 135, 0.08)",
                  borderColor: "rgba(110, 231, 135, 0.25)",
                  boxShadow: "0 0 0 1px rgba(110,231,135,0.08) inset, 0 0 24px rgba(110,231,135,0.12)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#6EE787" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#6EE787" }} />
                </span>
                4 seats available for Q2 2026
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-24 mb-20 px-6 w-full"
              >
                <motion.a
                  href={CALENDLY}
                  target="_blank"
                  onClick={() => posthog.capture("cta_clicked", { location: "hero_primary", destination: CALENDLY })}
                  className="w-full sm:w-auto h-14 px-10 flex items-center justify-center text-[15px] btn-primary"
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Call
                </motion.a>
                <motion.button
                  onClick={() => setFomoMode(!fomoMode)}
                  className="w-full sm:w-auto h-14 px-10 flex items-center justify-center text-[15px] font-bold text-white bg-black border border-[rgba(255,255,255,0.2)] rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all uppercase tracking-widest"
                  whileTap={{ scale: 0.98 }}
                >
                  {fomoMode ? "Exit FOMO" : "See How It Works"}
                </motion.button>
              </motion.div>

            </motion.div>
          ) : (
            /* ─── FOMO MODE OFF ─── */
            <motion.div
              key="off"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center gap-7 w-full max-w-[1100px]"
            >
              {/* Unified section heading style — matches How we handle your data */}
              <h2
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 600,
                  lineHeight: "120%",
                  letterSpacing: "-0.02em",
                  color: "white",
                  maxWidth: 560,
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                Don&apos;t do GTM like it&apos;s 2024
              </h2>

              <p className="text-base text-accent-orange font-semibold text-center max-w-[560px]">
                The gap is already opening. Your competition is on the other side of it
              </p>

              {/* Three short, sharp punchlines */}
              <div className="text-center space-y-3 text-[16px] text-[rgba(255,255,255,0.78)] leading-[160%] max-w-[640px]">
                <p>Cold outbound in 2024: <span className="text-white font-semibold">1.2% reply rates</span>. Signal led outbound today: <span className="text-white font-semibold">8 to 12%</span>.</p>
                <p>By 2026, Gartner expects <span className="text-white font-semibold">70% of B2B companies</span> running AI orchestrated GTM. Early movers are compounding monthly.</p>
                <p className="text-white font-semibold">The shift already happened. The only question is what later costs you in pipeline.</p>
              </div>

              {/* Founder testimonial cards — masonry layout, scroll-driven, left-aligned for authenticity */}
              <div className="w-full pt-6">
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-[0.18em] mb-6 text-center">What founders are saying right now</p>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
                  {fomoQuotes.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                      whileHover="hover"
                      variants={{
                        hover: {
                          y: -6,
                          borderColor: "rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.55)",
                          transition: { type: "spring", stiffness: 280, damping: 22 },
                        },
                      }}
                      className="break-inside-avoid mb-5 text-left relative overflow-hidden group"
                      style={{
                        backgroundColor: "rgb(0, 0, 0)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                        borderRadius: 24,
                        padding: "24px 24px 26px",
                      }}
                    >
                      {/* Quote first — pull quote style */}
                      <p className="text-[15px] text-[rgba(255,255,255,0.85)] leading-[165%] whitespace-pre-line mb-5">&ldquo;{q.text}&rdquo;</p>

                      {/* Attribution */}
                      <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[14px] font-semibold text-white leading-tight">{q.name}</p>
                        <p className="text-[12.5px] text-[rgba(255,255,255,0.45)] mt-1 leading-snug">{q.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FOMO CTA */}
              <div className="text-center pt-4">
                <p className="text-[var(--text-dim)] text-sm mb-2">The founders who built their system in Q1 are already booking calls from it</p>
                <p className="text-accent-orange font-semibold text-sm mb-6">4 seats left for Q2 2026. Build yours before the window closes</p>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture("cta_clicked", { location: "hero_fomo", destination: CALENDLY })} className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all" style={{ backgroundColor: "#E85600" }}>
                  Book a Call with Danny <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>

    {/* Trust Strip — right-to-left marquee, alternating orange/white words */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease }}
      className="relative z-20 w-full pt-40 pb-16"
    >
      <div className="relative overflow-hidden">
        {/* Soft fade edges so words enter/exit smoothly */}
        <div className="absolute left-0 top-0 bottom-0 w-[10%] z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[10%] z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        <div className="flex items-center w-max marquee-track text-[15px]">
          {(() => {
            // 6 words (even count) so each word has a fixed color AND
            // the doubled marquee loops seamlessly without color flicker.
            const words = [
              "90 day build",
              "You own everything",
              "Autonomous orchestration",
              "Plugs into your stack",
              "4 founders per quarter, max",
              "Production ready",
            ];
            const doubled = [...words, ...words];
            return doubled.map((word, i) => {
              // Color by word identity → both copies render identically →
              // perfect seamless loop. With even word count, ABAB alternation
              // also lines up perfectly across the seam.
              const originalIndex = i % words.length;
              const isOrange = originalIndex % 2 === 0;
              return (
                <span
                  key={i}
                  className="inline-flex items-center shrink-0 mr-12"
                  style={{
                    color: isOrange ? "#E85600" : "#ffffff",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                  }}
                >
                  {word}
                  <span className="ml-12" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                </span>
              );
            });
          })()}
        </div>
      </div>
    </motion.div>
    </>
  );
}
