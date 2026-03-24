"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

  const activeWordIndex = Math.floor(progress * words.length * 1.3) - 1;
  const logoItems = [...logos, ...logos, ...logos];

  return (
    <>
      {/* Scroll-driven text reveal — tight, no wasted space */}
      <section ref={sectionRef} className="relative w-full bg-[rgb(14,15,17)]" style={{ height: "90vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center px-5 z-10">
          <p className="text-[clamp(24px,4vw,52px)] font-medium leading-[140%] tracking-[-1.5px] text-center max-w-[800px]">
            {words.map((word, i) => {
              let opacity = 0.12;
              if (i <= activeWordIndex) opacity = 1;
              else if (i === activeWordIndex + 1) {
                const frac = (progress * words.length * 1.3 - 1) % 1;
                opacity = 0.12 + Math.max(0, frac) * 0.88;
              }

              if (i === 9) {
                return (
                  <span key={i} className="inline-flex items-center gap-2 mr-[0.25em]" style={{ color: `rgba(255,255,255,${opacity})`, transition: "color 0.2s ease-out" }}>
                    {word}
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #F09030, #C44800)",
                        boxShadow: "0 4px 16px rgba(232,86,0,0.3)",
                        opacity: Math.max(0.4, opacity),
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </span>
                  </span>
                );
              }

              const isHighlight = word === "revolutionizing";
              return (
                <span
                  key={i}
                  className={`inline-block mr-[0.25em] ${isHighlight ? "italic" : ""}`}
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

      {/* Supported Tech — tight, centered */}
      <motion.section
        className="relative w-full py-8 bg-[rgb(14,15,17)] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 px-5">
          <div className="flex-1 max-w-[300px] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
          <span className="text-[11px] text-[rgba(255,255,255,0.35)] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
            Supported Tech
          </span>
          <div className="flex-1 max-w-[300px] h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
        </div>

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
      </motion.section>
    </>
  );
}
