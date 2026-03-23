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

  const activeWordIndex = Math.floor(progress * words.length * 1.8) - 2;
  const logoItems = [...logos, ...logos, ...logos];

  /* Logo strip fades in during last 20% of text scroll */
  const logoStripOpacity = Math.max(0, Math.min(1, (progress - 0.75) / 0.2));

  return (
    <section ref={sectionRef} className="relative w-full bg-[rgb(14,15,17)]" style={{ height: "1200px" }}>
      {/* Warm glow background that fades from hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 40% at 50% 0%, rgba(180,80,20,0.18) 0%, rgba(100,40,10,0.08) 40%, transparent 70%),
          linear-gradient(to bottom, transparent 0%, rgb(14,15,17) 30%)
        `,
      }} />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 z-10">
        {/* Animated text */}
        <p className="text-[clamp(28px,4.5vw,58px)] font-medium leading-[135%] tracking-[-1.5px] text-center max-w-[850px] mb-auto mt-[25vh]">
          {words.map((word, i) => {
            let opacity = 0.12;
            if (i <= activeWordIndex) opacity = 1;
            else if (i === activeWordIndex + 1) {
              const frac = (progress * words.length * 1.8 - 2) % 1;
              opacity = 0.12 + frac * 0.88;
            }

            /* Embed small logo icon next to "Cryps" */
            if (i === 0) {
              return (
                <span key={i} className="inline-flex items-center gap-3 mr-[0.3em]" style={{ color: `rgba(255,255,255,${opacity})`, transition: "color 0.15s ease-out" }}>
                  {word}
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, #F09030, #C44800)",
                      boxShadow: "0 4px 16px rgba(232,86,0,0.3), inset 0 1px 0 rgba(255,200,150,0.3)",
                      opacity: Math.max(0.3, opacity),
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </span>
                </span>
              );
            }

            return (
              <span key={i} className="inline-block mr-[0.3em]" style={{ color: `rgba(255,255,255,${opacity})`, transition: "color 0.15s ease-out" }}>
                {word}
              </span>
            );
          })}
        </p>

        {/* Supported Tech - positioned at bottom of sticky area, fades in as text completes */}
        <div
          className="w-full mt-auto mb-[10vh] transition-opacity duration-700"
          style={{ opacity: logoStripOpacity }}
        >
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
        </div>
      </div>
    </section>
  );
}
