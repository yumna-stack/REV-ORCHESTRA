"use client";

import { motion } from "framer-motion";
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
      "- Currently using Outreach.io — contract renews in 45 days",
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
      'Subject: "Sarah — re: your SDR scaling plans"',
      "Personalised to hiring signal + renewal window.",
      "→ Sent to outbound queue.",
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
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <Reveal variants={fadeUp}>
            <div className="flex flex-col gap-5">
              <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Live System</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
                Watch your agents <span className="text-accent-orange italic">work together</span> in real time.
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%] max-w-[460px]">
                Every signal, every research brief, every outreach message — visible in your Slack. Six agents coordinating automatically.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                {["Signal fires → Research briefs in 30 seconds", "Personalised copy before you finish coffee", "CRM updated without your team touching it", "Slack alert: meeting booked"].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-5 h-5 rounded-full bg-accent-orange/15 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-sm text-[rgba(255,255,255,0.5)]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — Mac mockup with ocean background */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Mac frame */}
            <div className="relative w-full max-w-[480px] rounded-[16px] border border-[rgba(255,255,255,0.12)] bg-[#1a1a1a] overflow-hidden shadow-2xl" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" }}>
              {/* Mac toolbar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[10px] text-[rgba(255,255,255,0.35)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18" /></svg>
                    app.slack.com — Rev Orchestra
                  </div>
                </div>
              </div>

              {/* Ocean wallpaper background — real ocean photo */}
              <div className="relative" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                {/* Dark overlay so text is readable */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />

                {/* Slack content */}
                <div className="relative p-4">
                  {/* Slack header bar */}
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[rgba(255,255,255,0.1)]">
                    <BrandLogo name="slack" size={16} />
                    <span className="text-white text-xs font-medium">Rev Orchestra</span>
                    <span className="text-[rgba(255,255,255,0.3)] text-[9px] ml-auto">#gtm-orchestrator</span>
                  </div>

                  {/* Thread card */}
                  <div className="rounded-xl bg-[rgba(0,0,0,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] p-3">
                    <p className="text-[9px] text-[rgba(255,255,255,0.35)] mb-3">Thread in #gtm-orchestrator</p>

                    {slackMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        className="mb-3 last:mb-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.25, duration: 0.5 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <BrandLogo name={msg.brandKey} size={14} />
                          <span className="text-[10px] font-semibold" style={{ color: msg.color }}>{msg.user}</span>
                          <span className="text-[7px] text-[rgba(255,255,255,0.2)]">{msg.time}</span>
                        </div>
                        <div className="pl-5 space-y-0.5">
                          {msg.lines.map((line, j) => (
                            <p key={j} className="text-[9px] text-[rgba(255,255,255,0.55)] leading-[150%]">{line}</p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0e7490]/10 blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
