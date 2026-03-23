"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Stats() {
  const { ref, visible } = useScrollReveal({ threshold: 0.12 });

  return (
    <section id="stats" className="relative w-full py-28 bg-[rgb(14,15,17)]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content (slides in from left) */}
          <div
            className={`flex flex-col gap-6 scroll-reveal-base reveal-slide-left${visible ? " is-visible" : ""}`}
            style={{ animationDelay: "0ms" }}
          >
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
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[rgb(14,15,17)] overflow-hidden" style={{
                      background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 10%, ${30 + i * 10}%), hsl(${i * 40 + 200}, 10%, ${50 + i * 8}%))`,
                    }} />
                  ))}
                </div>
                <span className="ml-3 text-sm font-semibold text-white">8M</span>
              </div>
            </div>
          </div>

          {/* Right - CASCADING overlapping stat cards - SLIDE IN FROM RIGHT with stagger */}
          <div className="relative" style={{ height: "420px" }}>
            {/* Card 1: REQUESTS PROCESSED - "2 Million" (purple, partially hidden) */}
            <div
              className={`absolute top-0 left-0 right-0 scroll-reveal-base reveal-slide-right${visible ? " is-visible" : ""}`}
              style={{ animationDelay: "200ms", zIndex: 1 }}
            >
              <div className="rounded-[36px] overflow-hidden" style={{ border: "1px solid rgba(41,42,43,1)" }}>
                <div className="relative px-8 pt-6 pb-16" style={{
                  background: "linear-gradient(180deg, rgba(100,80,180,0.12) 0%, rgba(14,15,17,1) 100%)",
                }}>
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }} />
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">REQUESTS PROCESSED</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">6 DAYS</span>
                      <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                        <span className="text-[10px]">&#9889;</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[72px] font-medium leading-none tracking-[-2px] relative z-10 block" style={{ color: "#9897FF" }}>
                    2 Million
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: CHAINS TRACKED - "12+" (orange, overlaps card 1) */}
            <div
              className={`absolute top-[100px] left-0 right-0 scroll-reveal-base reveal-slide-right${visible ? " is-visible" : ""}`}
              style={{ animationDelay: "450ms", zIndex: 2 }}
            >
              <div className="rounded-[36px] overflow-hidden" style={{
                border: "1px solid rgba(41,42,43,1)",
                boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
              }}>
                <div className="relative px-8 pt-6 pb-16" style={{
                  background: "linear-gradient(180deg, rgba(14,15,17,1) 0%, rgba(14,15,17,1) 60%, rgba(232,86,0,0.08) 100%)",
                }}>
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">CHAINS TRACKED</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">IN 2025</span>
                      <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                        <span className="text-[10px]">&#128230;</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[72px] font-medium leading-none tracking-[-2px] relative z-10 block" style={{ color: "#E85600" }}>
                    12+
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-orange to-transparent" />
                </div>
              </div>
            </div>

            {/* Card 3: CLIENTS SUPPORTED - "2300+" (gray, overlaps card 2) */}
            <div
              className={`absolute top-[230px] left-0 right-0 scroll-reveal-base reveal-slide-right${visible ? " is-visible" : ""}`}
              style={{ animationDelay: "700ms", zIndex: 3 }}
            >
              <div className="rounded-[36px] overflow-hidden" style={{
                border: "1px solid rgba(41,42,43,1)",
                boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
              }}>
                <div className="relative px-8 pt-6 pb-10" style={{
                  background: "linear-gradient(180deg, rgba(30,30,30,0.5) 0%, rgba(14,15,17,1) 100%)",
                }}>
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">CLIENTS SUPPORTED</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">GLOBALLY</span>
                      <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                        <span className="text-[10px]">&#127760;</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[72px] font-medium leading-none tracking-[-2px] relative z-10 block" style={{ color: "rgba(255,255,255,0.15)" }}>
                    2300+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
