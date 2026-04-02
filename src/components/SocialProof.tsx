"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp, fadeRight } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const communityQuotes = [
  {
    text: "We deployed an AI SDR without fixing our playbook first. Two months later: no pipeline and a scorched list. AI just made us fail faster.",
    source: "SaaStr community thread, Feb 2026",
  },
  {
    text: "I have Clay, Apollo, HubSpot, and Instantly. None of them talk to each other. My CRM is a lie and my sequences reset every quarter.",
    source: "r/sales, 2025",
  },
  {
    text: "Outbound isn\u2019t dead. Volume-based, untriggered, spray-and-pray outbound is dead. Teams using signals are getting 8\u201312% reply rates. The rest are at 1%.",
    source: "GTM community, 2026",
  },
  {
    text: "Everybody jumped on AI without strategy. Reply rates went from 18% to single digits once mass AI messaging became the norm.",
    source: "Sales leader, shared publicly",
  },
  {
    text: "The real struggle isn\u2019t just lead gen, it\u2019s the entire GTM funnel. Fragmented tools, scattered data, hours lost trying to connect market intelligence to actual execution.",
    source: "Reddit user, r/sales 2025",
  },
];

const clientResults = [
  {
    text: "Rev Orchestra built the system we should have had at Series A. Three months in: 11 qualified calls booked per month from outbound. Before, that number was 2.",
    source: "[Client Name], CEO",
  },
  {
    text: "The signal agent alone changed our outbound.",
    source: "[Client Name], VP Sales",
  },
  {
    text: "I cancelled four tools after the build. The agents do more than all of them combined. And I own it.",
    source: "[Client Name], Founder",
  },
];

/* ── Orbit Visual — Cryps style with agent icons + client pics ── */
function OrbitVisual({ activeQuote }: { activeQuote: number }) {
  const orbitItems = [
    { icon: "S", label: "Signal" },
    { icon: "R", label: "Research" },
    { icon: "C", label: "Copy" },
    { icon: "O", label: "Outbound" },
    { icon: "CR", label: "CRM" },
    { icon: "M", label: "Monitor" },
  ];

  return (
    <div className="relative w-[340px] h-[340px] mx-auto">
      {/* Outer dashed ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(255,255,255,0.05)]" />
      {/* Inner dashed ring */}
      <div className="absolute inset-[40px] rounded-full border border-dashed border-[rgba(232,86,0,0.1)]" />
      {/* Innermost ring */}
      <div className="absolute inset-[80px] rounded-full border border-[rgba(232,86,0,0.08)]" />

      {/* Center orange glow + logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[100px] h-[100px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,86,0,0.25) 0%, rgba(232,86,0,0.05) 60%, transparent 80%)" }} />
        <motion.div
          className="relative w-12 h-12 rounded-xl bg-accent-orange/20 border border-accent-orange/30 flex items-center justify-center z-10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        </motion.div>
      </div>

      {/* Orbiting agents — inner ring */}
      <motion.div
        className="absolute inset-[40px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {orbitItems.map((item, i) => {
          const angle = (i * 360) / orbitItems.length;
          const rad = (angle * Math.PI) / 180;
          const r = 90;
          const x = Math.round(Math.cos(rad) * r);
          const y = Math.round(Math.sin(rad) * r);
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `calc(50% + ${x}px - 16px)`, top: `calc(50% + ${y}px - 16px)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 rounded-lg bg-[rgb(25,27,31)] border border-[rgb(41,42,43)] flex items-center justify-center text-[7px] font-bold text-[rgba(255,255,255,0.4)]">
                {item.icon}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Outer floating elements — quote indicator dots */}
      {communityQuotes.map((_, i) => {
        const angle = (i * 360) / communityQuotes.length - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 155;
        const isActive = activeQuote === i;
        const dx = Math.round(Math.cos(rad) * r);
        const dy = Math.round(Math.sin(rad) * r);
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute"
            style={{ left: `calc(50% + ${dx}px - 10px)`, top: `calc(50% + ${dy}px - 10px)` }}
          >
            <motion.div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-accent-orange border border-accent-orange shadow-[0_0_12px_rgba(232,86,0,0.4)]"
                  : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
              }`}
              animate={isActive ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            >
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Framer glassmorphic card ── */
function GlassCard({ children, index, glowColor = "#9897FF" }: { children: React.ReactNode; index: number; glowColor?: string }) {
  return (
    <motion.div
      className="rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)]"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      whileHover={{ scale: 1.015, y: -3 }}
    >
      <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none z-0" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${glowColor}15 0%, transparent 65%)` }} />
        <motion.div className="absolute bottom-0 left-[15%] right-[15%] h-[2px] rounded-full z-10" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }} />
        <div className="relative z-[1] p-6 md:p-7">{children}</div>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setActiveQuote((i) => (i + 1) % communityQuotes.length), 4000);
    return () => clearInterval(t);
  }, [autoPlay]);

  const handleDot = (i: number) => {
    setActiveQuote(i);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeRight}>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Social Proof</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              YOU&apos;RE NOT ALONE IN THIS
            </h2>
          </div>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[660px] mx-auto mb-16 leading-relaxed">
            Every week, thousands of founders post the same thing. We read the threads so you don&apos;t have to.
          </p>
        </Reveal>

        {/* ── 2-col: Left swapping quote + Right orbit ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* LEFT — Swapping quote card */}
          <div>
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuote}
                  className="rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)]"
                  initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,86,0,0.08) 0%, transparent 65%)" }} />
                    <motion.div className="absolute bottom-0 left-[15%] right-[15%] h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, transparent, #E85600, transparent)" }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
                    <div className="relative z-[1] p-7 md:p-8">
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-[3px] rounded-full bg-accent-orange" />
                        <div>
                          <p className="text-[rgba(255,255,255,0.8)] italic leading-[170%] text-base md:text-lg mb-4">
                            &ldquo;{communityQuotes[activeQuote].text}&rdquo;
                          </p>
                          <span className="text-xs text-[rgba(255,255,255,0.3)] tracking-wide">
                            &mdash; {communityQuotes[activeQuote].source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center gap-2 mt-6">
              {communityQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeQuote === i ? "w-8 bg-accent-orange" : "w-1.5 bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.3)]"
                  }`}
                />
              ))}
              <span className="ml-auto text-[10px] text-[rgba(255,255,255,0.2)]">
                {activeQuote + 1} / {communityQuotes.length}
              </span>
            </div>

            {/* Auto-play progress */}
            {autoPlay && (
              <div className="mt-3 h-[2px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-orange/40 rounded-full"
                  key={`prog-${activeQuote}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>
            )}
          </div>

          {/* RIGHT — Orbit */}
          <OrbitVisual activeQuote={activeQuote} />
        </div>

        {/* ── 4 Feature cards below (like Cryps "Deep Crypto Indexing" row) ── */}
        <Reveal variants={fadeUp} delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {[
              { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Full GTM Audit", desc: "We diagnose every gap in your stack before writing a single line of code." },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Signal-Led Outbound", desc: "AI agents trigger outreach based on real buying signals, not batch lists." },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Dedicated Support", desc: "30-day post-handoff support. Async access to Danny throughout the build." },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "You Own Everything", desc: "Workflows, agents, IP, all yours permanently. No subscriptions, no lock-in." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
              >
                <div className="w-11 h-11 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <h4 className="text-white font-semibold text-base">{item.title}</h4>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ── Client Results — 3 glassmorphic cards ── */}
        <Reveal variants={fadeUp}>
          <h3 className="text-center text-white text-2xl md:text-3xl font-medium mb-10 tracking-[-1px]" style={{ fontFamily: "var(--font-family-heading)" }}>
            WHAT OUR CLIENTS SAY
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {clientResults.map((result, i) => (
            <GlassCard key={i} index={i} glowColor="#9897FF">
              <div className="flex flex-col justify-between min-h-[140px]">
                <p className="text-[rgba(255,255,255,0.8)] italic leading-[170%] text-[15px] mb-4">&ldquo;{result.text}&rdquo;</p>
                <span className="text-xs text-accent-orange tracking-wide font-medium">&mdash; {result.source}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
