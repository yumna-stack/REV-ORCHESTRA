"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";

const steps = [
  {
    number: "1",
    title: "Diagnose",
    desc: "your GTM gaps before building anything.",
    visual: {
      type: "dashboard",
      items: [
        { label: "ICP Coverage", value: "34%", status: "critical" },
        { label: "Signal Layer", value: "None", status: "critical" },
        { label: "CRM Health", value: "52%", status: "warning" },
        { label: "Outbound Reply Rate", value: "1.2%", status: "critical" },
        { label: "Tool Integration", value: "2 of 6", status: "warning" },
      ],
    },
  },
  {
    number: "2",
    title: "Design",
    desc: "the full system architecture on paper.",
    visual: {
      type: "blueprint",
      agents: ["Signal Scanner", "ICP Matcher", "Copy Writer", "Outbound", "CRM Sync", "Monitor"],
      connections: true,
    },
  },
  {
    number: "3",
    title: "Build",
    desc: "six AI agents, connected to your stack.",
    visual: {
      type: "agents",
      items: [
        { name: "Signal Agent", status: "Active", signals: 127 },
        { name: "Research Agent", status: "Active", signals: 84 },
        { name: "Copy Agent", status: "Active", signals: 312 },
        { name: "Outbound Agent", status: "Active", signals: 1420 },
        { name: "CRM Agent", status: "Syncing", signals: 89 },
        { name: "Monitor Agent", status: "Watching", signals: 24 },
      ],
    },
  },
  {
    number: "4",
    title: "Hand Over",
    desc: "the keys. It's yours permanently.",
    visual: {
      type: "results",
      metrics: [
        { label: "Meetings Booked", value: "11/mo", delta: "+450%" },
        { label: "Reply Rate", value: "8.7%", delta: "+625%" },
        { label: "Pipeline Value", value: "$340K", delta: "New" },
        { label: "Tools Cancelled", value: "4", delta: "-$2.8K/mo" },
      ],
    },
  },
];

export default function ProcessVisual() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <Reveal variants={fadeUp} className="text-center mb-16">
          <p className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-widest mb-3">The Process</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
            Four steps. 90 days. <span className="text-accent-orange italic">Then it&apos;s yours.</span>
          </h2>
        </Reveal>

        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="group rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden hover:border-[rgba(232,101,10,0.15)] transition-colors duration-500">
                {/* Header */}
                <div className="p-6 pb-3">
                  <h3 className="text-accent-orange text-xl font-semibold mb-1" style={{ fontFamily: "var(--font-family-heading)" }}>
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)]">{step.desc}</p>
                </div>

                {/* Visual mockup */}
                <div className="mx-4 mb-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.3)] overflow-hidden">
                  {/* Mac-style top bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                    <span className="text-[9px] text-[rgba(255,255,255,0.2)] ml-3">Rev Orchestra — {step.title}</span>
                  </div>

                  {/* Content area */}
                  <div className="p-4 min-h-[200px]">
                    {step.visual.type === "dashboard" && (
                      <div className="space-y-2">
                        {(step.visual.items as Array<{label:string;value:string;status:string}>)?.map((item, j) => (
                          <motion.div
                            key={j}
                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-[rgba(255,255,255,0.03)]"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.1 }}
                          >
                            <span className="text-xs text-[rgba(255,255,255,0.5)]">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{item.value}</span>
                              <div className={`w-2 h-2 rounded-full ${item.status === "critical" ? "bg-red-500" : "bg-yellow-500"}`} />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.visual.type === "blueprint" && (
                      <div className="grid grid-cols-3 gap-3">
                        {step.visual.agents?.map((agent, j) => (
                          <motion.div
                            key={j}
                            className="relative flex flex-col items-center gap-2 p-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.08 }}
                          >
                            <div className="w-8 h-8 rounded-lg bg-accent-orange/15 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-accent-orange/60" />
                            </div>
                            <span className="text-[9px] text-[rgba(255,255,255,0.5)] text-center leading-tight">{agent}</span>
                            {/* Connection lines */}
                            {j < 5 && <div className="absolute -right-2 top-1/2 w-4 h-px bg-[rgba(232,101,10,0.2)]" />}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.visual.type === "agents" && (
                      <div className="space-y-1.5">
                        {(step.visual.items as Array<{name:string;status:string;signals:number}>)?.map((agent, j) => (
                          <motion.div
                            key={j}
                            className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[rgba(255,255,255,0.03)]"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + j * 0.08 }}
                          >
                            <div className="flex items-center gap-2">
                              <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                              />
                              <span className="text-[11px] text-white">{agent.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] text-green-400">{agent.status}</span>
                              <span className="text-[9px] text-[rgba(255,255,255,0.3)]">{agent.signals} actions</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {step.visual.type === "results" && (
                      <div className="grid grid-cols-2 gap-3">
                        {step.visual.metrics?.map((m, j) => (
                          <motion.div
                            key={j}
                            className="p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.1 }}
                          >
                            <span className="text-[9px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">{m.label}</span>
                            <div className="text-xl font-bold text-white mt-1">{m.value}</div>
                            <span className="text-[10px] text-green-400 font-medium">{m.delta}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
