"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";
import Image from "next/image";

/* Tools with real SVG logo files */
const stackTools = [
  { name: "HubSpot", logo: "/logos/hubspot.svg", bg: "#FFF4F0" },
  { name: "Slack", logo: "/logos/slack.svg", bg: "#F5F0F7" },
  { name: "LinkedIn", logo: "/logos/linkedin.svg", bg: "#EEF4FB" },
  { name: "n8n", logo: "/logos/n8n.svg", bg: "#FDF0F3" },
  { name: "Clay", logo: "/logos/clay.svg", bg: "#EEEDFB" },
  { name: "Instantly", logo: "/logos/instantly.svg", bg: "#EDF4FC" },
  { name: "Claude", logo: "/logos/claude.svg", bg: "#F7F0E8" },
  { name: "Apollo", logo: "/logos/apollo.svg", bg: "#EEEDFB" },
];

/* Capability grid */
const capabilities = [
  {
    title: "Prospect",
    items: [
      { label: "Signal Detection", tools: ["hubspot", "linkedin", "zapier"] },
      { label: "Account Research", tools: ["clay", "apollo", "google"] },
      { label: "ICP Matching", tools: ["salesforce", "hubspot", "airtable"] },
      { label: "Contact Enrichment", tools: ["clay", "apollo", "linkedin"] },
    ],
  },
  {
    title: "Engage",
    items: [
      { label: "Email Sequences", tools: ["instantly", "hubspot", "claude"] },
      { label: "LinkedIn Outreach", tools: ["linkedin", "clay", "n8n"] },
      { label: "Multi-Channel", tools: ["slack", "instantly", "hubspot"] },
      { label: "Follow-up Automation", tools: ["n8n", "instantly", "claude"] },
    ],
  },
  {
    title: "Orchestrate",
    items: [
      { label: "CRM Updates", tools: ["hubspot", "salesforce", "n8n"] },
      { label: "Pipeline Monitoring", tools: ["hubspot", "slack", "airtable"] },
      { label: "Agent Coordination", tools: ["n8n", "claude", "slack"] },
      { label: "Performance Alerts", tools: ["slack", "zapier", "n8n"] },
    ],
  },
];

/* ── Scroll-driven stacking card animation ── */
function StackedCards() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative h-[400px] flex items-center justify-center">
      {stackTools.map((tool, i) => {
        const total = stackTools.length;
        /* Each card settles to a slightly different position in the stack */
        const finalRotate = (i - total / 2) * 3;
        const finalX = (i - total / 2) * 6;
        const finalY = (i - total / 2) * 3;
        const zIdx = total - Math.abs(Math.round(i - total / 2));

        return (
          <motion.div
            key={tool.name}
            className="absolute w-[130px] h-[130px] rounded-[28px] flex flex-col items-center justify-center gap-2 shadow-xl cursor-pointer"
            style={{
              backgroundColor: tool.bg,
              zIndex: zIdx,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
            }}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -200 : 200,
              y: i < total / 2 ? -100 : 100,
              rotate: (i - total / 2) * 15,
              scale: 0.6,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: finalX,
                    y: finalY,
                    rotate: finalRotate,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              delay: i * 0.12,
              duration: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
            whileHover={{
              y: finalY - 25,
              rotate: 0,
              scale: 1.1,
              zIndex: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              transition: { duration: 0.3 },
            }}
          >
            <Image src={tool.logo} alt={tool.name} width={48} height={48} className="rounded-lg" />
            <span className="text-[9px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wider">{tool.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-6">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">Integrations</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Upgrade your legacy stack with <span className="text-accent-orange italic">one orchestrated system.</span>
          </h2>
        </Reveal>

        {/* Stacked cards animation — cards fly in and stack */}
        <StackedCards />

        {/* 3-column capability grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-10">
          {capabilities.map((col) => (
            <StaggerItem key={col.title}>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">{col.title}</h3>
                <div className="flex flex-col gap-3">
                  {col.items.map((item, j) => (
                    <motion.div
                      key={j}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.08 }}
                    >
                      <span className="text-xs text-[rgba(255,255,255,0.6)]">{item.label}</span>
                      <div className="flex items-center gap-1.5">
                        {item.tools.map((t) => (
                          <Image key={t} src={`/logos/${t}.svg`} alt={t} width={18} height={18} className="rounded-sm" />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Legacy stack comparison */}
        <Reveal variants={fadeUp} className="max-w-[600px] mx-auto">
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="absolute -top-6 left-1/4 w-px h-6 bg-[rgba(255,255,255,0.08)]" />
            <div className="absolute -top-6 left-1/2 w-px h-6 bg-[rgba(255,255,255,0.08)]" />
            <div className="absolute -top-6 left-3/4 w-px h-6 bg-[rgba(255,255,255,0.08)]" />
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-sm text-[rgba(255,255,255,0.4)]">Legacy stack</span>
              <span className="text-sm text-[rgba(255,255,255,0.3)] line-through">$3,500/month</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-accent-orange flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                </div>
                <span className="text-sm text-white font-medium">With Rev Orchestra</span>
              </div>
              <span className="text-sm text-accent-orange font-bold">$18,000 once — yours forever</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Horizontal scrolling logo strip (ash/muted) */}
      <div className="relative mt-14 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...stackTools, ...stackTools, ...stackTools, ...stackTools].map((tool, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 opacity-15 hover:opacity-30 transition-opacity">
              <Image src={tool.logo} alt={tool.name} width={16} height={16} style={{ filter: "grayscale(1) brightness(0.6)" }} />
              <span className="text-[rgba(255,255,255,0.15)] text-sm font-medium tracking-wider uppercase">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
