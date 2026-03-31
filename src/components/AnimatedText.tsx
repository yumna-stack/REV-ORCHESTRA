"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const tools = ["Clay", "Instantly", "HubSpot", "Slack", "n8n", "LinkedIn"];
const actions = [
  "finding warm leads",
  "writing personalised outreach",
  "updating your CRM",
  "monitoring buying signals",
  "briefing your reps",
  "watching your pipeline",
];

export default function AnimatedText() {
  const [toolIdx, setToolIdx] = useState(0);
  const [actionIdx, setActionIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setToolIdx((i) => (i + 1) % tools.length), 2500);
    const t2 = setInterval(() => setActionIdx((i) => (i + 1) % actions.length), 3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <section className="relative w-full py-16 bg-[rgb(8,8,15)] overflow-hidden">
      {/* Warm gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] rounded-full bg-accent-orange/8 blur-[120px]" />
      </div>

      <div className="max-w-[900px] mx-auto px-5 relative z-10">
        {/* Tool logos cycling */}
        <Reveal variants={fadeUp} className="text-center mb-10">
          <p className="text-[rgba(255,255,255,0.5)] text-lg mb-4">
            We&apos;re building GTM systems connected to
          </p>
          <div className="h-[48px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={tools[toolIdx]}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-bold text-accent-orange"
                style={{ fontFamily: "var(--font-family-heading)" }}
              >
                {tools[toolIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Separator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.1)]" />
          <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest">Live System</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(255,255,255,0.1)]" />
        </div>

        {/* Actions cycling */}
        <Reveal variants={fadeUp} className="text-center">
          <p className="text-[rgba(255,255,255,0.5)] text-lg mb-4">
            Right now, our agents are
          </p>
          <div className="h-[36px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={actions[actionIdx]}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="text-xl text-white font-medium"
              >
                {actions[actionIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Floating side icons */}
      <motion.div
        className="absolute left-6 top-1/4 w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-center"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[rgba(255,255,255,0.3)] text-lg">⚡</span>
      </motion.div>
      <motion.div
        className="absolute right-6 top-1/3 w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-center"
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[rgba(255,255,255,0.3)] text-lg">🤖</span>
      </motion.div>
      <motion.div
        className="absolute left-10 bottom-1/4 w-10 h-10 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-center"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-[rgba(255,255,255,0.3)] text-sm">🔗</span>
      </motion.div>
      <motion.div
        className="absolute right-10 bottom-1/3 w-10 h-10 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex items-center justify-center"
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-[rgba(255,255,255,0.3)] text-sm">📊</span>
      </motion.div>
    </section>
  );
}
