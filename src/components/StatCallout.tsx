"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const stats = [
  { value: "6.5", unit: "hrs", label: "lost per founder per day on manual GTM", color: "#EF4444" },
  { value: "0", unit: "hrs", label: "with Rev Orchestra running your system", color: "#22C55E" },
];

export default function StatCallout() {
  return (
    <section className="relative w-full py-16 bg-[rgb(14,15,17)] overflow-hidden">
      <div className="max-w-[900px] mx-auto px-5">
        <Reveal variants={fadeUp}>
          <div className="relative rounded-[28px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-10 overflow-hidden">
            {/* Orange glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent-orange/8 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    className="text-[72px] font-bold leading-none tracking-[-3px]"
                    style={{ color: stat.color, fontFamily: "var(--font-family-heading)" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", delay: i * 0.2 }}
                  >
                    {stat.value}<span className="text-3xl ml-1">{stat.unit}</span>
                  </motion.div>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] mt-2 max-w-[200px]">{stat.label}</p>
                </div>
              ))}

              {/* Divider with arrow */}
              <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
                <motion.div
                  className="w-px h-16 bg-gradient-to-b from-[#EF4444] to-[#22C55E]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <path d="M10 4v12M6 12l4 4 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>
            </div>

            <Reveal variants={fadeUp} delay={0.5} className="text-center mt-8">
              <p className="text-[rgba(255,255,255,0.35)] text-sm">
                Founders spend 6.5 hours daily connecting tools, checking signals, and writing outreach manually.
                <br />
                <span className="text-white font-medium">Rev Orchestra automates the entire motion.</span>
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
