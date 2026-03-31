"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";

const stackTools = [
  { name: "HubSpot", key: "hubspot" },
  { name: "Slack", key: "slack" },
  { name: "LinkedIn", key: "linkedin" },
  { name: "n8n", key: "n8n" },
  { name: "Clay", key: "clay" },
  { name: "Instantly", key: "instantly" },
  { name: "Claude", key: "claude" },
  { name: "Apollo", key: "apollo" },
  { name: "Salesforce", key: "salesforce" },
  { name: "Google", key: "google" },
  { name: "Notion", key: "notion" },
  { name: "Zoom", key: "zoom" },
  { name: "Stripe", key: "stripe" },
  { name: "Airtable", key: "airtable" },
  { name: "Zapier", key: "zapier" },
  { name: "50+ more", key: "" },
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

/* Container + item variants for stagger */
const gridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const capContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
};

const capItem: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-12">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">Integrations</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Plugs into <span className="text-accent-orange italic">your entire stack.</span>
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.4)] mt-3 max-w-[500px] mx-auto">
            We don&apos;t replace your tools — we connect them. One system, every tool talking to each other.
          </p>
        </Reveal>

        {/* 4x4 icon grid — staggered one-by-one reveal */}
        <motion.div
          className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 max-w-[800px] mx-auto mb-14"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stackTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={gridItem}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-default"
              whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.2 } }}
            >
              {tool.key ? (
                <BrandLogo name={tool.key} size={36} className="rounded-lg" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                  <span className="text-[rgba(255,255,255,0.3)] text-lg font-bold">+</span>
                </div>
              )}
              <span className="text-[9px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider font-medium text-center leading-tight">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 3-column capability grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {capabilities.map((col) => (
            <motion.div
              key={col.title}
              variants={capContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">{col.title}</h3>
              <div className="flex flex-col gap-3">
                {col.items.map((item, j) => (
                  <motion.div
                    key={j}
                    variants={capItem}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] transition-colors"
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
            </motion.div>
          ))}
        </div>

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

      {/* Scrolling logo strip */}
      <div className="relative mt-14 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...stackTools.filter(t => t.key), ...stackTools.filter(t => t.key), ...stackTools.filter(t => t.key), ...stackTools.filter(t => t.key)].map((tool, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 opacity-25 hover:opacity-50 transition-opacity">
              <BrandLogo name={tool.key} size={18} className="grayscale brightness-75" />
              <span className="text-[rgba(255,255,255,0.2)] text-sm font-medium tracking-wider uppercase">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
