"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

/* ─────────────────────────────────────────────────────────────
 * ServiceFlow — What the 90-day build actually covers.
 * Four stages, in order. No fluff, no metaphors.
 *   1. ICP Discovery — who you sell to
 *   2. Stack Integration — the tools you already pay for
 *   3. Agent Automation — the AI workflow that runs outbound end-to-end
 *   4. Dashboard Delivery — you get the keys
 * ─────────────────────────────────────────────────────────── */

const stages = [
  {
    n: "01",
    title: "ICP Discovery",
    tag: "Weeks 1 to 2",
    oneLiner: "We sit with you and decode who you actually sell to",
    bullets: [
      "Define best fit account profile & buying committee",
      "Identify the high intent signals worth monitoring",
      "Draft the messaging framework by persona",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Stack Integration",
    tag: "Weeks 2 to 3",
    oneLiner: "We plug into the tools you already pay for",
    bullets: [
      "HubSpot or Salesforce sync",
      "Instantly + Clay for outreach & enrichment",
      "LinkedIn, X, Slack for multichannel delivery",
      "n8n / webhooks for anything custom",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Agent Automation",
    tag: "Weeks 3 to 10",
    oneLiner: "We build a fleet of AI agents tailored to your workflow",
    bullets: [
      "Outbound, inbound, research, CX, ops, whatever you run",
      "Each agent has one job and hands off cleanly",
      "Signal triggered, not batch and blast",
      "Human approval gates on decisions that matter",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M14 17.5h-4" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Dashboard Delivery",
    tag: "Day 90",
    oneLiner: "You get the keys, every agent, every task, every dollar visible",
    bullets: [
      "Live agent roster & status",
      "End to end task pipeline",
      "Monthly budget with auto pause ceiling",
      "Audit trail of every action taken",
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M7 21h10M12 17v4M3 13h18" />
      </svg>
    ),
  },
];

export default function ServiceFlow() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "rgb(14,15,17)" }}>
      {/* Ambient orange glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,101,10,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-[11px] text-[rgba(255,255,255,0.55)] tracking-[0.15em] uppercase">What We Do &amp; How</span>
          </div>
          <motion.h2
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
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            {["From", "a", "blank", "ICP", "to", "a", "running"].map((w, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block mr-[0.25em]"
                variants={{
                  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="text-accent-orange inline-block mr-[0.25em]"
              variants={{
                hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <motion.span
                className="inline-block"
                animate={{ filter: ["drop-shadow(0 0 0px rgba(232,101,10,0))", "drop-shadow(0 0 18px rgba(232,101,10,0.45))", "drop-shadow(0 0 0px rgba(232,101,10,0))"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                GTM engine
              </motion.span>
            </motion.span>
            {["in", "four", "stages"].map((w, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block mr-[0.25em]"
                variants={{
                  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-5 text-base md:text-lg text-[rgba(255,255,255,0.5)] leading-[160%] max-w-[640px] mx-auto"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            No templates, no off the shelf SaaS, we study your GTM motion, build a fleet of AI agents to match,
            deploy inside your existing stack then hand the whole system over for you to own
          </motion.p>
        </Reveal>

        {/* Stage cards — 4 columns on desktop, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] p-4 md:p-5 hover:border-[rgba(255,255,255,0.12)] transition-colors duration-300 group"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,101,10,0.10) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                {/* Stage number + icon + timeline tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      {s.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">{s.tag}</span>
                  </div>
                  <span className="text-[36px] font-medium text-[rgba(255,255,255,0.12)] leading-none" style={{ fontFamily: "var(--font-family-heading)" }}>
                    {s.n}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] md:text-[24px] font-medium text-white mb-2.5 leading-[120%] tracking-[-0.5px]" style={{ fontFamily: "var(--font-family-heading)" }}>
                  {s.title}
                </h3>

                {/* One-liner */}
                <p className="text-[14px] text-[rgba(255,255,255,0.75)] leading-[150%] mb-5">
                  {s.oneLiner}
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {s.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 text-[13px] text-[rgba(255,255,255,0.55)] leading-[150%]">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-accent-orange/70 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <Reveal variants={fadeUp}>
          <div className="mt-14 text-center">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] tracking-wide">
              After day 90 you own the system, the agents, the data, the workflow, no retainer, no subscription
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
