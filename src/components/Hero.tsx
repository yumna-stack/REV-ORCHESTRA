"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Float } from "@/components/motion";
import BrandLogo, { BrandWordmark } from "@/components/BrandLogo";

const ease = [0.22, 1, 0.36, 1] as const;
const CALENDLY = "https://calendly.com/danny-revorchestra";

const toolLogos: { name: string; key: string }[] = [
  { name: "Clay", key: "clay" },
  { name: "Instantly", key: "instantly" },
  { name: "HubSpot", key: "hubspot" },
  { name: "Slack", key: "slack" },
  { name: "n8n", key: "n8n" },
  { name: "LinkedIn", key: "linkedin" },
  { name: "Apollo", key: "apollo" },
  { name: "HeyReach", key: "heyreach" },
  { name: "Smartlead", key: "smartlead" },
];
const agentActions = [
  "finding warm leads",
  "writing personalised outreach",
  "updating your CRM",
  "monitoring buying signals",
  "briefing your reps",
  "watching your pipeline",
];

type Platform = "linkedin" | "x" | "reddit" | "podcast";
const fomoQuotes: { text: string; name: string; title: string; avatar: string; platform: Platform; when: string; verified?: boolean }[] = [
  {
    text: "Our AI SDR sends 10x the emails with the same bad reply rates. We just burn through prospects faster.\n\nWe paused it last week. Going back to manual until we figure out signal triggers.",
    name: "Marcus Chen",
    title: "VP Sales · ScaleOps (Series B)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    platform: "linkedin",
    when: "3d",
    verified: true,
  },
  {
    text: "I have Clay, Instantly, HubSpot, and Apollo. None of them know what the others are doing. My CRM is a lie.",
    name: "Sarah Weiss",
    title: "Founder · Loomly",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    platform: "x",
    when: "1w",
  },
  {
    text: "We deployed an AI SDR without fixing our playbook first. Two months later we had no pipeline and a scorched list. Don't repeat our mistake.",
    name: "James Patel",
    title: "Head of GTM · Plotr",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    platform: "linkedin",
    when: "2d",
    verified: true,
  },
  {
    text: "Outbound is not dead. Volume based, untriggered, one size fits all outbound is dead. There's a difference and most teams haven't noticed yet.",
    name: "Elena Park",
    title: "GTM Lead · Heliox",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    platform: "linkedin",
    when: "5d",
    verified: true,
  },
  {
    text: "Visited a portfolio company last week. Asked to see their spam folder. The amount of garbage in there was shocking.",
    name: "David Romano",
    title: "Partner · OutboundLab",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    platform: "x",
    when: "12h",
  },
  {
    text: "Every founder I talk to has the same problem: the tools work in isolation, but nothing actually talks to anything else.\n\nThe winners in 2026 won't have better tools, they'll have better wiring between them.",
    name: "Priya Shah",
    title: "RevOps · Northstar",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    platform: "linkedin",
    when: "6d",
    verified: true,
  },
];

/* Platform glyphs — small monochrome icons used in the testimonial card footer. */
const PlatformIcon = ({ p }: { p: Platform }) => {
  const props = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "currentColor" };
  if (p === "linkedin") return <svg {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>;
  if (p === "x") return <svg {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
  if (p === "reddit") return <svg {...props}><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>;
  return <svg {...props}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm7 11a7 7 0 01-14 0H3a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12h-2z" /></svg>;
};

/* Real brand logos floating in the Hero background.
 * Original varied sizes restored — looks more natural than uniform boxes. */
const floatingIcons: { key: string; x: number; y: number; size: number; dur: number }[] = [
  { key: "hubspot",   x: 8,  y: 18, size: 44, dur: 6   },
  { key: "instantly", x: 4,  y: 42, size: 40, dur: 7   },
  { key: "linkedin",  x: 10, y: 68, size: 48, dur: 8   },
  { key: "slack",     x: 88, y: 15, size: 42, dur: 5.5 },
  { key: "clay",      x: 92, y: 40, size: 38, dur: 7.5 },
  { key: "n8n",       x: 90, y: 65, size: 46, dur: 6.5 },
  { key: "salesforce",x: 2,  y: 82, size: 36, dur: 8.5 },
  { key: "apollo",    x: 86, y: 82, size: 40, dur: 9   },
];

export default function Hero() {
  const [toolIdx, setToolIdx] = useState(0);
  const [actionIdx, setActionIdx] = useState(0);
  const [fomoMode, setFomoMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const t2 = setInterval(() => setToolIdx((i) => (i + 1) % toolLogos.length), 2500);
    const t3 = setInterval(() => setActionIdx((i) => (i + 1) % agentActions.length), 3200);
    return () => { clearInterval(t2); clearInterval(t3); };
  }, []);

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
              style={{ width: icon.size, height: icon.size, transform: "translate(-50%, -50%)", opacity: 0.08 }}
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
              className="flex flex-col items-center gap-7"
            >
              {/* Headline — word-by-word stagger on load + scroll-linked fade/lift */}
              <motion.h1
                className="text-[clamp(28px,4vw,44px)] font-medium leading-[115%] tracking-[-1.5px] text-[var(--text)] max-w-none will-change-transform"
                style={{
                  fontFamily: "var(--font-family-heading)",
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
                <span className="whitespace-nowrap inline-block">
                  {["GTM", "Orchestration", "&"].map((w, i) => (
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
                      Revenue Engines
                    </motion.span>
                  </motion.span>
                </span>
                <br />
                {["for", "B2B", "Founders"].map((w, i) => (
                  <motion.span
                    key={`b-${i}`}
                    className="inline-block mr-[0.25em]"
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Sub-headline */}
              <p className="text-lg text-[var(--text-dim)] leading-[160%] max-w-[620px]">
                Custom AI agents running your GTM directly inside your stack. Not a tool. Not a retainer. Yours permanently in 90 days.
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
                4 seats available for Q3 2026
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all" style={{ backgroundColor: "#E85600" }}>
                  Book a Call with Danny <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="#how-it-works" className="inline-flex items-center gap-2 px-8 py-4 text-[var(--text)] text-sm font-medium uppercase tracking-wider rounded-full border border-[var(--border-strong)] hover:opacity-80 transition-all">
                  See How It Works <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[var(--text-dim)]">
                <span>90 day build</span><span className="text-[var(--border-strong)]">·</span><span>You own everything</span><span className="text-[var(--border-strong)]">·</span><span>Autonomous orchestration</span><span className="text-[var(--border-strong)]">·</span><span>Plugs into your stack</span><span className="text-[var(--border-strong)]">·</span><span>4 founders per quarter, max</span>
              </div>

              {/* ─── Rotating Tool Logos (SiteFire-style) ─── */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <p className="text-[var(--text-dim)] text-sm">We&apos;re building GTM systems connected to</p>
                <div className="h-[32px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={toolLogos[toolIdx].key}
                      initial={{ opacity: 0, y: 16, filter: "blur(6px)", scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, y: -16, filter: "blur(6px)", scale: 0.9 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <BrandWordmark name={toolLogos[toolIdx].key} height={22} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ─── Rotating Agent Actions ─── */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[var(--text-dim)] text-xs">Right now, our agents are</p>
                <div className="h-[28px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span key={agentActions[actionIdx]} initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(4px)" }} transition={{ duration: 0.35, ease }} className="text-base text-accent-orange font-medium">
                      {agentActions[actionIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
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
                  fontWeight: 500,
                  lineHeight: "120%",
                  letterSpacing: "-1.2px",
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
              <div className="text-center space-y-3 text-[15px] text-[var(--text-dim)] leading-[160%] max-w-[640px]">
                <p>Cold outbound in 2024: <span className="text-white font-medium">1.2% reply rates</span>. Signal led outbound today: <span className="text-white font-medium">8 to 12%</span>.</p>
                <p>By 2026, Gartner expects <span className="text-white font-medium">70% of B2B companies</span> running AI orchestrated GTM. Early movers are compounding monthly.</p>
                <p className="text-[var(--text)] font-medium">The shift already happened. The only question is what later costs you in pipeline.</p>
              </div>

              {/* Founder testimonial cards — masonry layout, scroll-driven, left-aligned for authenticity */}
              <div className="w-full pt-6">
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-[0.18em] mb-6 text-center">What founders are saying right now</p>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
                  {fomoQuotes.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                      whileHover={{ y: -4, transition: { type: "spring", stiffness: 320, damping: 22 } }}
                      className="break-inside-avoid mb-4 text-left"
                      style={{
                        backgroundColor: "rgb(8,8,10)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        padding: 20,
                      }}
                    >
                      {/* Header: avatar + name + title + platform glyph */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={q.avatar}
                          alt={q.name}
                          width={44}
                          height={44}
                          className="rounded-full shrink-0 object-cover"
                          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <p className="text-[14px] font-semibold text-white leading-tight truncate">{q.name}</p>
                            {q.verified && (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="#1d9bf0" className="shrink-0">
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.917 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.295 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                              </svg>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-dim)] truncate">{q.title}</p>
                        </div>
                      </div>

                      {/* Body — preserves \n line breaks for natural posting feel */}
                      <p className="text-[14px] text-[rgba(255,255,255,0.82)] leading-[160%] whitespace-pre-line">{q.text}</p>

                      {/* Footer: platform + relative time */}
                      <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
                        <PlatformIcon p={q.platform} />
                        <span className="text-[10px] uppercase tracking-wider">{q.platform === "x" ? "X" : q.platform}</span>
                        <span className="text-[10px]">·</span>
                        <span className="text-[10px]">{q.when}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FOMO CTA */}
              <div className="text-center pt-4">
                <p className="text-[var(--text-dim)] text-sm mb-2">The founders who built their system in Q1 are already booking calls from it</p>
                <p className="text-accent-orange font-semibold text-sm mb-6">4 seats left for Q2 2026. Build yours before the window closes</p>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all" style={{ backgroundColor: "#E85600" }}>
                  Book a Call with Danny <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vimeo video */}
      <motion.div
        className="relative z-10 w-full max-w-[1080px] mx-auto px-5 mt-12"
        initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease, delay: 0.6 }}
      >
        <div className="relative rounded-lg overflow-hidden border border-[var(--border)] bg-[rgb(8,8,10)]" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://player.vimeo.com/video/1157150585?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Rev Orchestra Command Center"
          />
        </div>
      </motion.div>
    </section>

    {/* Warm amber gradient glow zone */}
    <div className="relative w-full h-[400px] -mb-[200px] z-10 pointer-events-none overflow-visible" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 60% at 50% 10%, rgba(180, 90, 15, 0.35) 0%, rgba(140, 65, 10, 0.2) 20%, rgba(80, 35, 5, 0.08) 45%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 80% at 0% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 80% at 100% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
    </div>
    </>
  );
}
