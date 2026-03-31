"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const agents = [
  {
    number: "01",
    title: "The Outbound Agent",
    description:
      "Runs your multi-channel outreach without you managing it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "The Copy Agent",
    description:
      "Writes every message in your voice, personalised to the account.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "The Research Agent",
    description:
      "Briefs you on every account before anyone touches it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "The Signal Agent",
    description:
      "Catches buying windows the moment they open.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h2" />
        <path d="M6.5 6.5l1.4 1.4" />
        <path d="M12 2v2" />
        <path d="M17.5 6.5l-1.4 1.4" />
        <path d="M22 12h-2" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 16v6" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "The CRM Agent",
    description:
      "Keeps your CRM honest without your team touching it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "The Monitoring Agent",
    description:
      "Tells you when something breaks before it costs you a deal.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function SixAgents() {
  return (
    <section id="agents" className="relative w-full py-24 md:py-32 bg-[rgb(8,8,15)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
                The System
              </span>
            </div>
            <h2
              className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              THE REV ORCHESTRA SYSTEM
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-lg md:text-xl text-accent-orange font-medium max-w-[700px] mx-auto mb-4">
            Six agents. One system. Talking to each other, all the time.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.2}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[720px] mx-auto mb-16 leading-relaxed">
            Think of it like this: instead of you checking six different tools every
            morning and connecting the dots manually, six specialists are doing it
            continuously — and they never forget a conversation, never miss a signal,
            and never take a day off.
          </p>
        </Reveal>

        {/* Agent Cards Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {agents.map((agent) => (
            <StaggerItem key={agent.number} variants={popIn}>
              <motion.div
                className="group relative rounded-[20px] p-6 bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] transition-colors duration-300 hover:border-accent-orange/60"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon area with pulse */}
                <div className="relative mb-5 w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-accent-orange/20"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative z-10">{agent.icon}</span>
                </div>

                {/* Number */}
                <span className="text-accent-orange text-sm font-mono font-semibold tracking-wider mb-2 block">
                  {agent.number}
                </span>

                {/* Title */}
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  {agent.title}
                </h3>

                {/* Description */}
                <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed">
                  {agent.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
