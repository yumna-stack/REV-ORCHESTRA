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
          <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Cutting-Edge AI Solutions</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.9, ease }}
          className="text-[clamp(36px,5.5vw,72px)] font-medium leading-[105%] tracking-[-3px] text-white max-w-[900px]"
        >
          Decentralized Future Cryptocurrency Assets
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 30, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.7, ease }}
          className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[580px]"
        >
          A Platform for Cryptowave Surfing Financial Freedom
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4"
        >
          <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
            ANALYZER <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#how-it-works" className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-medium uppercase tracking-wider rounded-full border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all">
            GET STARTED <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(20,20,22,0.9)]">
          {/* Dashboard header */}
          <div className="flex items-center gap-6 px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <div className="w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-sm font-medium text-white border-b-2 border-accent-orange pb-1">Dashboard</span>
            <span className="text-sm text-[rgba(255,255,255,0.3)]">Reports</span>
            <span className="text-sm text-[rgba(255,255,255,0.3)]">Exchange Rates</span>
            <span className="text-sm text-[rgba(255,255,255,0.3)]">Forum</span>
          </div>

          {/* Dashboard content */}
          <div className="grid grid-cols-12 gap-4 p-6">
            {/* Sidebar icons */}
            <div className="col-span-1 flex flex-col items-center gap-4 py-2">
              {["M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
              ].map((d, i) => (
                <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center ${i === 0 ? "bg-accent-orange" : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "white" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                </div>
              ))}
            </div>

            {/* Portfolio */}
            <div className="col-span-3 flex flex-col gap-4">
              <div>
                <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">PORTFOLIO</span>
                <div className="text-2xl font-semibold text-white mt-1">$3400<span className="text-[rgba(255,255,255,0.3)]">.33</span></div>
              </div>
              {[
                { name: "BTC", full: "Bitcoin", change: "+2.20%", color: "#F7931A" },
                { name: "ETH", full: "Ethereum", change: "+2.20%", color: "#627EEA" },
                { name: "DOT", full: "Polkadot", change: "+2.20%", color: "#E6007A" },
                { name: "ADA", full: "Cardano", change: "+2.20%", color: "#0033AD" },
                { name: "DOGE", full: "Doge Coin", change: "-1.20%", color: "#C2A633" },
              ].map((coin, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: coin.color }}>
                    <span className="text-white text-[9px] font-bold">{coin.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-white">{coin.name}</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.3)] ml-2">{coin.full}</span>
                  </div>
                  <span className={`text-[10px] font-medium ${coin.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{coin.change}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="col-span-4 flex flex-col">
              <span className="text-xs font-medium text-white mb-2">Trading At</span>
              <div className="flex-1 flex items-end gap-1 pb-4">
                {[35, 42, 38, 55, 48, 65, 72, 60, 45, 80, 55, 40].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, ease, delay: 1.0 + i * 0.05 }}
                    style={{ background: i === 9 ? "#E85600" : i >= 7 ? "rgba(232,86,0,0.4)" : "rgba(255,255,255,0.06)" }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-[rgba(255,255,255,0.2)]">
                {["12 JUN", "13 JUN", "14 JUN", "15 JUN", "16 JUN", "17 JUN", "18 JUN", "19 JUN", "20 JUN"].map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            {/* Market prediction */}
            <div className="col-span-4 flex flex-col gap-4">
              <div>
                <span className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">MARKET PREDICTION</span>
                <div className="relative w-32 h-32 mx-auto mt-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none" stroke="url(#gaugeGrad)" strokeWidth="6" strokeLinecap="round"
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{ strokeDasharray: `${(349/400)*264} 264` }}
                      transition={{ duration: 1.5, ease, delay: 1.2 }}
                    />
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#B7E932" />
                        <stop offset="100%" stopColor="#4CAF50" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold text-white">349<span className="text-[rgba(255,255,255,0.3)] text-sm">/400</span></span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-semibold text-white">349</span>
                  <span className="text-xs text-[rgba(255,255,255,0.3)] ml-1">points</span>
                  <p className="text-[10px] text-[rgba(255,255,255,0.3)] mt-1">Seem Stable then last week</p>
                </div>
              </div>

              <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">B</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white">BTC</span>
                    <span className="text-[9px] text-[rgba(255,255,255,0.3)] ml-1">Bitcoin</span>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-[9px] text-[rgba(255,255,255,0.3)]">REWARD RATIO</span>
                    <div className="text-sm font-semibold text-white">13.44%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">$107542.00</span>
                  <span className="text-[10px] text-green-400">2.30% ↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>

    {/* Warm amber gradient glow zone — seamless like Cryps */}
    <div className="relative w-full h-[700px] -mt-[50px] -mb-[300px] z-20 pointer-events-none overflow-visible" style={{ background: "rgb(14,15,17)" }}>
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
