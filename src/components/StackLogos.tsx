"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";
import Image from "next/image";

const primaryTools = [
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Clay", logo: "/logos/clay.svg" },
  { name: "Instantly", logo: "/logos/instantly.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "LinkedIn", logo: "/logos/linkedin.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "Apollo", logo: "/logos/apollo.svg" },
];

const secondaryTools = [
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Zoom", logo: "/logos/zoom.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "50+ more", logo: "" },
];

const allLogos = [...primaryTools, ...secondaryTools, ...primaryTools, ...secondaryTools];

/* ── 3-column capability grid (FuseAI style) ── */
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

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-14">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">Integrations</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Upgrade your legacy stack with <span className="text-accent-orange italic">one orchestrated system.</span>
          </h2>
        </Reveal>

        {/* 3-column capability grid (FuseAI style) */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
        <Reveal variants={fadeUp} className="max-w-[600px] mx-auto mb-14">
          <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            {/* Connection lines */}
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

        {/* Primary tools — icon grid */}
        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-6 max-w-[700px] mx-auto">
          {primaryTools.map((tool) => (
            <StaggerItem key={tool.name}>
              <motion.div
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] transition-all"
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <Image src={tool.logo} alt={tool.name} width={28} height={28} />
                <span className="text-[9px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{tool.name}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Secondary tools row */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-[600px] mx-auto">
          {secondaryTools.map((tool) => (
            <div key={tool.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)]">
              {tool.logo && <Image src={tool.logo} alt={tool.name} width={14} height={14} />}
              <span className="text-[10px] text-[rgba(255,255,255,0.3)]">{tool.name}</span>
            </div>
          ))}
        </div>
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
          {allLogos.map((tool, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 opacity-15 hover:opacity-30 transition-opacity">
              {tool.logo && <Image src={tool.logo} alt={tool.name} width={16} height={16} style={{ filter: "grayscale(1) brightness(0.6)" }} />}
              <span className="text-[rgba(255,255,255,0.15)] text-sm font-medium tracking-wider uppercase">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
