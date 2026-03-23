"use client";

import { useEffect, useRef, useState } from "react";

export default function Features() {
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

  const pop = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.92)",
    filter: visible ? "blur(0px)" : "blur(4px)",
    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

  return (
    <section id="features" className="relative w-full py-28 bg-[rgb(14,15,17)] overflow-hidden">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-60px)",
            filter: visible ? "blur(0px)" : "blur(4px)",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] w-fit">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">Features</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[115%] tracking-[-2px] text-white">Encryption Build on Web3 Wallet for Crypo</h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[170%]">A platform to buy sell and swap crypto in one place</p>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit">
              ANALYZER <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Right - Cards */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Wallet card */}
              <div className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500" style={pop(0.2)}>
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-accent-orange/8 blur-2xl" />
                <h3 className="text-lg font-semibold text-white mb-2 leading-[130%]">Crypo wallet with secure encryption</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-6">Leading multi asset management</p>
                <div className="flex items-center relative">
                  <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] z-10 bg-gradient-to-br from-[#555] to-[#888]" />
                  <div className="relative w-12 h-[2px] mx-1">
                    <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 8px)" }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-orange" style={{ animation: "travelDot 2s ease-in-out infinite" }} />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] bg-accent-orange flex items-center justify-center z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                </div>
              </div>

              {/* Bitcoin card */}
              <div className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500" style={pop(0.35)}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#F7931A] flex items-center justify-center" style={{ animation: "subtlePulse 3s ease-in-out infinite" }}>
                    <span className="text-white font-bold text-[10px]">B</span>
                  </div>
                  <div><span className="text-sm font-medium text-white">Bitcoin</span><div className="text-[10px] text-[rgba(255,255,255,0.3)]">$ 107297.00</div></div>
                </div>
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3 mb-3">
                  <span className="text-xl font-semibold text-white">00.343 </span>
                  <span className="inline-block w-[2px] h-5 bg-white align-middle" style={{ animation: "cursorBlink 1s step-end infinite" }} />
                </div>
                {[{ name: "Litecoin", pair: "LTC/USD", change: "1.50%", color: "#BFBBBB" }, { name: "Ethereum", pair: "ETH/USD", change: "3.05%", color: "#627EEA" }, { name: "Polkadot", pair: "DOT/USD", change: "2.80%", color: "#E6007A" }].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: c.color, animation: `coinFloatContinuous ${3.5+i*0.7}s ease-in-out ${i*0.5}s infinite` }}>
                      <span className="text-white text-[7px] font-bold">{c.name[0]}</span>
                    </div>
                    <div className="flex-1"><span className="text-[11px] font-medium text-white">{c.name}</span><div className="text-[9px] text-[rgba(255,255,255,0.3)]">{c.pair}</div></div>
                    <span className="text-[10px] text-green-400" style={{ animation: `tickerPulse 2s ease-in-out ${i*0.5}s infinite` }}>{c.change} ↑</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* DAPPS */}
              <div className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500" style={pop(0.5)}>
                <h3 className="text-2xl font-bold text-white mb-2">DAPPS</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-4">Take control of your all crypto assets</p>
                <div className="relative h-[150px] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 z-10 bg-gradient-to-b from-[rgba(14,15,17,0.9)] to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-8 z-10 bg-gradient-to-t from-[rgba(14,15,17,0.9)] to-transparent pointer-events-none" />
                  <div style={{ animation: "tickerUp 8s linear infinite" }}>
                    {[{ a: "$120", s: "Sent", c: "#4CAF50" }, { a: "$455", s: "waiting", c: "rgba(255,255,255,0.3)" }, { a: "$7775", s: "Sent", c: "#4CAF50" }, { a: "$320", s: "Sent", c: "#4CAF50" }, { a: "$1200", s: "pending", c: "#E85600" }, { a: "$890", s: "Sent", c: "#4CAF50" }, { a: "$120", s: "Sent", c: "#4CAF50" }, { a: "$455", s: "waiting", c: "rgba(255,255,255,0.3)" }, { a: "$7775", s: "Sent", c: "#4CAF50" }].map((tx, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-2.5 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0"><div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#555] to-[#888]" /></div>
                        <span className="text-xs font-semibold text-white">{tx.a}</span>
                        <span className="text-[9px] text-[rgba(255,255,255,0.3)] ml-auto">12 June</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ color: tx.c, border: `1px solid ${tx.c}30` }}>{tx.s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buy Sell Swap */}
              <div className="relative rounded-[20px] border border-[rgba(255,255,255,0.06)] overflow-hidden hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500" style={{ ...pop(0.65), background: "linear-gradient(160deg, rgba(232,86,0,0.06) 0%, rgba(14,15,17,0.95) 40%)" }}>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent-orange/8 blur-3xl" />
                <div className="p-6 pb-2"><h3 className="text-xl font-bold text-white mb-1">Buy Sell and Swap</h3></div>
                <div className="grid grid-cols-4 gap-3 p-4">
                  {["▼","N","▲","T","✦","V","T","≡","M","✦","⬡","T"].map((s, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mx-auto" style={{ animation: `coinFloatContinuous ${2.5+(i%5)*0.4}s ease-in-out ${(i%4)*0.3}s infinite, coinGlow ${3+(i%3)*0.6}s ease-in-out ${(i%3)*0.5}s infinite` }}>
                      <span className="text-[rgba(255,255,255,0.3)] text-sm font-medium">{s}</span>
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
