"use client";

import { useEffect, useRef, useState } from "react";

function OrbitalAnimation({ scale }: { scale: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{
      transform: `scale(${scale})`,
      transition: "transform 0.1s ease-out",
    }}>
      {/* Outer dark platform */}
      <div className="absolute w-[400px] h-[400px] rounded-full" style={{
        background: "radial-gradient(circle, rgba(30,30,30,0.8) 0%, rgba(14,15,17,0.9) 70%, transparent 100%)",
      }} />

      {/* Orange upward glow */}
      <div className="absolute w-[200px] h-[250px] -top-[20px]" style={{
        background: "radial-gradient(ellipse at bottom, rgba(232,86,0,0.35) 0%, rgba(232,86,0,0.1) 40%, transparent 70%)",
        filter: "blur(20px)",
      }} />

      {/* Outer orbit ring with dashed border */}
      <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[rgba(232,86,0,0.15)]" style={{ animation: "orbit 35s linear infinite" }}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div key={i} className="absolute w-8 h-8 rounded-xl bg-[rgba(30,30,30,0.9)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center" style={{
            top: "50%", left: "50%",
            transform: `rotate(${deg}deg) translateX(170px) translate(-50%, -50%) rotate(-${deg}deg)`,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={["M4 6h16M4 12h16M4 18h16", "M12 2L2 7l10 5 10-5-10-5z", "M9 19v-6a2 2 0 00-2-2H5", "M13 10V3L4 14h7v7l9-11h-7z", "M20 12H4", "M12 2v20"][i % 6]} />
            </svg>
          </div>
        ))}
      </div>

      {/* Middle orbit ring */}
      <div className="absolute w-[230px] h-[230px] rounded-full border border-[rgba(255,255,255,0.06)]" style={{ animation: "orbit 22s linear infinite reverse" }}>
        {[30, 150, 270].map((deg, i) => (
          <div key={i} className="absolute w-5 h-5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]" style={{
            top: "50%", left: "50%",
            transform: `rotate(${deg}deg) translateX(115px) translate(-50%, -50%)`,
          }} />
        ))}
      </div>

      {/* Inner orbit ring */}
      <div className="absolute w-[130px] h-[130px] rounded-full border border-dashed border-[rgba(232,86,0,0.25)]" style={{ animation: "orbit 15s linear infinite" }}>
        <div className="absolute w-3 h-3 rounded-full bg-accent-orange/50" style={{
          top: "-6px", left: "50%", transform: "translateX(-50%)",
          boxShadow: "0 0 8px rgba(232,86,0,0.5)",
        }} />
      </div>

      {/* Center pulsing glow */}
      <div className="absolute w-[160px] h-[160px] rounded-full" style={{
        background: "radial-gradient(circle, rgba(232,86,0,0.3) 0%, rgba(232,86,0,0.05) 50%, transparent 70%)",
        animation: "pulse-glow 3s ease-in-out infinite",
      }} />

      {/* Center icon - stacked cylinders */}
      <div className="relative flex flex-col items-center gap-0.5 z-10">
        {[0.3, 0.4, 0.5].map((opacity, n) => (
          <div key={n} className="w-14 h-5 rounded-full flex items-center justify-center" style={{
            border: `1px solid rgba(232,86,0,${0.3 + n * 0.15})`,
            background: `rgba(232,86,0,${opacity * 0.4})`,
            boxShadow: n === 2 ? "0 0 25px rgba(232,86,0,0.35)" : "none",
          }}>
            {n === 2 && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            )}
          </div>
        ))}
      </div>

      {/* Floating orange particles */}
      {[
        { x: "25%", y: "15%", size: 3, delay: "0s" },
        { x: "75%", y: "20%", size: 2, delay: "1s" },
        { x: "20%", y: "70%", size: 4, delay: "2s" },
        { x: "80%", y: "65%", size: 2, delay: "0.5s" },
        { x: "45%", y: "10%", size: 3, delay: "1.5s" },
        { x: "55%", y: "85%", size: 2, delay: "3s" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent-orange/40"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            animation: `float1 ${4 + i}s ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function BlockchainIndexing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [orbitalScale, setOrbitalScale] = useState(1.3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Scroll-driven scale: starts big (1.3) and shrinks to normal (1.0) */
  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      // Scale from 1.4 down to 1.0 as user scrolls through
      const scale = 1.4 - progress * 0.4;
      setOrbitalScale(Math.max(0.95, Math.min(1.4, scale)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full py-28 bg-[rgb(14,15,17)] overflow-hidden">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div
            className="flex flex-col gap-6 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)" }}
          >
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Blockchain Indexing</span>
            </div>

            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white">
              Your Gateway to Advanced Crypto Data Indexing
            </h2>

            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">
              Experience the power of the CRYPS Network, where crypto indexing meets decentralization. Our Staked Authority model empowers community members to run indexers, boosting reliability and trust.
            </p>

            {/* Feature points */}
            <div className="flex flex-col gap-3 mt-2">
              {["Deep Crypto Indexing", "Robust API Suite", "Client-Focused Support", "True Crypto SaaS"].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={["M9 12h6M12 9v6", "M4 6h16M4 10h16M4 14h16M4 18h16", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", "M12 2L2 7l10 5 10-5-10-5z"][i]} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">{point}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit mt-2">
              JOIN CRYPS NOW
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Right - Orbital Ring Animation (scales from big to normal on scroll) */}
          <div
            className="h-[500px] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: "300ms",
            }}
          >
            <OrbitalAnimation scale={orbitalScale} />
          </div>
        </div>
      </div>
    </section>
  );
}
