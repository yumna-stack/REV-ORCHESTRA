"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    label: "REQUESTS PROCESSED",
    sublabel: "6 DAYS",
    value: "2 Million",
    gradient: "linear-gradient(135deg, rgba(152,151,255,0.12) 0%, rgba(40,40,60,0.06) 100%)",
    valueColor: "#9897FF",
    sublabelIcon: "⚡",
  },
  {
    label: "CHAINS TRACKED",
    sublabel: "IN 2025",
    value: "12+",
    gradient: "linear-gradient(135deg, rgba(232,86,0,0.1) 0%, rgba(60,30,10,0.06) 100%)",
    valueColor: "#E85600",
    sublabelIcon: "📦",
    hasBottomGlow: true,
  },
  {
    label: "CLIENTS SUPPORTED",
    sublabel: "GLOBALLY",
    value: "2300+",
    gradient: "linear-gradient(180deg, rgba(80,80,80,0.08) 0%, rgba(30,30,30,0.04) 100%)",
    valueColor: "rgba(255,255,255,0.15)",
    sublabelIcon: "🌐",
  },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div
            className="flex flex-col gap-6 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)" }}
          >
            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Our Stats</span>
            </div>

            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white">
              Join The CRYPS Community Of Millions
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">
              A simple, fast, and secure platform to manage your cryptocurrencies in just a few steps.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
                JOIN CRYPS NOW
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              {/* Avatar group + count */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[
                    "linear-gradient(135deg, #444, #888)",
                    "linear-gradient(135deg, #555, #999)",
                    "linear-gradient(135deg, #333, #777)",
                    "linear-gradient(135deg, #666, #aaa)",
                  ].map((bg, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[rgb(14,15,17)] overflow-hidden" style={{ background: bg }}>
                      <div className="w-full h-full bg-cover" />
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-sm font-semibold text-white">8M</span>
              </div>
            </div>
          </div>

          {/* Right - Stacked stat cards (Cryps cascading style) */}
          <div className="relative flex flex-col gap-[-20px]">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(40px)",
                  transitionDelay: `${300 + i * 200}ms`,
                  marginTop: i > 0 ? "-12px" : "0",
                  zIndex: 3 - i,
                }}
              >
                {/* Outer border */}
                <div className="rounded-[42px] p-[8px]" style={{ border: "0.93px solid rgba(255,255,255,0.03)" }}>
                  {/* Inner card */}
                  <div
                    className="relative rounded-[34px] px-8 py-6 overflow-hidden"
                    style={{
                      background: stat.gradient,
                      border: "1px solid rgba(41,42,43,1)",
                    }}
                  >
                    {/* Checkered pattern overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }} />

                    {/* Orange bottom glow for middle card */}
                    {stat.hasBottomGlow && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-orange to-transparent" />
                    )}

                    {/* Top row: label + sublabel */}
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">
                        {stat.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">
                          {stat.sublabel}
                        </span>
                        <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                          <span className="text-[10px]">{stat.sublabelIcon}</span>
                        </div>
                      </div>
                    </div>

                    {/* Big value */}
                    <span
                      className="text-[clamp(48px,6vw,80px)] font-medium leading-none tracking-[-2px] relative z-10 block"
                      style={{ color: stat.valueColor }}
                    >
                      {stat.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
