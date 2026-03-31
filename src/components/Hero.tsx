"use client";

import { motion } from "framer-motion";
import { Float } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const floatingIcons = [
  { svg: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", x: 8, y: 18, size: 72, dur: 6 },
  { svg: "M13 10V3L4 14h7v7l9-11h-7z", x: 4, y: 42, size: 64, dur: 7 },
  { svg: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", x: 10, y: 68, size: 80, dur: 8 },
  { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", x: 88, y: 15, size: 68, dur: 5.5 },
  { svg: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", x: 92, y: 40, size: 60, dur: 7.5 },
  { svg: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", x: 90, y: 65, size: 76, dur: 6.5 },
  { svg: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z", x: 2, y: 82, size: 56, dur: 8.5 },
  { svg: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", x: 86, y: 82, size: 64, dur: 9 },
];

export default function Hero() {
  return (
    <>
    <section className="relative w-full flex flex-col items-center bg-[rgb(14,15,17)] overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
          WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
        }}
      />

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <Float key={i} duration={icon.dur} y={10} delay={i * 0.5} className="absolute" style={{ left: `${icon.x}%`, top: `${icon.y}%` }}>
            <div
              className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
              style={{ width: icon.size, height: icon.size, transform: "translate(-50%, -50%)" }}
            >
              <svg width={icon.size * 0.4} height={icon.size * 0.4} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon.svg} />
              </svg>
            </div>
          </Float>
        ))}
      </div>

      {/* Hero Content - staggered fade up */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto px-5 pt-[150px] gap-8"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
      >
        {/* Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.7, ease }}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)]"
        >
          <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
          <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">The AI GTM System for Post-Funding B2B Founders</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.9, ease }}
          className="text-[clamp(36px,5.5vw,72px)] font-medium leading-[105%] tracking-[-3px] text-white max-w-[900px]"
        >
          You&apos;re still doing GTM like it&apos;s 2024. The teams beating you are running orchestras.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 30, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.7, ease }}
          className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[580px]"
        >
          Rev Orchestra builds AI-orchestrated GTM systems for B2B founders who just raised and need pipeline. Six AI agents, connected to your stack, running 24/7. Yours permanently in 90 days.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4"
        >
          <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
            BOOK A CALL WITH DANNY <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#how-it-works" className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all">
            SEE HOW IT WORKS <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Dashboard - pops up with scale + blur */}
      <motion.div
        className="relative z-10 w-full max-w-[1080px] mx-auto px-5 mt-12"
        initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease, delay: 0.6 }}
      >
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(20,20,22,0.9)]" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://player.vimeo.com/video/1157150585?autoplay=1&loop=1&muted=1&background=1&quality=1080p"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Rev Orchestra Command Center"
          />
        </div>
      </motion.div>

    </section>

    {/* Warm amber gradient glow zone — seamless like Cryps */}
    <div className="relative w-full h-[400px] -mb-[200px] z-10 pointer-events-none overflow-visible" style={{ background: "rgb(14,15,17)" }}>
      {/* Main warm center band */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 130% 60% at 50% 10%, rgba(180, 90, 15, 0.35) 0%, rgba(140, 65, 10, 0.2) 20%, rgba(80, 35, 5, 0.08) 45%, transparent 70%)",
      }} />
      {/* Left edge warmth */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 35% 80% at 0% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)",
      }} />
      {/* Right edge warmth */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 35% 80% at 100% 25%, rgba(140, 70, 10, 0.18) 0%, transparent 55%)",
      }} />
      {/* Bottom fade to pure black */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{
        background: "linear-gradient(to bottom, transparent, rgb(14,15,17))",
      }} />
    </div>
    </>
  );
}
