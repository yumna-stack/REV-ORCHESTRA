"use client";

import { useEffect, useRef, useState } from "react";

const words = [
  "Rev", "Orchestra", "is", "orchestrating", "the", "future", "of",
  "go-to-market", "execution", "for",
  "B2B", "founders", "with", "AI-powered",
  "signal-led", "pipeline", "systems.",
];

const logos = [
  "CLAY", "INSTANTLY", "HUBSPOT", "SLACK", "N8N", "LINKEDIN",
  "CLAY", "INSTANTLY", "HUBSPOT", "SLACK", "N8N", "LINKEDIN",
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

  /* Slower word reveal: multiplier of 1.1 means you need to scroll most of the section */
  const activeWordIndex = Math.floor(progress * words.length * 1.1) - 2;
  const logoItems = [...logos, ...logos, ...logos];

  return (
    <>
      {/* Scroll-driven text reveal — compact height, no huge gap */}
      <section ref={sectionRef} className="relative w-full bg-[rgb(14,15,17)]" style={{ height: "600px" }}>
        <div className="sticky top-0 h-[60vh] flex items-center justify-center px-5 z-10">
          <p className="text-[clamp(28px,4.5vw,58px)] font-medium leading-[135%] tracking-[-1.5px] text-center max-w-[850px]">
            {words.map((word, i) => {
              let opacity = 0.12;
              if (i <= activeWordIndex) opacity = 1;
              else if (i === activeWordIndex + 1) {
                const frac = (progress * words.length * 1.1 - 2) % 1;
                opacity = 0.12 + Math.max(0, frac) * 0.88;
              }

              /* Embed small logo icon after "intelligence" (index 9) */
              if (i === 11) {
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

              /* Highlight "revolutionizing" in orange like Cryps */
              const isHighlight = word === "orchestrating";
              return (
                <span
                  key={i}
                  className={`inline-block mr-[0.3em] ${isHighlight ? "italic" : ""}`}
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

    </>
  );
}
