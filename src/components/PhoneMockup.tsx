"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

const slackMessages = [
  {
    user: "Signal Agent",
    time: "9:14 AM",
    color: "#E8650A",
    brandKey: "zapier",
    lines: [
      "New signal detected:",
      "- VP Sales hired at Acme Corp (3 days ago)",
      "- Acme raised $12M Series A (last week)",
      "- Currently using Outreach.io, contract renews in 45 days",
    ],
  },
  {
    user: "Research Agent",
    time: "9:14 AM",
    color: "#6366F1",
    brandKey: "notion",
    lines: [
      "Account brief compiled for Acme Corp:",
      "- 85 employees, B2B SaaS, Series A",
      "- ICP match score: 94%",
      "- Key decision maker: Sarah Chen, VP Sales",
    ],
  },
  {
    user: "Copy Agent",
    time: "9:15 AM",
    color: "#22C55E",
    brandKey: "claude",
    lines: [
      "Draft ready for review:",
      'Subject: "Sarah, re: your SDR scaling plans"',
      "Personalised to hiring signal + renewal window.",
      "\u2192 Sent to outbound queue.",
    ],
  },
  {
    user: "CRM Agent",
    time: "9:15 AM",
    color: "#3B82F6",
    brandKey: "hubspot",
    lines: [
      "Acme Corp added to pipeline",
      "Sarah Chen created as contact",
      "Sequence assigned: signal-triggered-vp-sales",
      "Next touch: LinkedIn connection (Tomorrow 10AM)",
    ],
  },
];

export default function PhoneMockup() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: Mac falls down into view, then rises up as you scroll past
  const macY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [120, 0, 0, -80]);
  const macScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);
  const macRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -5]);
  const macOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  // Parallax for glow behind mac
  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-6">
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Live System</span>
          </div>
          <h2
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white mb-4"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Watch your agents{" "}
            <span className="text-accent-orange italic">work together</span> in real time.
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%] max-w-[560px] mx-auto">
            Every signal, every research brief, every outreach message, visible in your Slack.
            Six agents coordinating automatically.
          </p>
        </Reveal>

        {/* Mac mockup with scroll parallax */}
        <div className="relative flex justify-center" style={{ perspective: "1200px" }}>
          {/* Glow behind mac */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(14, 116, 144, 0.15) 0%, rgba(232, 101, 10, 0.05) 40%, transparent 70%)",
              y: glowY,
              scale: glowScale,
            }}
          />

          <motion.div
            className="relative w-full max-w-[900px]"
            style={{
              y: macY,
              scale: macScale,
              rotateX: macRotateX,
              opacity: macOpacity,
              transformStyle: "preserve-3d",
            }}
          >
            {/* ── MacBook Frame ── */}
            <div
              className="relative rounded-[16px] overflow-hidden"
              style={{
                border: "2px solid rgba(60, 60, 60, 0.8)",
                background: "#1a1a1c",
                boxShadow:
                  "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Mac menu bar */}
              <div className="flex items-center justify-between px-4 py-1.5 bg-[rgba(30,30,32,0.95)] border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-4">
                  {/* Apple icon */}
                  <svg width="12" height="14" viewBox="0 0 17 20" fill="rgba(255,255,255,0.8)">
                    <path d="M14.94 10.64c-.03-2.75 2.24-4.07 2.34-4.13-1.27-1.86-3.25-2.12-3.96-2.15-1.69-.17-3.29 1-4.14 1-.85 0-2.17-.97-3.56-.95-1.83.03-3.52 1.07-4.47 2.71-1.9 3.3-.49 8.2 1.37 10.88.91 1.31 1.99 2.79 3.42 2.74 1.37-.05 1.89-.89 3.55-.89 1.66 0 2.13.89 3.58.86 1.48-.03 2.42-1.34 3.32-2.66 1.05-1.53 1.48-3.01 1.5-3.08-.03-.01-2.88-1.11-2.91-4.39l-.04.06z" />
                  </svg>
                  <div className="flex items-center gap-3 text-[11px] text-[rgba(255,255,255,0.7)] font-medium">
                    <span className="font-semibold">Finder</span>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Window</span>
                    <span>Help</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[rgba(255,255,255,0.5)]">
                  <span>Sat Jun 10</span>
                  <span>9:41 AM</span>
                </div>
              </div>

              {/* ── Screen content: Ocean wallpaper + Slack overlay ── */}
              <div
                className="relative"
                style={{
                  aspectRatio: "16/10",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Subtle dark vignette on edges */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                {/* ── Floating notification card ── */}
                <motion.div
                  className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[52%] max-w-[440px]"
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  <div
                    className="rounded-2xl p-5 backdrop-blur-xl"
                    style={{
                      background: "rgba(0, 0, 0, 0.75)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Timer + logo */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[rgba(255,255,255,0.5)] text-xs font-mono">00:05</span>
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                      <div className="w-5 h-5 rounded bg-accent-orange/20 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="2.5">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                    </div>

                    {/* Main text */}
                    <p className="text-[rgba(255,255,255,0.85)] text-sm leading-[165%] mb-3">
                      Your <span className="text-accent-orange font-semibold">6 AI agents</span> are orchestrating your entire GTM motion, from{" "}
                      <span className="text-accent-orange font-semibold">signal detection</span> to{" "}
                      <span className="text-accent-orange font-semibold">booked meetings</span>, automatically.
                    </p>

                    {/* Tag pills */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] text-[10px] text-green-400 font-medium">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Pipeline Active
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[10px] text-[rgba(255,255,255,0.4)] font-medium">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        6 Agents Running
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ── Slack thread card (bottom-left) ── */}
                <motion.div
                  className="absolute bottom-[5%] left-[4%] w-[50%] max-w-[380px]"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                >
                  <div
                    className="rounded-xl p-3 backdrop-blur-xl"
                    style={{
                      background: "rgba(0, 0, 0, 0.7)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Slack header */}
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[rgba(255,255,255,0.08)]">
                      <BrandLogo name="slack" size={14} />
                      <span className="text-white text-[10px] font-medium">#gtm-orchestrator</span>
                      <span className="text-[rgba(255,255,255,0.2)] text-[8px] ml-auto">Thread</span>
                    </div>

                    {/* Messages */}
                    {slackMessages.slice(0, 3).map((msg, i) => (
                      <motion.div
                        key={i}
                        className="mb-2 last:mb-0"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <BrandLogo name={msg.brandKey} size={12} />
                          <span className="text-[9px] font-semibold" style={{ color: msg.color }}>
                            {msg.user}
                          </span>
                          <span className="text-[7px] text-[rgba(255,255,255,0.2)]">{msg.time}</span>
                        </div>
                        <p className="text-[8px] text-[rgba(255,255,255,0.45)] pl-4 leading-[150%] line-clamp-2">
                          {msg.lines[0]} {msg.lines[1]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── MacBook bottom chin ── */}
            <div
              className="relative h-4 mx-auto rounded-b-xl"
              style={{
                width: "40%",
                background: "linear-gradient(to bottom, #2a2a2c, #1a1a1c)",
                borderLeft: "2px solid rgba(60,60,60,0.8)",
                borderRight: "2px solid rgba(60,60,60,0.8)",
                borderBottom: "2px solid rgba(60,60,60,0.8)",
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b bg-[rgba(255,255,255,0.05)]" />
            </div>
          </motion.div>
        </div>

        {/* Feature bullets below */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12">
          {[
            "Signal fires \u2192 Research in 30s",
            "Personalised copy on autopilot",
            "CRM updated automatically",
            "Meeting booked \u2192 Slack alert",
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-4 h-4 rounded-full bg-accent-orange/15 flex items-center justify-center shrink-0">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs text-[rgba(255,255,255,0.45)]">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
