"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";

const networks = [
  { name: "Ethereum", slug: "ethereum", symbol: "ETH", color: "#627EEA" },
  { name: "Bitcoin", slug: "bitcoin", symbol: "BTC", color: "#F7931A" },
  { name: "Polygon", slug: "polygon", symbol: "MATIC", color: "#8247E5" },
  { name: "Solana", slug: "solana", symbol: "SOL", color: "#14F195" },
  { name: "Avalanche", slug: "avalanche", symbol: "AVAX", color: "#E84142" },
  { name: "Arbitrum", slug: "arbitrum", symbol: "ARB", color: "#28A0F0" },
];

const tickerIcons = [
  "ETH", "BTC", "SOL", "MATIC", "AVAX", "ARB", "DOT", "ADA", "ATOM", "NEAR",
  "OP", "BNB", "FTM", "ALGO", "XTZ", "FLOW", "ONE", "CELO", "LINK", "UNI",
];

export default function CryptoNetworksPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* Hero */}
      <PageHero
        badge="Best Crypto Networks"
        title="All Supported Crypto Networks"
        subtitle="Tap into real-time blockchain data from 35+ crypto networks. CRYPS provides seamless multi-chain indexing, analytics, and AI-enhanced insights across every major chain."
      />

      {/* Animated Crypto Ticker Row */}
      <section className="py-8 overflow-hidden border-y border-[rgba(255,255,255,0.04)]">
        <div className="relative">
          <div className="flex gap-8 animate-[scroll_30s_linear_infinite]" style={{ width: "max-content" }}>
            {[...tickerIcons, ...tickerIcons].map((icon, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background: "linear-gradient(160deg, rgba(232,86,0,0.6), rgba(152,151,255,0.4))",
                  }}
                >
                  {icon.charAt(0)}
                </div>
                <span className="text-xs text-[rgba(255,255,255,0.5)] font-medium tracking-wide">
                  {icon}
                </span>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Our Networks Section */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <Section>
            <div className="text-center mb-16 flex flex-col items-center gap-5">
              <Badge text="About Networks" />
              <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-2">
                Our Networks
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[600px] mx-auto leading-[170%]">
                From Ethereum and Polygon to Solana and Avalanche, CRYPS indexes every major blockchain so you never miss a transaction, event, or opportunity across the decentralized ecosystem.
              </p>
            </div>
          </Section>

          {/* 3-Column Network Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networks.map((network, i) => (
              <Section key={network.slug} delay={i * 100}>
                <a href={`/crypto-networks/${network.slug}`} className="block group">
                  <div className="relative p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(232,86,0,0.25)] transition-all duration-300 overflow-hidden">
                    {/* Subtle glow background */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
                      style={{ background: network.color }}
                    />

                    <div className="relative z-10">
                      {/* Network Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(255,255,255,0.08)]"
                        style={{ background: `${network.color}15` }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ color: network.color }}
                        >
                          {network.symbol.substring(0, 2)}
                        </span>
                      </div>

                      {/* Network Name + Symbol */}
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-orange transition-colors">
                        {network.name}
                      </h3>
                      <p className="text-sm text-[rgba(255,255,255,0.35)] mb-5">
                        {network.symbol} Network
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                        <div>
                          <p className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Status</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-xs text-[rgba(255,255,255,0.6)]">Live</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider">Type</p>
                          <p className="text-xs text-[rgba(255,255,255,0.6)] mt-1">Layer 1</p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center group-hover:border-accent-orange/30 group-hover:bg-accent-orange/5 transition-all">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#E85600] transition-colors" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-[rgba(255,255,255,0.04)]">
        <Section className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
            Explore All 35+ Supported Chains
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[500px]">
            The easiest way to query, index, and analyze crypto data across every major blockchain.
          </p>
          <CTAButton text="GET STARTED" />
        </Section>
      </section>

      <Footer />
    </main>
  );
}
