"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const slackMessages = [
  {
    channel: "#gtm-orchestrator",
    title: "Thread in #gtm-orchestrator",
    messages: [
      {
        user: "Signal Agent",
        avatar: "🔍",
        time: "9:14 AM",
        color: "#E8650A",
        content: [
          "🚨 New signal detected:",
          "• VP Sales hired at Acme Corp (3 days ago)",
          "• Acme raised $12M Series A (last week)",
          "• Currently using Outreach.io — contract renews in 45 days",
        ],
      },
      {
        user: "Research Agent",
        avatar: "📋",
        time: "9:14 AM",
        color: "#6366F1",
        content: [
          "Account brief compiled for Acme Corp:",
          "• 85 employees, B2B SaaS, Series A",
          "• ICP match score: 94%",
          "• Key decision maker: Sarah Chen, VP Sales",
          "• Pain signals: hiring SDRs + tool consolidation",
        ],
      },
      {
        user: "Copy Agent",
        avatar: "✍️",
        time: "9:15 AM",
        color: "#22C55E",
        content: [
          "Draft ready for review:",
          "Subject: \"Sarah — re: your SDR scaling plans\"",
          "Personalised to hiring signal + Outreach.io renewal window.",
          "→ Sent to outbound queue.",
        ],
      },
      {
        user: "CRM Agent",
        avatar: "🗄️",
        time: "9:15 AM",
        color: "#3B82F6",
        content: [
          "✅ Acme Corp added to pipeline",
          "✅ Sarah Chen created as contact",
          "✅ Sequence assigned: signal-triggered-vp-sales",
          "✅ Next touch: LinkedIn connection request (Tomorrow 10AM)",
        ],
      },
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
                Every signal, every research brief, every outreach message — visible in your Slack. Six agents coordinating automatically. You just watch the pipeline build.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                {["Signal fires → Research briefs in 30 seconds", "Personalised copy written before you finish coffee", "CRM updated without your team touching it", "You get a Slack alert: meeting booked"].map((item, i) => (
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

          {/* Right — Phone mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Phone frame */}
            <div className="relative w-[320px] rounded-[40px] border-[6px] border-[rgba(255,255,255,0.1)] bg-[rgb(20,20,28)] overflow-hidden shadow-2xl" style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(232,101,10,0.08)" }}>
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[rgb(20,20,28)] rounded-b-2xl z-20" />

              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1 relative z-10">
                <span className="text-[10px] text-white font-medium">9:15</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-2 rounded-sm border border-white/30 relative"><div className="absolute inset-0.5 bg-white/60 rounded-[1px]" /></div>
                </div>
              </div>

              {/* Slack header */}
              <div className="bg-[#1A1D21] px-4 py-2 flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)]">
                <div className="w-5 h-5 rounded bg-[#611F69] flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">S</span>
                </div>
                <span className="text-white text-xs font-medium">Rev Orchestra</span>
                <span className="text-[rgba(255,255,255,0.3)] text-[10px] ml-auto"># gtm-orchestrator</span>
              </div>

              {/* Thread */}
              <div className="bg-[#1A1D21] px-3 py-3 max-h-[480px] overflow-hidden">
                <div className="bg-[#222529] rounded-xl p-3 border border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] text-[rgba(255,255,255,0.4)] mb-3">Thread in #gtm-orchestrator</p>

                  {slackMessages[0].messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className="mb-3 last:mb-0"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.3, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{msg.avatar}</span>
                        <span className="text-[11px] font-semibold" style={{ color: msg.color }}>{msg.user}</span>
                        <span className="text-[8px] text-[rgba(255,255,255,0.25)]">{msg.time}</span>
                      </div>
                      <div className="pl-6 space-y-0.5">
                        {msg.content.map((line, j) => (
                          <p key={j} className="text-[10px] text-[rgba(255,255,255,0.6)] leading-[150%]">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="mt-3 flex items-center gap-2 bg-[rgba(255,255,255,0.05)] rounded-lg px-3 py-2">
                  <span className="text-[10px] text-[rgba(255,255,255,0.25)]">Ask Rev Orchestra...</span>
                </div>
              </div>

              {/* Home indicator */}
              <div className="bg-[#1A1D21] px-0 pb-2 pt-1 flex justify-center">
                <div className="w-[100px] h-[4px] rounded-full bg-[rgba(255,255,255,0.15)]" />
              </div>
            </div>

            {/* Floating glow behind phone */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-orange/6 blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
