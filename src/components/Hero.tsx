"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Float } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const cyclingWords = [
  "running orchestras",
  "using signal-led outbound",
  "getting 8-12% reply rates",
  "deploying AI agents",
  "building pipeline systems",
  "winning with precision",
];

const toolLogos = ["Clay", "Instantly", "HubSpot", "Slack", "n8n", "LinkedIn"];
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
  { text: "Outbound isn't dead. Volume-based, untriggered, one-size-fits-all outbound is dead. There's a difference.", src: "GTM community thread" },
  { text: "I visited a team recently and asked to see their spam folder. The amount of garbage in there was shocking.", src: "Sales leader, Amplemarket webinar 2025" },
];

const floatingIcons = [
  { svg: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", x: 8, y: 18, size: 72, dur: 6 },
  { svg: "M13 10V3L4 14h7v7l9-11h-7z", x: 4, y: 42, size: 64, dur: 7 },
  { svg: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", x: 10, y: 68, size: 80, dur: 8 },
  { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", x: 88, y: 15, size: 68, dur: 5.5 },
  { svg: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", x: 92, y: 40, size: 60, dur: 7.5 },
  { svg: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", x: 90, y: 65, size: 76, dur: 6.5 },
  { svg: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z", x: 2, y: 82, size: 56, dur: 8.5 },
  { svg: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", x: 86, y: 82, size: 64, dur: 9 },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [, setToolIdx] = useState(0);
  const [, setActionIdx] = useState(0);
  const [fomoMode, setFomoMode] = useState(false);

  useEffect(() => {
    const t1 = setInterval(() => setWordIdx((i) => (i + 1) % cyclingWords.length), 3000);
    const t2 = setInterval(() => setToolIdx((i) => (i + 1) % toolLogos.length), 2500);
    const t3 = setInterval(() => setActionIdx((i) => (i + 1) % agentActions.length), 3200);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  return (
    <>
    <section className="relative w-full flex flex-col items-center bg-[rgb(14,15,17)] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
        WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
      }} />

      {/* Orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(232,101,10,0.08) 0%, transparent 70%)" }} />

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <Float key={i} duration={icon.dur} y={10} delay={i * 0.5} className="absolute" style={{ left: `${icon.x}%`, top: `${icon.y}%` }}>
            <div className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]" style={{ width: icon.size, height: icon.size, transform: "translate(-50%, -50%)" }}>
              <svg width={icon.size * 0.4} height={icon.size * 0.4} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={icon.svg} /></svg>
            </div>
          </Float>
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto px-5 pt-[150px] gap-8">

        {/* Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-3">
          <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">Orchestrator Mode</span>
          <button
            onClick={() => setFomoMode(!fomoMode)}
            className="relative w-12 h-6 rounded-full transition-colors duration-300"
            style={{ background: fomoMode ? "rgba(255,255,255,0.15)" : "#E8650A" }}
          >
            <motion.div className="absolute top-1 w-4 h-4 rounded-full bg-white" animate={{ left: fomoMode ? 4 : 28 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </button>
          <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{fomoMode ? "OFF" : "ON"}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!fomoMode ? (
            /* ORCHESTRATOR MODE ON */
            <motion.div
              key="on"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center gap-7"
            >
              {/* Badge */}
              <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)]">
                <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">The AI GTM System for Post-Funding B2B Founders</span>
              </div>

              {/* Headline with cycling words */}
              <h1 className="text-[clamp(36px,5.5vw,72px)] font-medium leading-[105%] tracking-[-3px] text-white max-w-[900px]" style={{ fontFamily: "var(--font-family-heading)" }}>
                You&apos;re still doing GTM like it&apos;s 2024.{" "}
                <span className="text-[rgba(255,255,255,0.5)]">The teams beating you are </span>
                <span className="relative inline-block align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span key={wordIdx} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.5, ease }} className="text-accent-orange italic inline-block">
                      {cyclingWords[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[620px]">
                Rev Orchestra builds AI-orchestrated GTM systems for B2B founders who just raised and need pipeline. Not another tool to manage, not another retainer to renew. Six AI agents, connected to your stack, running 24/7. Yours permanently in 90 days.
              </p>

              {/* Scarcity badge */}
              <motion.div
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[rgba(232,101,10,0.3)] bg-[rgba(232,101,10,0.08)]"
                animate={{ borderColor: ["rgba(232,101,10,0.3)", "rgba(232,101,10,0.6)", "rgba(232,101,10,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-accent-orange tracking-wide">
                  4 seats available for 2026
                </span>
                <span className="text-[10px] text-[rgba(255,255,255,0.35)]">· Ready to launch</span>
              </motion.div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Call with Danny <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See How It Works <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.a>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[rgba(255,255,255,0.35)]">
                <span>90-day build</span><span className="text-[rgba(255,255,255,0.15)]">·</span><span>You own everything</span><span className="text-[rgba(255,255,255,0.15)]">·</span><span>6 AI sub-agents</span><span className="text-[rgba(255,255,255,0.15)]">·</span><span>Plugs into your stack</span><span className="text-[rgba(255,255,255,0.15)]">·</span><span>4 founders per quarter, max</span>
              </div>

            </motion.div>
          ) : (
            /* FOMO MODE OFF */
            <motion.div
              key="off"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center gap-7 max-w-[800px]"
            >
              <h1 className="text-[clamp(42px,6vw,80px)] font-medium leading-[100%] tracking-[-3px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
                Don&apos;t do GTM like it&apos;s 2024.
              </h1>
              <p className="text-xl text-accent-orange font-semibold">The gap is already opening. Your competition is on the other side of it.</p>

              <div className="text-left space-y-5 text-[15px] text-[rgba(255,255,255,0.5)] leading-[170%]">
                <p>In 2024, cold outbound got 1.2% reply rates. Today, signal-led outbound gets 8-12%. That&apos;s not a marginal improvement. That&apos;s a different category of result.</p>
                <p>In 2024, most teams had 5-6 disconnected tools and called it a stack. In 2026, Gartner estimates 70% of B2B companies will be running AI-orchestrated GTM motions. The ones who switched early are compounding their advantage every month.</p>
                <p>In 2024, AI was a writing tool. In 2025, it became an operator. In 2026, the teams with AI orchestration systems aren&apos;t just more efficient. They&apos;re reaching the right buyer in the right window, with the right message, automatically.</p>
                <p className="text-white font-medium">The question isn&apos;t whether to make this shift. It already happened. The question is whether you make it now or later, and what that gap costs you in pipeline.</p>
              </div>

              {/* Reddit quotes */}
              <div className="w-full pt-4">
                <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-4 text-center">What founders are saying right now</p>
                <div className="space-y-3">
                  {fomoQuotes.map((q, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, ease }} className="border-l-2 border-accent-orange pl-4 py-2">
                      <p className="text-sm text-[rgba(255,255,255,0.5)] italic">&ldquo;{q.text}&rdquo;</p>
                      <p className="text-[10px] text-[rgba(255,255,255,0.25)] mt-1">- {q.src}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FOMO CTA */}
              <div className="text-center pt-4">
                <p className="text-[rgba(255,255,255,0.5)] text-sm mb-2">The founders who built their system in Q1 are already booking calls from it.</p>
                <p className="text-accent-orange font-semibold text-sm mb-6">4 seats left for 2026. Build yours before the window closes.</p>
                <motion.a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Call with Danny <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.a>
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
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(20,20,22,0.9)]" style={{ aspectRatio: "16/9" }}>
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
    <div className="relative w-full h-[400px] -mb-[200px] z-10 pointer-events-none overflow-visible" style={{ background: "rgb(14,15,17)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 60% at 50% 10%, rgba(180, 90, 15, 0.35) 0%, rgba(140, 65, 10, 0.2) 20%, rgba(80, 35, 5, 0.08) 45%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 80% at 0% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 80% at 100% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ background: "linear-gradient(to bottom, transparent, rgb(14,15,17))" }} />
    </div>
    </>
  );
}
