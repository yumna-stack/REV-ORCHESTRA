"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Map the Gaps",
    timeline: "Week 1\u20132",
    description:
      "We audit your ICP, messaging, signals, CRM, and tools to find what\u2019s broken, what\u2019s missing, and what the system needs to fix first.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design the Machine",
    timeline: "Week 2\u20133",
    description:
      "We design the full architecture before anything goes live: agent roles, signal triggers, outreach logic, CRM flows, and review checkpoints.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Build the Orchestra",
    timeline: "Week 3\u201310",
    description:
      "We deploy six agents into your stack and connect the handoffs between signals, research, copy, outreach, CRM, and monitoring.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Hand the Keys Over",
    timeline: "Week 11\u201312",
    description:
      "We test on live data, document everything, train your team, and hand over a system you own and can keep running after we leave.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      </svg>
    ),
  },
];

/* Mini product-oriented visual inside each card */
function MiniVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="flex flex-col gap-1.5 mt-auto pt-5">
        {["ICP Definition", "Signal Sources", "CRM Health", "Tool Stack"].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded flex items-center justify-center"
              style={{ backgroundColor: i < 3 ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.06)" }}
            >
              {i < 3 ? (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)]" />
              )}
            </div>
            <span className="text-[10px] text-[rgba(255,255,255,0.3)]">{item}</span>
          </div>
        ))}
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="mt-auto pt-5 flex items-end gap-1.5">
        {[36, 55, 42, 65, 30, 48].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: h,
              background: `linear-gradient(to top, rgba(232,86,0,${0.1 + i * 0.025}), rgba(232,86,0,0.02))`,
              border: "1px solid rgba(232,86,0,0.08)",
              borderBottom: "none",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease }}
          />
        ))}
      </div>
    );
  }
  if (step === 2) {
    const agents = ["S", "R", "C", "O", "CR", "M"];
    return (
      <div className="mt-auto pt-5 flex items-center justify-center gap-1.5">
        {agents.map((a, i) => (
          <motion.div
            key={a}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{
              backgroundColor: "rgba(232,86,0,0.08)",
              border: "1px solid rgba(232,86,0,0.15)",
              color: "rgba(232,86,0,0.7)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 300, damping: 18 }}
          >
            {a}
          </motion.div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-auto pt-5 flex items-center gap-2.5">
      <div className="flex -space-x-2">
        {["D", "T", "Y"].map((l, i) => (
          <div
            key={l}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{
              backgroundColor: i === 0 ? "rgba(232,86,0,0.2)" : "rgba(255,255,255,0.06)",
              border: `1.5px solid ${i === 0 ? "rgba(232,86,0,0.35)" : "rgba(255,255,255,0.1)"}`,
              color: i === 0 ? "#E85600" : "rgba(255,255,255,0.4)",
              zIndex: 3 - i,
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))", border: "1px solid rgba(74,222,128,0.2)" }}
      >
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-28 md:py-36 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* ── Centered header ── */}
        <Reveal variants={fadeUp} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
              How It Works
            </span>
          </div>
          <h2
            className="text-[clamp(28px,4.2vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            Four steps. 90 days.<br className="hidden sm:block" /> One system you own.
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.42)] leading-[160%] max-w-[580px] mx-auto">
            We map the gaps, design the system, build the agents, and hand over a working GTM engine your team can actually run.
          </p>
        </Reveal>

        {/* ── 4 connected step cards ── */}
        <div className="relative">
          {/* Horizontal connecting line behind cards (desktop) */}
          <div
            className="hidden lg:block absolute top-[46%] left-[10%] right-[10%] h-px z-0"
            style={{
              background: "linear-gradient(to right, transparent, rgba(232,86,0,0.12) 15%, rgba(232,86,0,0.12) 85%, transparent)",
            }}
          />
          {/* Animated dot traveling the line */}
          <motion.div
            className="hidden lg:block absolute top-[46%] w-2 h-2 rounded-full z-[1]"
            style={{
              backgroundColor: "#E85600",
              boxShadow: "0 0 10px rgba(232,86,0,0.5)",
              transform: "translateY(-50%)",
            }}
            animate={{ left: ["10%", "90%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="group relative z-10 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              >
                {/* Outer wrapper — Cryps double-border style */}
                <div
                  className="rounded-[28px] p-[1px] h-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <div
                    className="relative rounded-[26px] overflow-hidden h-full flex flex-col"
                    style={{
                      background: "rgb(18,19,22)",
                      border: "1px solid rgba(41,42,43,0.8)",
                    }}
                  >
                    {/* Top glow line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #E85600 30%, #E85600 70%, transparent 100%)",
                      }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    />
                    {/* Diffuse glow behind top line */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[50%] h-12 bg-accent-orange/8 blur-2xl rounded-full pointer-events-none" />

                    <div className="p-6 flex flex-col flex-1" style={{ minHeight: 300 }}>
                      {/* Step number + icon */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="text-[11px] font-bold tracking-wider uppercase"
                          style={{ color: "rgba(232,86,0,0.7)" }}
                        >
                          Step {step.number}
                        </span>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300"
                          style={{
                            backgroundColor: "rgba(232,86,0,0.06)",
                            border: "1px solid rgba(232,86,0,0.1)",
                            color: "rgba(232,86,0,0.6)",
                          }}
                        >
                          {step.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-[18px] font-semibold text-white leading-[130%] mb-1"
                        style={{ fontFamily: "var(--font-family-heading)", letterSpacing: "-0.02em" }}
                      >
                        {step.title}
                      </h3>

                      {/* Timeline */}
                      <span className="text-[11px] font-medium text-[rgba(255,255,255,0.25)] mb-3">
                        {step.timeline}
                      </span>

                      {/* Description */}
                      <p className="text-[13px] text-[rgba(255,255,255,0.38)] leading-[165%]">
                        {step.description}
                      </p>

                      {/* Mini product visual */}
                      <MiniVisual step={i} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
