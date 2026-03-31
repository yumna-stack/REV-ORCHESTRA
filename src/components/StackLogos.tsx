"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const stack = [
  { name: "n8n", letter: "n", bg: "#EA4B71", color: "#fff" },
  { name: "Claude", letter: "C", bg: "#D4A574", color: "#fff" },
  { name: "Clay", letter: "C", bg: "#4F46E5", color: "#fff" },
  { name: "Instantly", letter: "I", bg: "#3B82F6", color: "#fff" },
  { name: "HubSpot", letter: "H", bg: "#FF7A59", color: "#fff" },
  { name: "Slack", letter: "S", bg: "#fff", color: "#E01E5A" },
  { name: "LinkedIn", letter: "in", bg: "#0A66C2", color: "#fff" },
  { name: "Apollo", letter: "A", bg: "#6366F1", color: "#fff" },
];

export default function StackLogos() {
  return (
    <section className="relative w-full py-20 bg-[rgb(14,15,17)]">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Stacked cards visual */}
          <motion.div
            className="relative flex items-center justify-center h-[360px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stack.map((tool, i) => {
              const total = stack.length;
              const offset = (i - total / 2) * 4;
              const rotate = (i - total / 2) * 2.5;
              const zIndex = total - Math.abs(i - total / 2);

              return (
                <motion.div
                  key={tool.name}
                  className="absolute w-[140px] h-[140px] rounded-[28px] flex items-center justify-center shadow-2xl"
                  style={{
                    backgroundColor: tool.bg,
                    zIndex,
                    boxShadow: `0 ${8 + i * 2}px ${30 + i * 5}px rgba(0,0,0,0.3)`,
                  }}
                  initial={{ opacity: 0, y: 60, rotate: 0, x: 0 }}
                  whileInView={{
                    opacity: 1,
                    y: offset * 1.5,
                    x: offset * 2,
                    rotate,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: offset * 1.5 - 20,
                    scale: 1.08,
                    rotate: 0,
                    zIndex: 20,
                    transition: { duration: 0.3 },
                  }}
                >
                  <span
                    className="text-4xl font-bold select-none"
                    style={{ color: tool.color }}
                  >
                    {tool.letter}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right — Text */}
          <Reveal variants={fadeUp}>
            <div className="flex flex-col gap-5">
              <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.2em]">The Rev Orchestra Stack</p>
              <h2
                className="text-[clamp(28px,4vw,44px)] font-medium leading-[115%] tracking-[-2px] text-white"
                style={{ fontFamily: "var(--font-family-heading)" }}
              >
                Built with the tools <span className="text-accent-orange italic">you already use.</span>
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">
                We don&apos;t replace your stack — we connect it. Rev Orchestra plugs into Clay, Instantly, HubSpot, Slack, and the rest. One system, every tool talking to each other.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {stack.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.5)]"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
