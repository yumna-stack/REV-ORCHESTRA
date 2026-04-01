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
  { name: "X/Twitter", key: "twitter" },
];

const row2 = [
  { name: "Salesforce", key: "salesforce" },
  { name: "Google", key: "google" },
  { name: "Notion", key: "notion" },
  { name: "Zoom", key: "zoom" },
  { name: "Stripe", key: "stripe" },
  { name: "Airtable", key: "airtable" },
  { name: "Zapier", key: "zapier" },
  { name: "50+", key: "" },
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
            style={{
              filter:
                "grayscale(1) brightness(1.4) contrast(0.85)",
            }}
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
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Plugs into{" "}
            <span className="text-accent-orange italic">your entire stack.</span>
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.4)] mt-3 max-w-[500px] mx-auto">
            We don&apos;t replace your tools — we connect them. One system,
            every tool talking to each other.
          </p>
        </Reveal>

        {/* ── Framer-style 2-row icon grid ── */}
        <div className="flex flex-col gap-6 max-w-[750px] mx-auto mb-14">
          {/* Row 1 */}
          <div className="flex justify-center gap-5 md:gap-8 flex-wrap">
            {row1.map((tool, i) => (
              <AshIcon key={tool.name} tool={tool} index={i} row={0} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex justify-center gap-5 md:gap-8 flex-wrap">
            {row2.map((tool, i) => (
              <AshIcon key={tool.name} tool={tool} index={i} row={1} />
            ))}
          </div>
        </div>

        {/* Explore All CTA */}
        <Reveal variants={fadeUp} className="text-center mb-14">
          <motion.a
            href="/resources"
            className="inline-flex items-center gap-2 px-7 py-3 bg-accent-orange text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            EXPLORE ALL
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
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
                $18,000 once — yours forever
              </span>
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
          {[...row1, ...row2.filter((t) => t.key), ...row1, ...row2.filter((t) => t.key)].map(
            (tool, i) => (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0 opacity-40 hover:opacity-70 transition-opacity"
              >
                <BrandLogo
                  name={tool.key}
                  size={28}
                  style={{ filter: "grayscale(1) brightness(1.2)" }}
                />
                <span className="text-[rgba(255,255,255,0.3)] text-sm font-medium tracking-wider uppercase">
                  {tool.name}
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
