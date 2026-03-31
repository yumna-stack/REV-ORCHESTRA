"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

const stackTools = [
  { name: "HubSpot", key: "hubspot", bg: "#FFF4F0" },
  { name: "Slack", key: "slack", bg: "#F5F0F7" },
  { name: "LinkedIn", key: "linkedin", bg: "#EEF4FB" },
  { name: "n8n", key: "n8n", bg: "#FDF0F3" },
  { name: "Clay", key: "clay", bg: "#EEEDFB" },
  { name: "Instantly", key: "instantly", bg: "#EDF4FC" },
  { name: "Claude", key: "claude", bg: "#F7F0E8" },
  { name: "Apollo", key: "apollo", bg: "#EEEDFB" },
];

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

/* ── Scroll-driven stacking cards with REAL logos ── */
function StackedCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative h-[400px] flex items-center justify-center">
      {stackTools.map((tool, i) => {
        const total = stackTools.length;
        const finalRotate = (i - total / 2) * 3;
        const finalX = (i - total / 2) * 6;
        const finalY = (i - total / 2) * 3;
        const zIdx = total - Math.abs(Math.round(i - total / 2));

        return (
          <motion.div
            key={tool.name}
            className="absolute w-[130px] h-[130px] rounded-[28px] flex flex-col items-center justify-center gap-2 cursor-pointer"
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
            animate={isInView ? { opacity: 1, x: finalX, y: finalY, rotate: finalRotate, scale: 1 } : {}}
            transition={{ delay: i * 0.12, duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
            whileHover={{ y: finalY - 25, rotate: 0, scale: 1.1, zIndex: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", transition: { duration: 0.3 } }}
          >
            <BrandLogo name={tool.key} size={48} className="rounded-lg" />
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
        <Reveal variants={fadeUp} className="text-center mb-6">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">Integrations</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Upgrade your legacy stack with <span className="text-accent-orange italic">one orchestrated system.</span>
          </h2>
        </Reveal>

        <StackedCards />

        {/* Capability grid with real logos */}
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
                      <div className="flex items-center gap-2">
                        {item.tools.map((t) => (
                          <BrandLogo key={t} name={t} size={20} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Legacy comparison */}
        <Reveal variants={fadeUp} className="max-w-[600px] mx-auto">
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-sm text-[rgba(255,255,255,0.4)]">Legacy stack</span>
              <span className="text-sm text-[rgba(255,255,255,0.3)] line-through">$3,500/month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium">With Rev Orchestra</span>
              <span className="text-sm text-accent-orange font-bold">$18,000 once — yours forever</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scrolling logo strip with REAL logos */}
      <div className="relative mt-14 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...stackTools, ...stackTools, ...stackTools, ...stackTools].map((tool, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 opacity-30 hover:opacity-60 transition-opacity">
              <BrandLogo name={tool.key} size={20} className="grayscale brightness-75" />
              <span className="text-[rgba(255,255,255,0.25)] text-sm font-medium tracking-wider uppercase">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
