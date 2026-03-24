"use client";

import { useEffect, useRef, useState } from "react";

const words = [
  "Cryps", "is", "revolutionizing", "the", "fusion", "of",
  "cryptocurrency", "and", "artificial", "intelligence",
  "ushering", "in", "a", "new", "era",
  "of", "crypto", "data", "indexing.",
];

const logos = [
  "IPSUM", "LOGO", "IPSUM", "LOGO", "IPSUM", "LOGO", "IPSUM", "LOGO",
  "IPSUM", "LOGO", "IPSUM", "LOGO",
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
      {/* Scroll-driven text reveal - tall section so animation is slow */}
      <section ref={sectionRef} className="relative w-full bg-[rgb(14,15,17)] -mt-[1px]" style={{ height: "1400px" }}>
        {/* Seamless continuation of Hero warm glow — no visible line */}

        <div className="sticky top-0 h-screen flex items-center justify-center px-5 z-10">
          <p className="text-[clamp(28px,4.5vw,58px)] font-medium leading-[135%] tracking-[-1.5px] text-center max-w-[850px]">
            {words.map((word, i) => {
              let opacity = 0.12;
              if (i <= activeWordIndex) opacity = 1;
              else if (i === activeWordIndex + 1) {
                const frac = (progress * words.length * 1.1 - 2) % 1;
                opacity = 0.12 + Math.max(0, frac) * 0.88;
              }

              /* Embed small logo icon after "intelligence" (index 9) */
              if (i === 9) {
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
              const isHighlight = word === "revolutionizing";
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

      {/* Supported Tech - appears AFTER sticky text as you scroll past */}
      <section className="relative w-full pt-6 pb-8 bg-[rgb(14,15,17)] overflow-hidden -mt-[100px]">
        {/* Label with lines */}
        <div className="flex items-center justify-center gap-4 mb-8 px-5">
          <div className="flex-1 max-w-[300px] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
          <span className="text-[11px] text-[rgba(255,255,255,0.35)] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
            Supported Tech
          </span>
          <div className="flex-1 max-w-[300px] h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
        </div>

        {/* Scrolling logos */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[15%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent pointer-events-none" />
          <div className="flex items-center gap-[80px] w-max" style={{ animation: "logoScroll 40s linear infinite" }}>
            {logoItems.map((logo, i) => (
              <span key={i} className="text-[rgba(255,255,255,0.25)] text-lg font-bold tracking-[3px] uppercase shrink-0 hover:text-[rgba(255,255,255,0.5)] transition-colors duration-300">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
