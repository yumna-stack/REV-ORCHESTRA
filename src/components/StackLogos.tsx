"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const stack = [
  { name: "n8n", color: "#EA4B71" },
  { name: "Claude", color: "#D4A574" },
  { name: "Clay", color: "#4F46E5" },
  { name: "Instantly", color: "#3B82F6" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Slack", color: "#E01E5A" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Apollo", color: "#6366F1" },
];

export default function StackLogos() {
  return (
    <section className="relative w-full py-14 bg-[rgb(14,15,17)]">
      <div className="max-w-[1000px] mx-auto px-5">
        <Reveal variants={fadeUp} className="text-center mb-8">
          <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em]">Built with the tools you already use</p>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {stack.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${tool.color}20` }}>
                <span className="text-[10px] font-bold" style={{ color: tool.color }}>{tool.name[0]}</span>
              </div>
              <span className="text-sm text-[rgba(255,255,255,0.6)] font-medium">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
