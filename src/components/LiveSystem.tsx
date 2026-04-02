"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

/* ── Main Section ── */
export default function LiveSystem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.92, 1, 1]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 25 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[rgb(14,15,17)] overflow-hidden"
      style={{ paddingTop: 80, paddingBottom: 100 }}
    >
      <div className="max-w-[1120px] mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center" style={{ marginBottom: 56 }}>
          <Reveal variants={fadeUp}>
            <div
              className="inline-flex items-center gap-2 mx-auto mb-5"
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                backgroundColor: "rgb(25,27,31)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Security &amp; Compliance
              </span>
            </div>
          </Reveal>

          <Reveal variants={fadeUp}>
            <h2
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 500,
                lineHeight: "120%",
                letterSpacing: "-1.2px",
                color: "white",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              How we handle{" "}
              <span style={{ color: "rgba(232,86,0,0.8)" }}>your data.</span>
            </h2>
          </Reveal>

          <Reveal variants={fadeUp}>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 15,
                lineHeight: "170%",
                color: "rgba(255,255,255,0.4)",
                maxWidth: 520,
                margin: "16px auto 0",
              }}
            >
              Your business data is not our product. Guardrails, role-based access, and full audit trails, built into every system from day one.
            </p>
          </Reveal>

          <Reveal variants={fadeUp}>
            <div className="flex items-center justify-center gap-4 mt-7">
              <motion.a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-orange text-white hover:brightness-110 transition-all"
                style={{
                  padding: "11px 22px",
                  borderRadius: 100,
                  fontFamily: "var(--font-family-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Call with Danny
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-white transition-all"
                style={{
                  padding: "11px 22px",
                  borderRadius: 100,
                  fontFamily: "var(--font-family-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.97 }}
              >
                See How It Works
              </motion.a>
            </div>
          </Reveal>
        </div>

        {/* ── MacBook Pro ── */}
        <motion.div
          className="relative mx-auto"
          style={{ scale, maxWidth: 960 }}
        >
          {/* Device body — thick black bezel, heavily rounded like a real MacBook Pro */}
          <div
            style={{
              background: "#000",
              borderRadius: 20,
              padding: "20px 20px 0 20px",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
              style={{
                width: 160,
                height: 24,
                background: "#000",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <div
                className="absolute top-[9px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full"
                style={{ background: "#1a1a1a" }}
              />
            </div>

            {/* Screen area */}
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 10 }}
            >
              {/* macOS Menu Bar */}
              <div
                className="relative z-20 flex items-center justify-between px-4"
                style={{
                  height: 26,
                  background: "rgba(0,40,40,0.65)",
                  backdropFilter: "blur(30px)",
                  fontSize: 11.5,
                }}
              >
                <div className="flex items-center gap-[14px]">
                  <svg width="11" height="13" viewBox="0 0 14 17" fill="rgba(255,255,255,0.85)">
                    <path d="M13.15 5.88c-.08.06-1.52.87-1.52 2.67 0 2.08 1.83 2.82 1.88 2.84-.01.06-.29 1.01-.97 1.99-.59.85-1.2 1.7-2.14 1.7s-1.18-.55-2.26-.55c-1.05 0-1.43.57-2.29.57s-1.44-.79-2.14-1.75C2.71 11.97 2 9.93 2 8.01c0-3.1 2.01-4.74 3.99-4.74.98 0 1.8.65 2.42.65.58 0 1.49-.68 2.61-.68.42 0 1.93.04 2.93 1.46l.2.18zM9.84.87c.45-.53.77-1.27.77-2.01 0-.1-.01-.21-.03-.29-.73.03-1.6.49-2.13 1.09-.41.47-.8 1.21-.8 1.96 0 .11.02.23.03.26.05.01.14.02.22.02.66 0 1.49-.44 1.94-1.03z" transform="translate(0,2)" />
                  </svg>
                  <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Finder</span>
                  {["File", "Edit", "View", "Window", "Help"].map((m) => (
                    <span key={m} style={{ color: "rgba(255,255,255,0.6)" }}>{m}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <svg width="16" height="9" viewBox="0 0 18 9"><rect x="0.5" y="0.5" width="14" height="8" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" /><rect x="15" y="2.5" width="2" height="4" rx="1" fill="rgba(255,255,255,0.25)" /><rect x="2" y="2" width="9" height="5" rx="1" fill="rgba(255,255,255,0.5)" /></svg>
                  <svg width="11" height="9" viewBox="0 0 12 10"><path d="M6 8.5a0.8 0.8 0 110 1.6 0.8 0.8 0 010-1.6z" fill="rgba(255,255,255,0.5)" /><path d="M3.5 7C4.3 6 5.1 5.5 6 5.5s1.7.5 2.5 1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" strokeLinecap="round" /><path d="M1 4.5C2.5 2.5 4 1.5 6 1.5s3.5 1 5 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" strokeLinecap="round" /></svg>
                  <svg width="10" height="10" viewBox="0 0 12 12"><circle cx="5" cy="5" r="3.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" /><path d="M8 8l2.5 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" /></svg>
                  <svg width="10" height="10" viewBox="0 0 12 12"><rect x="1" y="1" width="4" height="4" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" /><rect x="7" y="1" width="4" height="4" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" /><rect x="1" y="7" width="4" height="4" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" /><rect x="7" y="7" width="4" height="4" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" /></svg>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontVariantNumeric: "tabular-nums" }}>Sat Jun 10 9:41 AM</span>
                </div>
              </div>

              {/* Desktop — ocean + notification */}
              <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ocean.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />

                {/* Notification panel — center of screen, Caretta-style */}
                <motion.div
                  className="absolute z-20 left-[50%] top-[50%]"
                  style={{
                    transform: "translate(-50%, -50%)",
                    width: "52%",
                    maxWidth: 380,
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                  }}
                >
                  <motion.div
                    style={{
                      backgroundColor: "rgba(8,8,10,0.9)",
                      backdropFilter: "blur(40px)",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "20px 22px",
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
                    }}
                  >
                    {/* Timer + logo */}
                    <motion.div
                      className="flex items-center justify-between mb-3"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>00:04</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </motion.div>

                    {/* Body */}
                    <motion.p
                      style={{
                        fontSize: "clamp(12px, 1.5vw, 16px)",
                        lineHeight: "155%",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.45)",
                        marginBottom: 14,
                      }}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      Your business data is <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>not our product</span>.{" "}
                      <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>Guardrails</span>,{" "}
                      <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>role-based access</span>, and{" "}
                      <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>full audit trails</span> built into every system from day one.
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap items-center gap-1.5 mb-3.5"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                    >
                      <motion.span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded"
                        style={{ fontSize: 10, fontWeight: 500, color: "#b8e986", backgroundColor: "rgba(184,233,134,0.08)", border: "1px solid rgba(184,233,134,0.12)" }}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
                        }}
                      >
                        <span style={{ fontSize: 8 }}>✦</span> AI Guardrails
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded"
                        style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
                        }}
                      >
                        <span style={{ fontSize: 8 }}>✦</span> Full Audit Trail
                      </motion.span>
                    </motion.div>

                    {/* Bottom statement */}
                    <motion.p
                      style={{
                        fontSize: "clamp(11px, 1.3vw, 14px)",
                        lineHeight: "155%",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.85)",
                      }}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      Everything runs inside <span style={{ color: "#b8e986" }}>your own stack</span>.{" "}
                      Nothing passes through our servers.{" "}
                      <span style={{ color: "#b8e986" }}>We build it, you own it.</span>
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom chin / hinge */}
          <div
            className="mx-auto"
            style={{
              width: "38%",
              height: 5,
              background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          />

          {/* Base — wider keyboard deck */}
          <div
            className="mx-auto"
            style={{
              width: "106%",
              marginLeft: "-3%",
              height: 8,
              marginTop: -1,
              background: "linear-gradient(180deg, #222 0%, #1a1a1a 100%)",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
