"use client";

import { Reveal, popIn, fadeLeft, fadeRight } from "@/components/motion";

export default function CTA() {
  return (
    <section id="contact" className="relative w-full py-24 bg-black-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <Reveal variants={popIn}>
          <div
            className="relative w-full rounded-3xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(232,86,0,0.08) 0%, rgba(14,15,17,1) 40%, rgba(14,15,17,1) 60%, rgba(152,151,255,0.05) 100%)",
            }}
          >
            {/* Orange glow spots */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-accent-orange/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent-purple/5 blur-3xl" />

            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
              {/* Left text */}
              <Reveal variants={fadeLeft} className="flex-1 flex flex-col gap-6">
                <h3 className="text-[clamp(24px,3.5vw,42px)] font-semibold leading-[115%] tracking-[-1px] text-white">
                  Empower Your Crypto Growth with CRYPS!
                </h3>
                <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] max-w-[500px]">
                  Join millions of users who trust CRYPS for secure, AI-powered cryptocurrency management.
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <a href="#pricing" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
                    GET STARTED
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <a href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] transition-all">
                    LEARN MORE
                  </a>
                </div>
              </Reveal>

              {/* Right illustration - abstract crypto visual */}
              <Reveal variants={fadeRight} className="relative w-[280px] h-[280px] shrink-0 flex items-center justify-center">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(circle, rgba(232,86,0,0.2) 0%, rgba(232,86,0,0.05) 50%, transparent 70%)",
                }} />
                {/* Orbiting ring */}
                <div className="absolute w-[220px] h-[220px] rounded-full border border-[rgba(232,86,0,0.15)]" style={{ animation: "orbit 20s linear infinite" }}>
                  <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-accent-orange/50 -translate-x-1/2" />
                </div>
                <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-[rgba(152,151,255,0.1)]" style={{ animation: "orbit 15s linear infinite reverse" }}>
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent-purple/40 -translate-x-1/2" />
                </div>
                {/* Center icon */}
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center z-10" style={{
                  background: "linear-gradient(135deg, #E85600, #9897FF)",
                  boxShadow: "0 0 40px rgba(232,86,0,0.3)",
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
