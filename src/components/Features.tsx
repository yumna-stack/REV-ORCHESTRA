"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Features() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="features" className="relative w-full py-28 bg-[rgb(14,15,17)] overflow-hidden">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Heading + CTA (slides in from left) */}
          <div
            className={`flex flex-col gap-6 scroll-reveal-base reveal-slide-left${visible ? " is-visible" : ""}`}
            style={{ animationDelay: "0ms" }}
          >
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
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit">
              ANALYZER
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Right - Animated Feature Cards */}
          <div className="flex flex-col gap-4">
            {/* Top row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: Wallet - animated dashed connector + traveling dot */}
              <div
                className={`relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden group hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500 scroll-reveal-base reveal-scale-up${visible ? " is-visible" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-accent-orange/8 blur-2xl" />
                <h3 className="text-lg font-semibold text-white mb-2 leading-[130%]">Crypo wallet with secure encryption</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-6">Leading multi asset management</p>
                {/* Animated avatar group with dashed connector - always running */}
                <div className="flex items-center gap-0 relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] z-10 bg-gradient-to-br from-[#555] to-[#888]" />
                  <div className="relative w-12 h-[2px] mx-1">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 8px)",
                    }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-orange" style={{
                      animation: "travelDot 2s ease-in-out infinite",
                    }} />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] bg-accent-orange flex items-center justify-center z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Bitcoin price - blinking cursor + animated crypto list */}
              <div
                className={`relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 overflow-hidden group hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500 scroll-reveal-base reveal-scale-up${visible ? " is-visible" : ""}`}
                style={{ animationDelay: "350ms" }}
              >
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-accent-orange/6 blur-2xl" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#F7931A] flex items-center justify-center" style={{ animation: "subtlePulse 3s ease-in-out infinite" }}>
                    <span className="text-white font-bold text-[10px]">B</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">Bitcoin</span>
                    <div className="text-[10px] text-[rgba(255,255,255,0.3)]">$ 107297.00</div>
                  </div>
                </div>
                {/* Amount input with blinking cursor - always running */}
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3 mb-3">
                  <span className="text-xl font-semibold text-white">00.343 </span>
                  <span className="inline-block w-[2px] h-5 bg-white align-middle" style={{ animation: "cursorBlink 1s step-end infinite" }} />
                </div>
                {/* Crypto list with floating coin icons */}
                {[
                  { name: "Litecoin", pair: "LTC/USD", change: "1.50%", color: "#BFBBBB" },
                  { name: "Ethereum", pair: "ETH/USD", change: "3.05%", color: "#627EEA" },
                  { name: "Polkadot", pair: "DOT/USD", change: "2.80%", color: "#E6007A" },
                ].map((coin, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0 scroll-reveal-base reveal-slide-up${visible ? " is-visible" : ""}`}
                    style={{ animationDelay: `${600 + i * 200}ms` }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: coin.color,
                        animation: `coinFloatContinuous ${3.5 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
                      }}
                    >
                      <span className="text-white text-[7px] font-bold">{coin.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-medium text-white">{coin.name}</span>
                      <div className="text-[9px] text-[rgba(255,255,255,0.3)]">{coin.pair}</div>
                    </div>
                    <span className="text-[10px] text-green-400" style={{ animation: `tickerPulse 2s ease-in-out ${i * 0.5}s infinite` }}>
                      {coin.change} &#8593;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 3: DAPPS - continuously scrolling transaction ticker */}
              <div
                className={`relative rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 overflow-hidden group hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500 scroll-reveal-base reveal-scale-up${visible ? " is-visible" : ""}`}
                style={{ animationDelay: "500ms" }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">DAPPS</h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%] mb-4">Take control of your all crypto assets</p>
                {/* Continuous vertical ticker of transactions */}
                <div className="relative h-[150px] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 z-10 bg-gradient-to-b from-[rgba(14,15,17,0.9)] to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-8 z-10 bg-gradient-to-t from-[rgba(14,15,17,0.9)] to-transparent pointer-events-none" />
                  <div style={{ animation: "tickerUp 8s linear infinite" }}>
                    {[
                      { amount: "$120", date: "12 June", status: "Sent", statusColor: "#4CAF50" },
                      { amount: "$455", date: "12 June", status: "waiting", statusColor: "rgba(255,255,255,0.3)" },
                      { amount: "$7775", date: "12 June", status: "Sent", statusColor: "#4CAF50" },
                      { amount: "$320", date: "11 June", status: "Sent", statusColor: "#4CAF50" },
                      { amount: "$1200", date: "11 June", status: "pending", statusColor: "#E85600" },
                      { amount: "$890", date: "10 June", status: "Sent", statusColor: "#4CAF50" },
                      { amount: "$120", date: "12 June", status: "Sent", statusColor: "#4CAF50" },
                      { amount: "$455", date: "12 June", status: "waiting", statusColor: "rgba(255,255,255,0.3)" },
                      { amount: "$7775", date: "12 June", status: "Sent", statusColor: "#4CAF50" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#555] to-[#888]" />
                        </div>
                        <span className="text-xs font-semibold text-white">{tx.amount}</span>
                        <span className="text-[9px] text-[rgba(255,255,255,0.3)] ml-auto">{tx.date}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ color: tx.statusColor, border: `1px solid ${tx.statusColor}30` }}>{tx.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 4: Buy Sell Swap - continuously floating & glowing coins */}
              <div
                className={`relative rounded-[20px] border border-[rgba(255,255,255,0.06)] overflow-hidden group hover:border-[rgba(232,86,0,0.2)] transition-colors duration-500 scroll-reveal-base reveal-scale-up${visible ? " is-visible" : ""}`}
                style={{
                  animationDelay: "650ms",
                  background: "linear-gradient(160deg, rgba(232,86,0,0.06) 0%, rgba(14,15,17,0.95) 40%)",
                }}
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent-orange/8 blur-3xl" />
                <div className="p-6 pb-2">
                  <h3 className="text-xl font-bold text-white mb-1">Buy Sell and Swap</h3>
                </div>
                {/* Animated crypto coin grid - coins ALWAYS float */}
                <div className="grid grid-cols-4 gap-3 p-4">
                  {[
                    { sym: "\u25BC" }, { sym: "N" }, { sym: "\u25B2" }, { sym: "T" },
                    { sym: "\u2726" }, { sym: "V" }, { sym: "T" }, { sym: "\u2261" },
                    { sym: "M" }, { sym: "\u2726" }, { sym: "\u2B21" }, { sym: "T" },
                  ].map((coin, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mx-auto"
                      style={{
                        animation: `coinFloatContinuous ${2.5 + (i % 5) * 0.4}s ease-in-out ${(i % 4) * 0.3}s infinite, coinGlow ${3 + (i % 3) * 0.6}s ease-in-out ${(i % 3) * 0.5}s infinite`,
                      }}
                    >
                      <span className="text-[rgba(255,255,255,0.3)] text-sm font-medium">{coin.sym}</span>
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
