"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

const words = [
  "One", "command", "center.", "Six", "agents.",
  "Signals", "caught.", "Outreach", "triggered.",
  "CRM", "updated.",
];

const techStrip = [
  { name: "HubSpot", key: "hubspot" },
  { name: "Slack", key: "slack" },
  { name: "LinkedIn", key: "linkedin" },
  { name: "n8n", key: "n8n" },
  { name: "Clay", key: "clay" },
  { name: "Instantly", key: "instantly" },
  { name: "Claude", key: "claude" },
  { name: "Apollo", key: "apollo" },
  { name: "Salesforce", key: "salesforce" },
  { name: "Zapier", key: "zapier" },
];

export default function AnimatedText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const totalScrollable = rect.height;
      setProgress(Math.max(0, Math.min(1, scrolled / totalScrollable)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeWordIndex = Math.floor(progress * words.length * 1.1) - 2;
  const doubled = [...techStrip, ...techStrip];

  return (
    <>
      {/* Scroll-driven text reveal */}
      <section ref={sectionRef} className="relative w-full bg-[rgb(14,15,17)]" style={{ height: "600px" }}>
        <div className="sticky top-0 h-[60vh] flex items-center justify-center px-5 z-10">
          <p className="text-[clamp(32px,5.5vw,72px)] font-medium leading-[120%] tracking-[-2.5px] text-center max-w-[950px]" style={{ fontFamily: "var(--font-family-heading)" }}>
            {words.map((word, i) => {
              let opacity = 0.12;
              if (i <= activeWordIndex) opacity = 1;
              else if (i === activeWordIndex + 1) {
                const frac = (progress * words.length * 1.1 - 2) % 1;
                opacity = 0.12 + Math.max(0, frac) * 0.88;
              }

              // Logo icon after "agents." (index 4)
              if (i === 4) {
                return (
                  <span key={i} className="inline-flex items-center gap-3 mr-[0.3em]" style={{ color: `rgba(255,255,255,${opacity})`, transition: "color 0.2s ease-out" }}>
                    {word}
                    <span
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #F09030, #C44800)",
                        boxShadow: "0 4px 16px rgba(232,86,0,0.3), inset 0 1px 0 rgba(255,200,150,0.3)",
                        opacity: Math.max(0.4, opacity),
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </span>
                  </span>
                );
              }

              // "command" and "center." in orange (not italic)
              const isHighlight = word === "command" || word === "center.";
              return (
                <span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  style={{
                    color: isHighlight && opacity > 0.5 ? "#E85600" : `rgba(255,255,255,${opacity})`,
                    transition: "color 0.3s ease-out",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* Supported Tech — Cryps-style divider + infinite marquee */}
      <section className="relative w-full bg-[rgb(14,15,17)] pb-16">
        {/* Label with horizontal lines */}
        <div className="flex items-center gap-4 max-w-[700px] mx-auto px-6 mb-10">
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.15)]" />
          <span
            className="shrink-0"
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Works with the tools you already use
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.15)]" />
        </div>

        {/* Infinite scrolling marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[12%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />

          <motion.div
            className="flex items-center gap-10 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {doubled.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0"
                style={{ opacity: 0.7 }}
              >
                <BrandLogo name={tool.key} size={24} />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
