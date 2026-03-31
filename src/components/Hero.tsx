"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Reveal, Float, fadeUp, popIn } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Floating decorative icons (GTM-themed) ── */
const floatingIcons = [
  { svg: "M13 10V3L4 14h7v7l9-11h-7z", x: 5, y: 20, size: 68, dur: 6 },
  { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", x: 8, y: 55, size: 72, dur: 7.5 },
  { svg: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", x: 3, y: 80, size: 60, dur: 8 },
  { svg: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", x: 92, y: 18, size: 64, dur: 5.5 },
  { svg: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", x: 90, y: 50, size: 76, dur: 6.5 },
  { svg: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", x: 88, y: 78, size: 56, dur: 9 },
  { svg: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z", x: 6, y: 40, size: 54, dur: 7 },
  { svg: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", x: 94, y: 82, size: 62, dur: 8.5 },
];

/* ── Signal Feed data ── */
const signals = [
  { icon: "briefcase", label: "New VP Sales hire at Acme Corp", time: "2m ago", color: "#22c55e" },
  { icon: "dollar", label: "TechCo raised $12M Series A", time: "8m ago", color: "#f59e0b" },
  { icon: "switch", label: "Rival lost 3 enterprise accounts", time: "14m ago", color: "#ef4444" },
];

/* ── Pipeline stages ── */
const pipelineStages = [
  { name: "Signal Detected", count: 127, color: "rgba(232,101,10,0.3)" },
  { name: "Outreach Sent", count: 84, color: "rgba(232,101,10,0.5)" },
  { name: "Reply Received", count: 31, color: "rgba(232,101,10,0.7)" },
  { name: "Meeting Booked", count: 12, color: "rgba(232,101,10,1)" },
];

/* ── AI Agents ── */
const agents = [
  { name: "Signal Scanner", status: "active" },
  { name: "ICP Matcher", status: "active" },
  { name: "Sequence Writer", status: "active" },
  { name: "Reply Handler", status: "active" },
  { name: "Meeting Booker", status: "active" },
  { name: "CRM Syncer", status: "active" },
];

export default function Hero() {
  const [orchestratorMode, setOrchestratorMode] = useState(true);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full flex flex-col items-center bg-[rgb(8,8,15)] overflow-hidden"
      >
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
            WebkitMask:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
          }}
        />

        {/* Warm orange radial glow behind hero */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(232,101,10,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingIcons.map((icon, i) => (
            <Float
              key={i}
              duration={icon.dur}
              y={10}
              delay={i * 0.5}
              className="absolute"
              style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
            >
              <div
                className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                style={{
                  width: icon.size,
                  height: icon.size,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <svg
                  width={icon.size * 0.4}
                  height={icon.size * 0.4}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon.svg} />
                </svg>
              </div>
            </Float>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════
            HERO CONTENT — Orchestrator ON / OFF modes
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto px-5 pt-[150px]"
          style={{ y: textY, opacity: textOpacity }}
        >
          <AnimatePresence mode="wait">
            {orchestratorMode ? (
              /* ─── ORCHESTRATOR MODE ON ─── */
              <motion.div
                key="orchestrator-on"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col items-center gap-7"
              >
                {/* Badge */}
                <Reveal delay={0} className="inline-flex">
                  <div className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[rgb(20,20,28)] border border-[rgba(255,255,255,0.08)]">
                    <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent" />
                    <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                    <span className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-[0.12em] uppercase font-medium">
                      The AI GTM System for Post-Funding B2B Founders
                    </span>
                  </div>
                </Reveal>

                {/* Headline */}
                <Reveal delay={0.1}>
                  <h1
                    className="text-[clamp(34px,5vw,64px)] font-medium leading-[110%] tracking-[-2px] text-white max-w-[860px]"
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    <span className="block">
                      You&apos;re still doing GTM like it&apos;s 2024.
                    </span>
                    <span className="block mt-2 bg-gradient-to-r from-white via-white to-[rgba(255,255,255,0.6)] bg-clip-text text-transparent">
                      The teams beating you are running orchestras.
                    </span>
                  </h1>
                </Reveal>

                {/* Sub-headline */}
                <Reveal delay={0.2}>
                  <p className="text-[17px] text-[rgba(255,255,255,0.42)] leading-[170%] max-w-[640px]">
                    Rev Orchestra builds AI-orchestrated GTM systems for B2B founders who
                    just raised and need pipeline — not another tool to manage, not another
                    retainer to renew. Six AI agents, connected to your stack, running 24/7.
                    Yours permanently in 90 days.
                  </p>
                </Reveal>

                {/* Scarcity signal */}
                <Reveal delay={0.3}>
                  <p className="text-sm font-bold text-accent-orange tracking-wide">
                    <span className="mr-1">&#127919;</span>4 seats available for Q2 2026.
                    Ready to launch.
                  </p>
                </Reveal>

                {/* CTAs */}
                <Reveal delay={0.35}>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href="https://calendly.com/danny-revorchestra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-semibold tracking-wide rounded-full hover:brightness-110 transition-all shadow-[0_0_30px_rgba(232,101,10,0.3)]"
                    >
                      Book a Call with Danny
                      <span className="ml-1">&rarr;</span>
                    </a>
                    <a
                      href="#how-it-works"
                      className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold tracking-wide rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                    >
                      See How It Works
                      <span className="ml-1">&darr;</span>
                    </a>
                  </div>
                </Reveal>

                {/* Trust strip */}
                <Reveal delay={0.45}>
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12px] text-[rgba(255,255,255,0.35)] mt-2">
                    <span>&#9889; 90-day build</span>
                    <span>&#128274; You own everything</span>
                    <span>&#129302; 6 AI sub-agents</span>
                    <span>&#128279; Plugs into your stack</span>
                    <span>&#128230; 4 founders per quarter, max</span>
                  </div>
                </Reveal>
              </motion.div>
            ) : (
              /* ─── ORCHESTRATOR MODE OFF (FOMO) ─── */
              <motion.div
                key="orchestrator-off"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col items-center gap-8"
              >
                {/* Headline */}
                <Reveal delay={0}>
                  <h1
                    className="text-[clamp(38px,5.5vw,72px)] font-bold leading-[105%] tracking-[-3px] text-white max-w-[900px]"
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    Don&apos;t do GTM like it&apos;s 2024.
                  </h1>
                </Reveal>

                {/* Sub-headline */}
                <Reveal delay={0.1}>
                  <p className="text-xl font-semibold text-accent-orange max-w-[650px] leading-[150%]">
                    The gap is already opening. Your competition is on the other side
                    of it.
                  </p>
                </Reveal>

                {/* FOMO paragraphs */}
                <div className="flex flex-col gap-5 max-w-[620px] text-left">
                  {[
                    "In 2024, cold outbound got 1.2% reply rates. In 2025, AI-orchestrated signal-based outreach is hitting 8-12%. That's not an improvement — that's a different sport.",
                    "In 2024, most teams had 5-6 disconnected tools leaking data between them. In 2025, the best teams have one connected system where every tool talks to every other tool in real time.",
                    "In 2024, AI was a writing tool. In 2025, AI is an execution layer — scanning signals, routing leads, writing sequences, booking meetings, and syncing your CRM while you sleep.",
                    "The question isn't whether to make this shift. It's whether you make it now while the window is open, or later when it's table stakes and the advantage is gone.",
                  ].map((text, i) => (
                    <Reveal key={i} delay={0.15 + i * 0.1}>
                      <p className="text-[15px] text-[rgba(255,255,255,0.45)] leading-[175%]">
                        {text}
                      </p>
                    </Reveal>
                  ))}
                </div>

                {/* CTA block */}
                <Reveal delay={0.6}>
                  <div className="flex flex-col items-center gap-5 mt-2">
                    <p className="text-sm text-[rgba(255,255,255,0.55)] max-w-[520px] text-center leading-[165%]">
                      The founders who built their system in Q1 are already booking calls
                      from it.{" "}
                      <span className="text-accent-orange font-bold">
                        4 seats left for Q2 2026.
                      </span>{" "}
                      Build yours before the window closes.
                    </p>
                    <a
                      href="https://calendly.com/danny-revorchestra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-semibold tracking-wide rounded-full hover:brightness-110 transition-all shadow-[0_0_30px_rgba(232,101,10,0.3)]"
                    >
                      Book a Call with Danny
                      <span className="ml-1">&rarr;</span>
                    </a>
                  </div>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Toggle button (temporary, will move to navbar) ── */}
          <motion.div
            className="mt-8 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setOrchestratorMode((prev) => !prev)}
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all text-xs text-[rgba(255,255,255,0.4)]"
            >
              <span className="relative flex items-center">
                <span
                  className={`block w-8 h-[18px] rounded-full transition-colors duration-300 ${
                    orchestratorMode
                      ? "bg-accent-orange"
                      : "bg-[rgba(255,255,255,0.15)]"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-transform duration-300 ${
                      orchestratorMode ? "translate-x-[16px]" : "translate-x-[2px]"
                    }`}
                  />
                </span>
              </span>
              Orchestrator Mode{" "}
              <span
                className={`font-semibold ${
                  orchestratorMode ? "text-accent-orange" : "text-[rgba(255,255,255,0.5)]"
                }`}
              >
                {orchestratorMode ? "ON" : "OFF"}
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            GTM COMMAND CENTER DASHBOARD MOCKUP
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="relative z-10 w-full max-w-[1080px] mx-auto px-5 mt-8 mb-4"
          initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease, delay: 0.7 }}
          style={{ y: dashboardY, scale: dashboardScale }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(12,12,20,0.95)] shadow-[0_0_60px_rgba(232,101,10,0.06)]">
            {/* Dashboard header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">
                  GTM Command Center
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.15)] text-green-400 font-medium">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
                <div className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
                <div className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
              </div>
            </div>

            {/* Dashboard content — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
              {/* LEFT: Signal Feed */}
              <div className="border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider font-medium">
                    Signal Feed
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {signals.map((sig, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 + i * 0.15, ease }}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: sig.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-[rgba(255,255,255,0.6)] leading-[140%]">
                          {sig.label}
                        </p>
                        <span className="text-[10px] text-[rgba(255,255,255,0.25)]">
                          {sig.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CENTER: Pipeline */}
              <div className="border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider font-medium">
                    Pipeline
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {pipelineStages.map((stage, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 + i * 0.12, ease }}
                      style={{ transformOrigin: "left" }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-[rgba(255,255,255,0.5)]">
                          {stage.name}
                        </span>
                        <span className="text-[11px] font-semibold text-white">
                          {stage.count}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(stage.count / 127) * 100}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 1.4 + i * 0.12,
                            ease,
                          }}
                          style={{ backgroundColor: stage.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mini stat */}
                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">12</span>
                    <span className="text-[11px] text-[rgba(255,255,255,0.35)]">
                      meetings booked this week
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Agent Status */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider font-medium">
                    Agent Status
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {agents.map((agent, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease }}
                      className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                    >
                      <div className="w-6 h-6 rounded-md bg-[rgba(232,101,10,0.12)] flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(232,101,10,0.7)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                        </svg>
                      </div>
                      <span className="flex-1 text-[12px] text-[rgba(255,255,255,0.55)]">
                        {agent.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] text-green-400 font-medium">
                          Active
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Warm amber gradient glow zone */}
      <div
        className="relative w-full h-[250px] -mb-[120px] z-10 pointer-events-none overflow-visible"
        style={{ background: "rgb(8,8,15)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 60% at 50% 10%, rgba(180, 90, 15, 0.35) 0%, rgba(140, 65, 10, 0.2) 20%, rgba(80, 35, 5, 0.08) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 80% at 0% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 80% at 100% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgb(8,8,15))",
          }}
        />
      </div>
    </>
  );
}
