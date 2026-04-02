"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 5000; // 5s per tab

const tabs = [
  {
    badge: "Signal Detection",
    heading: "AI-Powered Prospect Intelligence for B2B Founders",
    description:
      "Our signal agents continuously scan LinkedIn, job boards, funding announcements, and intent data to identify prospects the moment they enter a buying window, before your competitors even know they exist.",
    features: [
      { title: "Real-Time Signal Scanning", desc: "Monitor 50+ intent signals across LinkedIn, G2, job boards, and funding events." },
      { title: "ICP Auto-Matching", desc: "AI scores and ranks every prospect against your ideal customer profile in real time." },
      { title: "Contact Enrichment", desc: "Automatically enrich contacts with verified emails, roles, and company data." },
    ],
    image: "https://framerusercontent.com/images/5eVCkZ7V9x8vrhxhXkhhJA9HI4.png",
  },
  {
    badge: "Multi-Channel Outreach",
    heading: "Automated Engagement That Feels Human, at Scale",
    description:
      "Six AI sub-agents coordinate personalized email sequences, LinkedIn touches, and follow-ups across every channel, adapting tone, timing, and messaging based on prospect behavior and engagement signals.",
    features: [
      { title: "Hyper-Personalized Sequences", desc: "AI crafts unique messages per prospect using their signals, not templates." },
      { title: "Multi-Channel Sync", desc: "Email, LinkedIn, and Slack sequences coordinated by one orchestration layer." },
      { title: "Smart Follow-Ups", desc: "Agents auto-adjust timing and messaging based on opens, clicks, and replies." },
    ],
    image: "https://framerusercontent.com/images/2qxaCbzVSu847anr6AxRstGMDI.png",
  },
  {
    badge: "Pipeline Orchestration",
    heading: "Full-Funnel Visibility with Zero Manual Work",
    description:
      "From first touch to closed deal, every interaction is logged, every pipeline stage is updated, and every bottleneck is flagged, automatically. You get a dashboard, not a to-do list.",
    features: [
      { title: "Auto CRM Updates", desc: "HubSpot and Salesforce stay current without your team touching a record." },
      { title: "Pipeline Monitoring", desc: "Real-time alerts when deals stall, spike, or need attention." },
      { title: "Performance Dashboards", desc: "Track conversion rates, response times, and agent effectiveness at a glance." },
    ],
    image: "https://framerusercontent.com/images/hQx8gVA45mQkkScjXcMzAbZYg.png",
  },
];

export default function HowWeHandle() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % tabs.length);
    setProgress(0);
  }, []);

  /* Auto-advance timer */
  useEffect(() => {
    const interval = setInterval(advance, INTERVAL);
    return () => clearInterval(interval);
  }, [advance, active]);

  /* Progress bar animation — ticks every 50ms */
  useEffect(() => {
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 50 / INTERVAL, 1));
    }, 50);
    return () => clearInterval(tick);
  }, [active]);

  const tab = tabs[active];

  return (
    <section id="what-we-do" className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-14">
            <div
              className="relative inline-flex items-center gap-2 mb-6"
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                backgroundColor: "rgb(25,27,31)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
                How We Handle It
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 500,
                lineHeight: "110%",
                letterSpacing: "-2px",
                color: "white",
              }}
            >
              One System. Three Engines.
            </h2>
          </div>
        </Reveal>

        {/* ── Main Card — exact Cryps "FeaturedCrypsCard" specs ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease }}
        >
          <div
            style={{
              borderRadius: 36,
              border: "1px solid rgb(30,30,30)",
              overflow: "hidden",
              padding: 40,
              backgroundColor: "rgba(255,255,255,0.015)",
            }}
          >
            {/* ── Tab bar ── */}
            <div
              className="inline-flex items-center gap-0 mb-10"
              style={{
                backgroundColor: "rgb(25,27,31)",
                borderRadius: 16,
                padding: 8,
              }}
            >
              {tabs.map((t, i) => (
                <button
                  key={t.badge}
                  onClick={() => {
                    setActive(i);
                    setProgress(0);
                  }}
                  className="relative transition-colors"
                  style={{
                    padding: "8px 18px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 500,
                    color: active === i ? "white" : "rgba(255,255,255,0.4)",
                    backgroundColor: active === i ? "white" : "transparent",
                    ...(active === i ? { color: "rgb(14,15,17)" } : {}),
                  }}
                >
                  {t.badge}
                </button>
              ))}
            </div>

            {/* ── Content area — 2-column: text left, image right ── */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
              {/* Left content */}
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-1.5 mb-4"
                      style={{
                        padding: "9px 14px",
                        borderRadius: 40,
                        backgroundColor: "rgb(25,27,31)",
                      }}
                    >
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                        {tab.badge}
                      </span>
                    </div>

                    {/* Heading — H4 style from Framer: 38px Inter-Medium */}
                    <h3
                      style={{
                        fontFamily: "var(--font-family-heading)",
                        fontSize: "clamp(24px, 3vw, 38px)",
                        fontWeight: 500,
                        lineHeight: "120%",
                        letterSpacing: "-0.35px",
                        color: "white",
                        marginBottom: 12,
                      }}
                    >
                      {tab.heading}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 16,
                        lineHeight: "150%",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: 32,
                      }}
                    >
                      {tab.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Feature list with progress bars */}
                <div className="flex flex-col">
                  {tab.features.map((feature, i) => (
                    <div key={`${active}-${i}`} className="relative">
                      <div className="py-5">
                        <h4
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "white",
                            marginBottom: 6,
                          }}
                        >
                          {feature.title}
                        </h4>
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: "150%",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {feature.desc}
                        </p>
                      </div>
                      {/* Divider with progress bar on last item */}
                      <div className="relative h-px w-full bg-[rgba(255,255,255,0.06)]">
                        {i === tab.features.length - 1 && (
                          <motion.div
                            className="absolute top-0 left-0 h-full"
                            style={{
                              width: `${progress * 100}%`,
                              background: "linear-gradient(90deg, #E85600, #FF8E68)",
                              height: 2,
                              top: -0.5,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — image area */}
              <div
                className="flex-1 relative min-h-[300px] lg:min-h-[380px] rounded-[38px] overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at 60% 40%, rgba(232,86,0,0.08) 0%, rgba(14,15,17,0.6) 70%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    {/* Decorative gradient orb */}
                    <div
                      className="absolute w-[80%] h-[80%] rounded-full pointer-events-none"
                      style={{
                        background:
                          active === 0
                            ? "radial-gradient(circle, rgba(152,151,255,0.12) 0%, transparent 60%)"
                            : active === 1
                            ? "radial-gradient(circle, rgba(232,86,0,0.12) 0%, transparent 60%)"
                            : "radial-gradient(circle, rgba(183,233,50,0.08) 0%, transparent 60%)",
                      }}
                    />

                    {/* Abstract visual per tab */}
                    <div className="relative z-[1] flex flex-col items-center gap-4">
                      {/* Animated rings */}
                      {[120, 180, 240].map((size, ri) => (
                        <motion.div
                          key={ri}
                          className="absolute rounded-full"
                          style={{
                            width: size,
                            height: size,
                            border: `1px solid ${
                              active === 0
                                ? "rgba(152,151,255,0.15)"
                                : active === 1
                                ? "rgba(232,86,0,0.15)"
                                : "rgba(183,233,50,0.1)"
                            }`,
                          }}
                          animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
                          transition={{
                            duration: 20 + ri * 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ))}

                      {/* Center icon */}
                      <motion.div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor:
                            active === 0
                              ? "rgba(152,151,255,0.15)"
                              : active === 1
                              ? "rgba(232,86,0,0.15)"
                              : "rgba(183,233,50,0.1)",
                          border: `1px solid ${
                            active === 0
                              ? "rgba(152,151,255,0.25)"
                              : active === 1
                              ? "rgba(232,86,0,0.25)"
                              : "rgba(183,233,50,0.2)"
                          }`,
                        }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {active === 0 && (
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#9897FF" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {active === 1 && (
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {active === 2 && (
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#B7E932" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        className="mt-6 text-xs uppercase tracking-[0.2em] font-medium"
                        style={{
                          color:
                            active === 0
                              ? "rgba(152,151,255,0.6)"
                              : active === 1
                              ? "rgba(232,86,0,0.6)"
                              : "rgba(183,233,50,0.5)",
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {tab.badge}
                      </motion.span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
