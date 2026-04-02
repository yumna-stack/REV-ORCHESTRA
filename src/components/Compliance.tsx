"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  flipUp,
  zoomRotate,
} from "@/components/motion";

const trustItems = [
  {
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    title: "AI Guardrails",
    description: "Every AI agent operates within strict guardrails: rate limits, content filters, and action boundaries. No agent can send, delete, or modify without predefined safety checks.",
    tag: "Active",
  },
  {
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    title: "Role-Based Access Control",
    description: "RBAC ensures every team member only sees and controls what they need. Admin, operator, and viewer roles with granular permissions across all agents and tools.",
    tag: "Enforced",
  },
  {
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    title: "Human-in-the-Loop",
    description: "Critical actions require human approval before execution. You set the thresholds: which agent actions auto-run and which need your sign-off.",
    tag: "Default On",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    title: "Full Audit Trail",
    description: "Every agent action is logged with timestamp, context, and outcome. Review anything, anytime. Exportable logs for compliance reporting.",
    tag: "Always On",
  },
  {
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Your Stack, Your Data",
    description: "Everything runs inside your own tool instances: your n8n, your CRM, your enrichment accounts. Nothing passes through our servers. We build it, you own it.",
    tag: "Architecture",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "GDPR-Aware Sources",
    description: "All enrichment data sources (Clay, Apollo, LinkedIn) operate under GDPR-compliant terms. We only use providers with documented data processing agreements.",
    tag: "Compliant",
  },
];

export default function Compliance() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(8,8,15)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <Reveal variants={flipUp}>
          <div className="text-center mb-6" style={{ perspective: "1000px" }}>
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Security &amp; Compliance</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              HOW WE HANDLE YOUR DATA
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[550px] mx-auto mb-16 leading-relaxed">
            Your business data is not our product. Guardrails, role-based access, and full audit trails, built into every system from day one.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((item, i) => (
            <StaggerItem key={i} variants={zoomRotate}>
              <motion.div
                className="rounded-[20px] bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 h-full"
                whileHover={{ borderColor: "rgba(232,86,0,0.15)", y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                  </div>
                  <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-1 rounded-full font-medium uppercase tracking-wider">{item.tag}</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-[rgba(255,255,255,0.45)] text-sm leading-[170%]">{item.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
