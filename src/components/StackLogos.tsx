"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";

/* ── Integration tools with real SVG icon paths ── */
const primaryTools = [
  { name: "HubSpot", icon: "M17.4 8.3V5.9c.8-.4 1.3-1.2 1.3-2.1 0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4c0 .9.5 1.7 1.3 2.1v2.4c-1.1.2-2.1.7-2.9 1.4l-7.4-5.7c.1-.2.1-.5.1-.7 0-1.2-1-2.2-2.2-2.2S.6 2.1.6 3.3s1 2.2 2.2 2.2c.4 0 .8-.1 1.1-.3l7.3 5.6c-.7 1-1.1 2.3-1.1 3.6 0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3c0-2.9-2-5.4-4.7-6.1z", color: "#FF7A59" },
  { name: "n8n", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z", color: "#EA4B71" },
  { name: "Clay", icon: "M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 2.3L5 8.5v7l7 4.2 7-4.2v-7L12 4.3z", color: "#4F46E5" },
  { name: "Instantly", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#3B82F6" },
  { name: "Slack", icon: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z", color: "#E01E5A" },
  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", color: "#0A66C2" },
  { name: "Claude", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-2 1.2-4.5 1.2-6.5.1l-.5-.3c-1.8-1.1-2.9-3-2.9-5.2 0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.1-1.1 4.1-2.9 5.2l.8.2z", color: "#D4A574" },
  { name: "Apollo", icon: "M12 2L2 19h20L12 2zm0 4l7 11H5l7-11z", color: "#6366F1" },
];

const secondaryTools = [
  { name: "Salesforce", letter: "SF", color: "#00A1E0" },
  { name: "Google", letter: "G", color: "#4285F4" },
  { name: "Notion", letter: "N", color: "#FFFFFF" },
  { name: "Zoom", letter: "Z", color: "#2D8CFF" },
  { name: "Stripe", letter: "S", color: "#635BFF" },
  { name: "Airtable", letter: "A", color: "#18BFFF" },
  { name: "Zapier", letter: "Z", color: "#FF4A00" },
  { name: "50+", letter: "+", color: "#666" },
];

/* ── Scrolling logo strip (muted, ash colored) ── */
const scrollLogos = [...primaryTools, ...secondaryTools, ...primaryTools, ...secondaryTools];

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-14">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em] mb-4">Integrations</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Plugs into <span className="text-accent-orange italic">your entire stack.</span>
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.4)] mt-3 max-w-[500px] mx-auto">
            We don&apos;t replace your tools — we connect them. One system, every tool talking to each other.
          </p>
        </Reveal>

        {/* Primary tools — 4x2 grid with real icons (questom.ai style) */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-[700px] mx-auto">
          {primaryTools.map((tool, i) => (
            <StaggerItem key={tool.name}>
              <motion.div
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 cursor-default"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${tool.color}15` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={tool.color}>
                    <path d={tool.icon} />
                  </svg>
                </div>
                <span className="text-xs text-[rgba(255,255,255,0.6)] font-medium uppercase tracking-wider">{tool.name}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Secondary tools — smaller row */}
        <StaggerContainer staggerDelay={0.06} className="flex flex-wrap items-center justify-center gap-3 mb-14 max-w-[600px] mx-auto">
          {secondaryTools.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${tool.color}20` }}>
                  <span className="text-[8px] font-bold" style={{ color: tool.color }}>{tool.letter}</span>
                </div>
                <span className="text-[11px] text-[rgba(255,255,255,0.5)]">{tool.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Legacy stack comparison */}
        <Reveal variants={fadeUp} className="max-w-[600px] mx-auto">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
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

      {/* ── Horizontal scrolling logo strip (ash/muted) ── */}
      <div className="relative mt-16 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />
        <motion.div
          className="flex items-center gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {scrollLogos.map((tool, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 opacity-20 hover:opacity-40 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill={"color" in tool ? (tool as {color:string}).color : "#666"} opacity={0.5}>
                <path d={"icon" in tool ? (tool as {icon:string}).icon : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
              </svg>
              <span className="text-[rgba(255,255,255,0.2)] text-sm font-medium tracking-wider uppercase">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
