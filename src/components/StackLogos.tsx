"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import BrandLogo from "@/components/BrandLogo";
import { playTickSound } from "@/lib/sounds";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Tool icons — 2 rows of 8, Framer-style circular ash icons ── */
const row1 = [
  { name: "HubSpot", key: "hubspot" },
  { name: "Slack", key: "slack" },
  { name: "LinkedIn", key: "linkedin" },
  { name: "n8n", key: "n8n" },
  { name: "Clay", key: "clay" },
  { name: "Instantly", key: "instantly" },
  { name: "Claude", key: "claude" },
  { name: "Apollo", key: "apollo" },
  { name: "Salesforce", key: "salesforce" },
  { name: "Zapier", key: "zapier" },
];

const capabilities = [
  {
    title: "Prospect",
    items: [
      { label: "Buying Signal Detection", tools: ["hubspot", "linkedin", "apollo"] },
      { label: "Deep Account Research", tools: ["clay", "apollo", "claude"] },
      { label: "ICP-Matched Targeting", tools: ["salesforce", "hubspot", "clay"] },
      { label: "Auto Contact Enrichment", tools: ["clay", "apollo", "linkedin"] },
    ],
  },
  {
    title: "Engage",
    items: [
      { label: "AI-Written Email Sequences", tools: ["instantly", "claude", "hubspot"] },
      { label: "LinkedIn Touch Sequences", tools: ["linkedin", "clay", "n8n"] },
      { label: "Multi-Channel Orchestration", tools: ["slack", "instantly", "hubspot"] },
      { label: "Smart Follow-up Triggers", tools: ["n8n", "instantly", "claude"] },
    ],
  },
  {
    title: "Orchestrate",
    items: [
      { label: "CRM Auto-Updates", tools: ["hubspot", "salesforce", "n8n"] },
      { label: "Live Pipeline Monitoring", tools: ["hubspot", "slack", "n8n"] },
      { label: "Agent-to-Agent Handoffs", tools: ["n8n", "claude", "slack"] },
      { label: "Real-Time Slack Alerts", tools: ["slack", "zapier", "n8n"] },
    ],
  },
];

/* ── Framer-style circular ash icon ── */
function AshIcon({
  tool,
  index,
  row,
}: {
  tool: { name: string; key: string };
  index: number;
  row: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: row * 0.15 + index * 0.06,
      }}
      whileHover={{
        scale: 1.15,
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => playTickSound()}
      style={{ cursor: "pointer" }}
    >
      {/* Circular icon container — ash grey like Framer */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden">
        {/* Background glow on hover handled by parent motion */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(120,115,110,0.25) 0%, rgba(60,58,55,0.4) 50%, rgba(40,38,35,0.6) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        {/* Inner shadow for depth */}
        <div
          className="absolute inset-[2px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(160,155,150,0.15) 0%, transparent 60%)",
          }}
        />
        {tool.key ? (
          <BrandLogo
            name={tool.key}
            size={28}
            className="relative z-[1] rounded-sm"
          />
        ) : (
          <span className="relative z-[1] text-[rgba(255,255,255,0.4)] text-sm font-bold">
            +
          </span>
        )}
      </div>
      <span className="text-[9px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider font-medium">
        {tool.name}
      </span>
    </motion.div>
  );
}

const capContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
};

const capItem: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease },
  },
};

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      {/* Subtle golden ambient glow behind icons */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(180,160,100,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-14">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">
            Integrations
          </p>
          <h2
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[115%] tracking-[-1.5px] text-white"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Plugs into{" "}
            <span className="text-accent-orange font-semibold">your entire stack.</span>
          </h2>
          <p className="text-[15px] text-[rgba(255,255,255,0.45)] mt-3 max-w-[480px] mx-auto leading-[160%]">
            We don&apos;t replace your tools. We connect them into one GTM system that actually works together.
          </p>
        </Reveal>

        {/* 3-column capability grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {capabilities.map((col) => (
            <motion.div
              key={col.title}
              variants={capContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">
                {col.title}
              </h3>
              <div className="flex flex-col gap-3">
                {col.items.map((item, j) => (
                  <motion.div
                    key={j}
                    variants={capItem}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] transition-colors"
                  >
                    <span className="text-xs text-[rgba(255,255,255,0.6)]">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.tools.map((t) => (
                        <BrandLogo key={t} name={t} size={20} colored />
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
              <span className="text-sm text-[rgba(255,255,255,0.4)]">
                Legacy stack
              </span>
              <span className="text-sm text-[rgba(255,255,255,0.3)] line-through">
                $3,500/month
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium">
                With Rev Orchestra
              </span>
              <span className="text-sm text-accent-orange font-bold">
                $18,000 once, yours forever
              </span>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
