"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Card 1: Top-left — like Cryps "Crypo wallet with secure encryption" ── */
function Card1() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3
          className="text-[20px] font-medium text-white leading-[130%] mb-2"
          style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
        >
          Signal-led prospecting with secure orchestration
        </h3>
        <p className="text-[13px] text-[rgba(255,255,255,0.4)] leading-[160%]">
          Leading multi-agent AI pipeline management
        </p>
      </div>
      {/* Avatar circles + dashed connector + orb — like Cryps profile pics */}
      <div className="flex items-center mt-6">
        {[
          { letter: "D", bg: "rgba(232,86,0,0.3)", border: "rgba(232,86,0,0.4)", color: "#E85600" },
          { letter: "R", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" },
        ].map((a, i) => (
          <motion.div
            key={i}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-bold"
            style={{
              backgroundColor: a.bg,
              border: `2px solid ${a.border}`,
              color: a.color,
              marginLeft: i > 0 ? -10 : 0,
              zIndex: 2 - i,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          >
            {a.letter}
          </motion.div>
        ))}
        {/* Dashed line */}
        <div
          className="mx-3"
          style={{ width: 40, height: 0, borderTop: "1.5px dashed rgba(255,255,255,0.2)" }}
        />
        {/* Rev Orchestra orb */}
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 35% 35%, #F09030, #C44800)",
            boxShadow: "0 4px 16px rgba(232,86,0,0.35)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Card 2: Top-right — like Cryps "Bitcoin" ticker card ── */
function Card2() {
  const tools = [
    { name: "Claude", sub: "CLAUDE", key: "claude", stat: "2.20% ↑", color: "#4ade80" },
    { name: "HubSpot", sub: "HUBSPOT", key: "hubspot", stat: "2.80% ↑", color: "#4ade80" },
    { name: "Clay", sub: "CLAY", key: "clay", stat: "enriching", color: "#4ade80" },
    { name: "Instantly", sub: "INSTANTLY", key: "instantly", stat: "1.50% ↑", color: "#4ade80" },
    { name: "LinkedIn", sub: "LINKEDIN", key: "linkedin", stat: "scanning", color: "#4ade80" },
    { name: "Slack", sub: "SLACK", key: "slack", stat: "alerting", color: "#facc15" },
    { name: "n8n", sub: "N8N", key: "n8n", stat: "running", color: "#4ade80" },
    { name: "Apollo", sub: "APOLLO", key: "apollo", stat: "1,247", color: "#4ade80" },
  ];
  const doubled = [...tools, ...tools];

  return (
    <div className="flex flex-col h-full">
      {/* Header — like Cryps Bitcoin header with icon + name + price */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "radial-gradient(circle at 35% 35%, #F09030, #C44800)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <span className="text-[12px] font-semibold text-white leading-none block">Rev Orchestra</span>
          <span className="text-[10px] text-[rgba(255,255,255,0.3)]">47 meetings/mo</span>
        </div>
      </div>

      {/* Big number — like Cryps "00.343 |" */}
      <div
        className="text-[28px] font-medium text-white tracking-tight mb-2 flex items-baseline"
        style={{ fontFamily: "var(--font-family-heading)" }}
      >
        00.343 <span className="text-[rgba(255,255,255,0.15)] ml-1 text-[24px]">|</span>
      </div>

      {/* Scrolling tool list — like Cryps crypto price list */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[rgb(22,23,27)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-[rgb(22,23,27)] to-transparent pointer-events-none" />
        <motion.div
          className="flex flex-col gap-1"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ y: { duration: 22, repeat: Infinity, ease: "linear", repeatType: "loop" } }}
        >
          {doubled.map((tool, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 px-1">
              <BrandLogo name={tool.key} size={18} colored />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-white block leading-none">{tool.name}</span>
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] uppercase">{tool.sub}</span>
              </div>
              <span className="text-[10px] font-medium shrink-0" style={{ color: tool.color }}>
                {tool.stat}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Card 3: Bottom-left — like Cryps "DAPPS" ── */
function Card3() {
  const rows = [
    { initials: "SC", amount: "$120", time: "10:30 pm", name: "Sarah Chen · Acme Corp", stage: "Discovery", stageColor: "#4ade80" },
    { initials: "MR", amount: "$455", time: "12 June 12:30 pm", name: "Mike Rodriguez · TechFlow", stage: "waiting", stageColor: "#facc15" },
    { initials: "LP", amount: "$7,775", time: "12 June", name: "Lisa Park · DataSync", stage: "Sent", stageColor: "#4ade80" },
    { initials: "JW", amount: "$3,200", time: "Today", name: "James Wilson · CloudBase", stage: "Qualified", stageColor: "#4ade80" },
    { initials: "AN", amount: "$890", time: "2 days ago", name: "Amy Nguyen · ScaleAI", stage: "Outreach", stageColor: "#60a5fa" },
    { initials: "DK", amount: "$2,100", time: "3 days ago", name: "David Kim · GrowthOS", stage: "Responded", stageColor: "#4ade80" },
  ];
  const doubled = [...rows, ...rows];

  return (
    <div className="flex flex-col h-full">
      <h3
        className="text-[20px] font-medium text-white leading-[130%] mb-2"
        style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
      >
        Pipeline
      </h3>
      <p className="text-[12px] text-[rgba(255,255,255,0.35)] mb-3">
        Take control of your entire funnel
      </p>

      {/* Scrolling deal rows — like Cryps DAPPS transactions */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[rgb(22,23,27)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-[rgb(22,23,27)] to-transparent pointer-events-none" />
        <motion.div
          className="flex flex-col gap-1.5"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ y: { duration: 25, repeat: Infinity, ease: "linear", repeatType: "loop" } }}
        >
          {doubled.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center text-[8px] font-bold text-[rgba(255,255,255,0.4)] shrink-0">
                {row.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white">{row.amount}</span>
                  <span className="text-[8px] text-[rgba(255,255,255,0.2)]">{row.time}</span>
                </div>
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] truncate block">{row.name}</span>
              </div>
              <span
                className="text-[8px] font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{ color: row.stageColor, backgroundColor: `${row.stageColor}12` }}
              >
                {row.stage}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Card 4: Bottom-right — like Cryps "Buy Sell and Swap" with large circular icons ── */
function Card4() {
  const tools = [
    { key: "hubspot", bg: "rgba(255,108,55,0.12)" },
    { key: "clay", bg: "rgba(138,100,255,0.12)" },
    { key: "instantly", bg: "rgba(100,180,255,0.12)" },
    { key: "slack", bg: "rgba(230,160,50,0.12)" },
    { key: "n8n", bg: "rgba(180,100,200,0.12)" },
    { key: "claude", bg: "rgba(200,160,100,0.12)" },
    { key: "apollo", bg: "rgba(80,120,200,0.12)" },
    { key: "linkedin", bg: "rgba(40,120,200,0.12)" },
    { key: "salesforce", bg: "rgba(0,160,230,0.12)" },
    { key: "zapier", bg: "rgba(255,100,50,0.12)" },
    { key: "google", bg: "rgba(60,180,100,0.12)" },
    { key: "airtable", bg: "rgba(50,180,200,0.12)" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <h3
        className="text-[20px] font-medium text-white leading-[130%] mb-2"
        style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
      >
        Connect and Orchestrate
      </h3>
      {/* 4x3 grid of large circular icons — like Cryps crypto token circles */}
      <div className="grid grid-cols-4 gap-2.5">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.key}
            className="aspect-square rounded-full flex items-center justify-center"
            style={{
              backgroundColor: tool.bg,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15 + i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08 }}
          >
            <BrandLogo name={tool.key} size={24} colored />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Dashed connector between two cards — Cryps-style ── */
function DashedConnector() {
  return (
    <div
      className="hidden lg:flex items-center justify-center"
      style={{ width: 48, flexShrink: 0, position: "relative", zIndex: 20 }}
    >
      {/* Left endpoint — sits on Card 1 border */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "rgb(18,19,22)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          flexShrink: 0,
        }}
      />
      {/* Dashed line segment */}
      <div style={{ flex: 1, borderTop: "1.5px dashed rgba(255,255,255,0.15)", margin: "0 3px" }} />
      {/* Orange dot center */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#E85600",
          boxShadow: "0 0 6px rgba(232,86,0,0.5)",
          flexShrink: 0,
        }}
      />
      {/* Dashed line segment */}
      <div style={{ flex: 1, borderTop: "1.5px dashed rgba(255,255,255,0.15)", margin: "0 3px" }} />
      {/* Right endpoint — sits on Card 2 border */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "rgb(18,19,22)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

export default function ProcessVisual() {
  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
          {/* LEFT — sticky text */}
          <div className="lg:sticky lg:top-32">
            <Reveal variants={fadeUp}>
              {/* Features badge */}
              <div
                className="inline-flex items-center gap-2 mb-7"
                style={{
                  padding: "8px 14px",
                  borderRadius: 40,
                  backgroundColor: "rgb(25,27,31)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-accent-orange" />
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                  Features
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "clamp(28px, 3.8vw, 44px)",
                  fontWeight: 500,
                  lineHeight: "110%",
                  letterSpacing: "-1.5px",
                  color: "white",
                  marginBottom: 16,
                }}
              >
                AI-Orchestrated GTM System Built for B2B Founders
              </h2>

              <p style={{ fontSize: 16, lineHeight: "155%", color: "rgba(255,255,255,0.38)", marginBottom: 28, maxWidth: 400 }}>
                A platform to prospect, engage, and close, all from one orchestrated system running 24/7.
              </p>

              <motion.a
                href="https://cal.com/danny-revorchestra/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5"
                style={{
                  padding: "13px 26px",
                  borderRadius: 100,
                  backgroundColor: "#E85600",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                BOOK A CALL
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </Reveal>
          </div>

          {/* RIGHT — 2×2 card grid */}
          <div className="grid gap-5" style={{ gridTemplateRows: "320px 320px" }}>
            {/* ── Top row ── */}
            <div className="flex items-stretch gap-0">
              {/* Card 1 */}
              <motion.div
                style={{
                  flex: "0 0 56%",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 36,
                  padding: 24,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease }}
              >
                <Card1 />
              </motion.div>

              {/* Dashed connector */}
              <DashedConnector />

              {/* Card 2 */}
              <motion.div
                className="flex-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 36,
                  padding: 20,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease, delay: 0.1 }}
              >
                <Card2 />
              </motion.div>
            </div>

            {/* ── Bottom row ── */}
            <div className="flex items-stretch gap-5">
              {/* Card 3 */}
              <motion.div
                style={{
                  flex: "0 0 56%",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 36,
                  padding: 24,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease, delay: 0.2 }}
              >
                <Card3 />
              </motion.div>

              {/* Card 4 */}
              <motion.div
                className="relative flex-1 overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 36,
                  padding: 22,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
              >
                {/* Orange glow — like Cryps */}
                <div
                  className="absolute bottom-0 right-0 w-full h-[65%] pointer-events-none z-0"
                  style={{
                    background: "radial-gradient(ellipse at 100% 100%, rgba(232,86,0,0.18) 0%, rgba(232,86,0,0.05) 45%, transparent 70%)",
                  }}
                />
                <div className="relative z-[1] h-full">
                  <Card4 />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
