"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Step data ── */
const steps = [
  {
    number: "1",
    title: "Map the Gaps",
    desc: "We audit your entire GTM stack before building anything.",
    timeline: "Week 1–2",
    details: [
      "Full diagnostic of your current tools, data flows, and processes",
      "ICP coverage, signal detection, and messaging scored",
      "Identify gaps between where you are and where you need to be",
    ],
  },
  {
    number: "2",
    title: "Design the Machine",
    desc: "Full system architecture, signed off before a line of code.",
    timeline: "Week 2–3",
    details: [
      "Agent network design with data flow mapping",
      "Integration blueprint for your entire tool stack",
      "Approval gate — nothing gets built without your sign-off",
    ],
  },
  {
    number: "3",
    title: "Build the Orchestra",
    desc: "Six AI agents go live, connected to your existing stack.",
    timeline: "Week 3–10",
    details: [
      "Signal, Research, Copy, Outbound, CRM, and Monitor agents deployed",
      "Connected to HubSpot, Clay, Instantly, Slack, and your tools",
      "Guardrails, RBAC, and audit trails built in from day one",
    ],
  },
  {
    number: "4",
    title: "Hand the Keys Over",
    desc: "Two weeks of optimisation, then it's yours. Permanently.",
    timeline: "Week 11–12",
    details: [
      "Full documentation and team training session",
      "30-day post-handoff support window included",
      "You own 100% of the workflows, agents, and IP",
    ],
  },
];

/* ── Mock screens for inside the Framer card ── */
function AuditScreen() {
  const rows = [
    { label: "ICP Coverage", value: "34%", bar: 34, color: "#EF4444" },
    { label: "Signal Detection", value: "None", bar: 0, color: "#EF4444" },
    { label: "CRM Data Health", value: "52%", bar: 52, color: "#F59E0B" },
    { label: "Outbound Reply Rate", value: "1.2%", bar: 12, color: "#EF4444" },
    { label: "Tool Integration", value: "2 of 6", bar: 33, color: "#F59E0B" },
    { label: "Messaging Score", value: "C-", bar: 25, color: "#EF4444" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-md bg-red-500/20 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-wider font-medium">GTM Gap Analysis</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
        >
          <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{row.label}</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-[rgba(255,255,255,0.7)] w-10 text-right">{row.value}</span>
            <div className="w-16 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: row.color }}
                initial={{ width: 0 }}
                animate={{ width: `${row.bar}%` }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
      <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex justify-between">
        <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Overall Readiness</span>
        <span className="text-[11px] font-bold text-red-400">27% — Critical</span>
      </div>
    </div>
  );
}

function BlueprintScreen() {
  const agents = [
    { name: "Signal", icon: "S" }, { name: "Research", icon: "R" }, { name: "Copy", icon: "C" },
    { name: "Outbound", icon: "O" }, { name: "CRM", icon: "CR" }, { name: "Monitor", icon: "M" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-md bg-green-500/20 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-wider font-medium">Agent Network Design</span>
        <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full ml-auto">Approved</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {agents.map((a, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center text-[9px] font-bold text-accent-orange">{a.icon}</div>
            <span className="text-[9px] text-[rgba(255,255,255,0.5)] font-medium">{a.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center gap-1"><div className="w-4 h-px bg-accent-orange" /><span className="text-[8px] text-[rgba(255,255,255,0.3)]">Data flow</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-[8px] text-[rgba(255,255,255,0.3)]">Active</span></div>
      </div>
    </div>
  );
}

function AgentsLiveScreen() {
  const agents = [
    { name: "Signal Scanner", status: "Scanning", ops: "1,247" },
    { name: "Research Agent", status: "Enriching", ops: "843" },
    { name: "Copy Writer", status: "Generating", ops: "3,126" },
    { name: "Outbound Agent", status: "Sending", ops: "14,208" },
    { name: "CRM Syncer", status: "Syncing", ops: "892" },
    { name: "Monitor Agent", status: "Watching", ops: "246" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div className="w-2 h-2 rounded-full bg-green-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[11px] font-medium text-[rgba(255,255,255,0.7)]">All Systems Live</span>
        </div>
        <span className="text-[10px] text-[rgba(255,255,255,0.3)]">6/6 agents</span>
      </div>
      {agents.map((a, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 + i * 0.05 }}
        >
          <div className="flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-500" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
            <span className="text-[10px] text-[rgba(255,255,255,0.6)]">{a.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-green-400 font-medium">{a.status}</span>
            <span className="text-[9px] text-[rgba(255,255,255,0.25)]">{a.ops} ops</span>
          </div>
        </motion.div>
      ))}
      <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex justify-between">
        <span className="text-[10px] text-green-400 font-semibold">Total (30d)</span>
        <span className="text-[11px] font-bold text-green-400">20,562</span>
      </div>
    </div>
  );
}

function ResultsScreen() {
  const metrics = [
    { label: "Meetings/mo", value: "47", change: "+450%" },
    { label: "Reply Rate", value: "8.7%", change: "+625%" },
    { label: "Pipeline", value: "$1.2M", change: "+340%" },
    { label: "Cost Saved", value: "$2.8K", change: "/month" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className="p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <span className="text-[8px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">{m.label}</span>
            <div className="text-lg font-bold text-white leading-none mt-1">{m.value}</div>
            <span className="text-[9px] text-green-400 font-medium">{m.change}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3">
        <span className="text-[9px] text-[rgba(255,255,255,0.3)] font-medium">Pipeline — 90 Days</span>
        <div className="flex items-end gap-1 mt-2 h-8">
          {[15, 20, 18, 35, 42, 38, 55, 62, 58, 75, 82, 90].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ background: i >= 8 ? "#E8650A" : "rgba(255,255,255,0.08)" }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
      <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex justify-between">
        <span className="text-[10px] text-accent-orange font-semibold">System Status</span>
        <span className="text-[10px] font-bold text-accent-orange">Yours — Permanently</span>
      </div>
    </div>
  );
}

const screens = [AuditScreen, BlueprintScreen, AgentsLiveScreen, ResultsScreen];

export default function ProcessVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-cycle every 5s
  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setActiveStep((i) => (i + 1) % steps.length), 5000);
    return () => clearInterval(t);
  }, [autoPlay]);

  const handleClick = (i: number) => {
    setActiveStep(i);
    setAutoPlay(false);
    // Resume after 15s
    setTimeout(() => setAutoPlay(true), 15000);
  };

  const ActiveScreen = screens[activeStep];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-16">
          <p className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-widest mb-3">
            The Process
          </p>
          <h2
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Four steps. 90 days.{" "}
            <span className="text-accent-orange italic">Then it&apos;s yours.</span>
          </h2>
        </Reveal>

        {/* ── Framer-style 2-col: Left text steps + Right dark card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — Step list (clickable, swaps the right card) */}
          <div className="flex flex-col gap-1">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => handleClick(i)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-[rgba(232,86,0,0.2)] bg-[rgba(232,86,0,0.04)]"
                      : "border-transparent hover:bg-[rgba(255,255,255,0.02)]"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] text-accent-orange bg-accent-orange/10 px-2.5 py-1 rounded-full font-semibold tracking-wide">
                      {step.timeline}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-1 transition-colors ${
                      isActive ? "text-accent-orange" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.ul
                        className="mt-3 space-y-1.5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        {step.details.map((d, j) => (
                          <motion.li
                            key={j}
                            className="flex items-start gap-2 text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.06 }}
                          >
                            <svg
                              className="w-3 h-3 mt-1 shrink-0 text-accent-orange"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M2 5l2.5 2.5L8 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {d}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Progress bar for active step */}
                  {isActive && autoPlay && (
                    <motion.div
                      className="mt-3 h-[2px] bg-accent-orange/30 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-accent-orange rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        key={`progress-${activeStep}`}
                      />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — Framer-style dark glassmorphic card with swapping screen */}
          <motion.div
            className="sticky top-32"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Outer shell — Framer thin outline */}
            <div className="rounded-[36px] p-[6px] border border-[rgba(255,255,255,0.03)]">
              {/* Inner card — Framer dark card with orange glow */}
              <div className="relative rounded-[30px] bg-[rgba(255,255,255,0.03)] border border-[rgb(41,42,43)] overflow-hidden min-h-[420px]">
                {/* Orange glow SVG overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(232,86,0,0.12) 0%, rgba(232,86,0,0.04) 40%, transparent 70%)",
                  }}
                />
                {/* Top orange glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none z-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232,86,0,0.06) 0%, transparent 60%)",
                  }}
                />
                {/* Animated bottom line */}
                <motion.div
                  className="absolute bottom-0 left-[10%] right-[10%] h-[2px] rounded-full z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #E85600, transparent)",
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Screen content — swaps with AnimatePresence */}
                <div className="relative z-[1] p-7 md:p-8">
                  {/* Step indicator dots */}
                  <div className="flex items-center gap-2 mb-6">
                    {steps.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                          activeStep === i ? "bg-accent-orange" : "bg-[rgba(255,255,255,0.1)]"
                        }`}
                        onClick={() => handleClick(i)}
                        whileHover={{ scale: 1.3 }}
                        animate={activeStep === i ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: activeStep === i ? Infinity : 0 }}
                      />
                    ))}
                    <span className="ml-auto text-[10px] text-[rgba(255,255,255,0.25)] uppercase tracking-wider">
                      Step {activeStep + 1} of 4
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <ActiveScreen />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
