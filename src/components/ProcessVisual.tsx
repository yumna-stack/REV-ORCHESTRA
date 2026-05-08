"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Small step badge: "01 / SIGNAL" — ties each card to its stage in the flow ── */
function StepBadge({ n, label }: { n: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span
        className="inline-flex items-center justify-center rounded-full text-[10px] font-semibold"
        style={{
          width: 22,
          height: 22,
          backgroundColor: "rgb(40,27,22)",
          border: "1px solid rgba(232,86,0,0.35)",
          color: "#E85600",
          fontFamily: "var(--font-family-heading)",
        }}
      >
        {n}
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.18em]"
        style={{ color: "rgba(255,255,255,0.45)", fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Card 1: SIGNAL — the moment a buying signal fires ── */
function Card1() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <StepBadge n="01" label="Signal" />
        <h3
          className="text-[20px] font-medium text-white leading-[130%] mb-2"
          style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
        >
          A buying signal fires
        </h3>
        <p className="text-[13px] text-[rgba(255,255,255,0.4)] leading-[160%]">
          Funding, hiring, intent data, LinkedIn activity, detected the moment it happens
        </p>
      </div>
      {/* Scanning spreadsheet — rows scroll, magnifier pulses over them */}
      <SignalSheet />
    </div>
  );
}

/* ── Mini scrolling spreadsheet + magnifier — represents signal detection ── */
function SignalSheet() {
  const signalRows = [
    { co: "Loomly",   signal: "Series B · $18M",     hot: true  },
    { co: "Plotr",    signal: "Hired 4 SDRs",        hot: false },
    { co: "Northstar", signal: "Visited pricing x3", hot: true  },
    { co: "Heliox",   signal: "CTO changed",          hot: false },
    { co: "ScaleOps", signal: "Posted ICP job",       hot: true  },
    { co: "OutboundLab", signal: "Added Apollo",      hot: false },
    { co: "Taxxa",    signal: "RFP downloaded",       hot: true  },
    { co: "Cryps",    signal: "Earnings beat",        hot: false },
  ];
  const doubled = [...signalRows, ...signalRows];

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-md"
      style={{
        height: 96,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-4 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgb(8,8,10), transparent)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-4 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgb(8,8,10), transparent)" }} />

      {/* Scrolling rows */}
      <motion.div
        className="flex flex-col"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 text-[10px]"
            style={{
              height: 20,
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              color: row.hot ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span className="truncate max-w-[70px]" style={{ fontWeight: row.hot ? 600 : 400 }}>{row.co}</span>
            <span className="truncate" style={{ fontSize: 9 }}>{row.signal}</span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: row.hot ? "#E85600" : "rgba(255,255,255,0.15)", boxShadow: row.hot ? "0 0 6px rgba(232,86,0,0.7)" : undefined }}
            />
          </div>
        ))}
      </motion.div>

      {/* Magnifier — gently oscillates over the rows, with a soft orange glow */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ top: 32, left: 110 }}
        animate={{ y: [-6, 6, -6], x: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative"
          style={{
            filter: "drop-shadow(0 0 8px rgba(232,86,0,0.45))",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            {/* Glass ring */}
            <circle cx="10" cy="10" r="6" stroke="#E85600" strokeWidth="1.6" />
            {/* Glass tint */}
            <circle cx="10" cy="10" r="5.4" fill="rgba(232,86,0,0.12)" />
            {/* Handle */}
            <path d="M14.5 14.5 L19 19" stroke="#E85600" strokeWidth="1.8" strokeLinecap="round" />
            {/* Specular highlight */}
            <path d="M7 7.5 A 4 4 0 0 1 9 6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </motion.div>
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
      <StepBadge n="02" label="GTM Running" />
      {/* Header — running metric */}
      <div className="flex items-center mb-2">
        <div>
          <span className="text-[12px] font-semibold text-white leading-none block">Rev Orchestra</span>
          <span className="text-[10px] text-[rgba(255,255,255,0.3)]">47 meetings/mo</span>
        </div>
      </div>

      {/* Scrolling tool list */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[rgb(8,8,10)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-[rgb(8,8,10)] to-transparent pointer-events-none" />
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

/* ── Card 3: AGENTS — the fleet that the signal hands off to ── */
function Card3() {
  const agents = [
    { name: "Signal Agent",     role: "catches the trigger", status: "firing",    color: "#E85600" },
    { name: "Research Agent",   role: "builds account context", status: "active",  color: "#4ade80" },
    { name: "Copy Agent",       role: "writes personalised", status: "drafting", color: "#4ade80" },
    { name: "Outbound Agent",   role: "sends multi channel", status: "sending", color: "#60a5fa" },
    { name: "CRM Agent",        role: "updates records", status: "syncing",    color: "#facc15" },
    { name: "Monitoring Agent", role: "watches the pipeline", status: "watching", color: "#4ade80" },
  ];

  return (
    <div className="flex flex-col h-full">
      <StepBadge n="03" label="Agents" />
      <h3
        className="text-[20px] font-medium text-white leading-[130%] mb-1"
        style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
      >
        A fleet of agents takes over
      </h3>
      <p className="text-[12px] text-[rgba(255,255,255,0.35)] mb-3">
        Each has one job and hands off cleanly
      </p>

      {/* Agent rows — scrolling ticker (same animation as Card 2) */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[rgb(10,10,12)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-[rgb(10,10,12)] to-transparent pointer-events-none" />
        <motion.div
          className="flex flex-col gap-1.5"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ y: { duration: 22, repeat: Infinity, ease: "linear", repeatType: "loop" } }}
        >
          {[...agents, ...agents].map((agent, i) => (
            <div
              key={`${agent.name}-${i}`}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg"
              style={{
                backgroundColor: "rgb(18,18,20)",
                border: "0.5px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: agent.color, boxShadow: `0 0 6px ${agent.color}80` }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-white block leading-tight truncate">{agent.name}</span>
                <span className="text-[9px] text-[rgba(255,255,255,0.35)] truncate block">{agent.role}</span>
              </div>
              <span
                className="text-[9px] font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{ color: agent.color, backgroundColor: `${agent.color}14` }}
              >
                {agent.status}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Card 4: PIPELINE — the final stage, closed deals ── */
function Card4() {
  const rows = [
    { avatar: "https://i.pravatar.cc/80?img=12",  name: "James Wilson", company: "CloudBase", stage: "Qualified",  stageColor: "#4ade80" },
    { avatar: "https://i.pravatar.cc/80?img=45",  name: "Lisa Park",    company: "DataSync",  stage: "Meeting",    stageColor: "#4ade80" },
    { avatar: "https://i.pravatar.cc/80?img=47",  name: "Sarah Chen",   company: "Acme Corp", stage: "Discovery",  stageColor: "#4ade80" },
    { avatar: "https://i.pravatar.cc/80?img=44",  name: "Amy Nguyen",   company: "ScaleAI",   stage: "Outreach",   stageColor: "#60a5fa" },
    { avatar: "https://i.pravatar.cc/80?img=33",  name: "David Kim",    company: "GrowthOS",  stage: "Responded",  stageColor: "#4ade80" },
  ];

  return (
    <div className="relative flex flex-col h-full">
      <StepBadge n="04" label="Pipeline" />
      <h3
        className="text-[20px] font-medium text-white leading-[130%] mb-1"
        style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.03em" }}
      >
        Deals flow into your pipeline
      </h3>
      <p className="text-[12px] text-[rgba(255,255,255,0.35)] mb-3">
        Automatically logged, enriched, routed
      </p>

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-[rgb(10,10,12)] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-[rgb(10,10,12)] to-transparent pointer-events-none" />
        <motion.div
          className="flex flex-col gap-1.5"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ y: { duration: 25, repeat: Infinity, ease: "linear", repeatType: "loop" } }}
        >
        {[...rows, ...rows].map((row, i) => (
          <div
            key={`${row.name}-${i}`}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: "rgb(18,18,20)",
              border: "0.5px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={row.avatar}
              alt={row.name}
              width={26}
              height={26}
              className="w-[26px] h-[26px] rounded-full object-cover shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-white block leading-tight truncate">{row.name}</span>
              <span className="text-[9px] text-[rgba(255,255,255,0.3)] truncate block">{row.company}</span>
            </div>
            <span
              className="text-[9px] font-medium px-2 py-0.5 rounded-full shrink-0"
              style={{ color: row.stageColor, backgroundColor: `${row.stageColor}14` }}
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
    <section id="how-it-works" className="relative w-full py-24 md:py-32 bg-[rgb(0, 0, 0)]">
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
                  borderRadius: 20,
                  backgroundColor: "rgb(8,8,10)",
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
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 500,
                  lineHeight: "120%",
                  letterSpacing: "-1.2px",
                  color: "white",
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                AI Orchestrated GTM System Built for B2B Founders
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

          {/* RIGHT — card grid: stacks vertically on mobile, 2×2 on lg+ */}
          <div className="grid gap-5 lg:[grid-template-rows:320px_320px]">
            {/* ── Top row ── */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
              {/* Card 1 */}
              <motion.div
                className="w-full lg:[flex:0_0_56%] lg:min-h-0 min-h-[320px]"
                style={{
                  backgroundColor: "rgb(8,8,10)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                  padding: 24,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease }}
              >
                <Card1 />
              </motion.div>

              {/* Dashed connector — desktop only */}
              <DashedConnector />

              {/* Card 2 */}
              <motion.div
                className="w-full lg:flex-1 lg:min-h-0 min-h-[320px]"
                style={{
                  backgroundColor: "rgb(8,8,10)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
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
            <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
              {/* Card 3 */}
              <motion.div
                className="w-full lg:[flex:0_0_56%] lg:min-h-0 min-h-[320px]"
                style={{
                  backgroundColor: "rgb(8,8,10)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                  padding: 24,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, ease, delay: 0.2 }}
              >
                <Card3 />
              </motion.div>

              {/* Dashed connector — desktop only */}
              <DashedConnector />

              {/* Card 4 */}
              <motion.div
                className="relative w-full lg:flex-1 overflow-hidden lg:min-h-0 min-h-[320px]"
                style={{
                  backgroundColor: "rgb(8,8,10)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
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
