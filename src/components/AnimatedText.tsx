"use client";

import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const words = [
  "One", "command", "center.", "Autonomous", "agents.",
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
      {/* Scroll-driven word-by-word reveal — transparent so body gradient shows through */}
      <section ref={sectionRef} className="relative w-full" style={{ height: "600px" }}>
        <div className="sticky top-0 h-[60vh] flex items-center justify-center px-5 z-10">
          <p className="text-[clamp(28px,4.5vw,52px)] font-medium leading-[120%] tracking-[-1px] text-center max-w-[950px]" style={{ fontFamily: "var(--font-family-heading)" }}>
            {words.map((word, i) => {
              let opacity = 0.12;
              if (i <= activeWordIndex) opacity = 1;
              else if (i === activeWordIndex + 1) {
                const frac = (progress * words.length * 1.1 - 2) % 1;
                opacity = 0.12 + Math.max(0, frac) * 0.88;
              }

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

      {/* Supported Tech — transparent so body gradient flows continuously */}
      <section className="relative w-full pb-16">
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

        {/* Infinite scrolling marquee — CSS keyframes (reliable across browsers) */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%] z-10 bg-gradient-to-r from-[rgb(0, 0, 0)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[12%] z-10 bg-gradient-to-l from-[rgb(0, 0, 0)] to-transparent pointer-events-none" />

          <div className="flex items-center w-max marquee-track">
            {doubled.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0 mr-10"
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
          </div>
        </div>
      </section>

    </>
  );
}
