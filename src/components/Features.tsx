"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Features() {
  const { ref: sectionRef, visible } = useInView(0.1);

  return (
    <section id="features" className="relative w-full py-28 bg-[rgb(14,15,17)] overflow-hidden">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Heading + CTA */}
          <div
            className="flex flex-col gap-6 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
            }}
          >
            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Features</span>
            </div>

            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white">
              Encryption Build on Web3 Wallet for Crypo
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">
              A platform to buy sell and swap crypto in one place
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit"
            >
              ANALYZER
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right - Cryps-style feature cards grid */}
          <div className="flex flex-col gap-4">
            {/* Top row - 2 cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: Crypo wallet */}
              <div
                className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "200ms",
                }}
              >
                {/* Orange glow corner */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-accent-orange/8 blur-2xl" />
                <h3 className="text-lg font-semibold text-white mb-2 leading-[130%]">Crypo wallet with secure encryption</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-6">Leading multi asset management</p>
                {/* Avatar group */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)]">
                    <div className="w-full h-full bg-gradient-to-br from-[#555] to-[#888]" />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] bg-accent-orange flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Bitcoin price card */}
              <div
                className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 overflow-hidden transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "350ms",
                }}
              >
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-accent-orange/6 blur-2xl" />
                {/* Bitcoin header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#F7931A] flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">B</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">Bitcoin</span>
                    <div className="text-[10px] text-[rgba(255,255,255,0.3)]">$ 107297.00</div>
                  </div>
                </div>
                {/* Amount input */}
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3 mb-3">
                  <span className="text-xl font-semibold text-white">00.343 <span className="animate-pulse">|</span></span>
                </div>
                {/* Crypto list */}
                {[
                  { name: "Litecoin", pair: "LTC/USD", change: "1.50%", color: "#BFBBBB" },
                  { name: "Ethereum", pair: "ETH/USD", change: "3.05%", color: "#627EEA" },
                  { name: "Polkadot", pair: "DOT/USD", change: "2.80%", color: "#E6007A" },
                ].map((coin, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: coin.color }}>
                      <span className="text-white text-[7px] font-bold">{coin.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-medium text-white">{coin.name}</span>
                      <div className="text-[9px] text-[rgba(255,255,255,0.3)]">{coin.pair}</div>
                    </div>
                    <span className="text-[10px] text-green-400">{coin.change} ↑</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row - 2 cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 3: DAPPS */}
              <div
                className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "500ms",
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">DAPPS</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-6">Take control of your all crypto assets</p>
                {/* Transaction list */}
                {[
                  { amount: "$455", date: "12 June", time: "12:30 pm", status: "waiting", statusColor: "rgba(255,255,255,0.3)" },
                  { amount: "$7775", date: "12 June", time: "12:30 pm", status: "Sent", statusColor: "#4CAF50" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#555] to-[#888]" />
                    </div>
                    <span className="text-sm font-semibold text-white">{tx.amount}</span>
                    <div className="ml-auto text-right">
                      <span className="text-[10px] text-[rgba(255,255,255,0.4)]">{tx.date}</span>
                      <div className="text-[9px] text-[rgba(255,255,255,0.25)]">{tx.time}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: tx.statusColor, border: `1px solid ${tx.statusColor}30` }}>{tx.status}</span>
                  </div>
                ))}
              </div>

              {/* Card 4: Buy Sell and Swap */}
              <div
                className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "650ms",
                  background: "linear-gradient(160deg, rgba(232,86,0,0.06) 0%, rgba(14,15,17,0.95) 40%)",
                }}
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent-orange/8 blur-3xl" />
                <h3 className="text-xl font-bold text-white mb-2">Buy Sell and Swap</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-4">Trade across networks</p>
                {/* Crypto coin grid */}
                <div className="grid grid-cols-3 gap-3">
                  {["V", "N", "M", "T", "T", "V", "✦", "T", "≡"].map((sym, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mx-auto">
                      <span className="text-[rgba(255,255,255,0.3)] text-sm font-medium">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
