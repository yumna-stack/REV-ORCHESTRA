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

const fomoQuotes = [
  { text: "Our AI SDR sends 10x the emails with the same bad reply rates. We just burn through prospects faster.", src: "r/sales thread, 2025" },
  { text: "I have Clay, Instantly, HubSpot, and Apollo. None of them know what the others are doing. My CRM is a lie.", src: "Founder community, Q1 2026" },
  { text: "We deployed an AI SDR without fixing our playbook first. Two months later we had no pipeline and a scorched list.", src: "SaaStr, Feb 2026" },
  { text: "Outbound isn't dead. Volume based, untriggered, one size fits all outbound is dead. There's a difference.", src: "GTM community thread" },
  { text: "I visited a team recently and asked to see their spam folder. The amount of garbage in there was shocking.", src: "Sales leader, Amplemarket webinar 2025" },
];

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
                    className="text-accent-orange italic inline-block relative"
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
                    <motion.span key={agentActions[actionIdx]} initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(4px)" }} transition={{ duration: 0.35, ease }} className="text-base text-accent-orange font-medium italic">
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
              className="flex flex-col items-center gap-7 max-w-[800px]"
            >
              <h1 className="text-[clamp(42px,6vw,80px)] font-medium leading-[100%] tracking-[-3px] text-[var(--text)]" style={{ fontFamily: "var(--font-family-heading)" }}>
                Don&apos;t do GTM like it&apos;s 2024.
              </h1>
              <p className="text-xl text-accent-orange font-semibold">The gap is already opening. Your competition is on the other side of it.</p>

              <div className="text-left space-y-5 text-[15px] text-[var(--text-dim)] leading-[170%]">
                <p>In 2024, cold outbound got 1.2% reply rates. Today, signal led outbound, outreach triggered by real buying signals, personalised to the account, gets 8 to 12%. That&apos;s not a marginal improvement. That&apos;s a different category of result.</p>
                <p>In 2024, most teams had 5 to 6 disconnected tools and called it a stack. In 2026, Gartner estimates 70% of B2B companies will be running AI orchestrated GTM motions. The ones who switched early are compounding their advantage every month.</p>
                <p>In 2024, AI was a writing tool. In 2025, it became an operator. In 2026, the teams with AI orchestration systems aren&apos;t just more efficient, they&apos;re reaching the right buyer in the right window, with the right message, automatically.</p>
                <p className="text-[var(--text)] font-medium">The question isn&apos;t whether to make this shift. It already happened. The question is whether you make it now or later, and what that gap costs you in pipeline.</p>
              </div>

              {/* Reddit quotes */}
              <div className="w-full pt-4">
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider mb-4 text-center">What founders are saying right now</p>
                <div className="space-y-3">
                  {fomoQuotes.map((q, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, ease }} className="border-l-2 border-accent-orange pl-4 py-2">
                      <p className="text-sm text-[var(--text-dim)] italic">&ldquo;{q.text}&rdquo;</p>
                      <p className="text-[10px] text-[var(--text-dim)] mt-1">{q.src}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FOMO CTA */}
              <div className="text-center pt-4">
                <p className="text-[var(--text-dim)] text-sm mb-2">The founders who built their system in Q1 are already booking calls from it.</p>
                <p className="text-accent-orange font-semibold text-sm mb-6">4 seats left for Q2 2026. Build yours before the window closes.</p>
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
