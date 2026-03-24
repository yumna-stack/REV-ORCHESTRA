"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, fadeLeft, fadeRight, popIn, scaleUp } from "@/components/motion";
import { StaggerGrid, GridItem } from "@/components/PageWrapper";

const features = [
  {
    title: "Blockchain Indexing",
    desc: "Index and query on-chain data across 35+ networks with sub-second latency and full historical coverage.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
      </svg>
    ),
  },
  {
    title: "AI Analytics",
    desc: "Leverage machine learning models to detect patterns, predict trends, and surface actionable insights from blockchain data.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c0 1.5-.8 2.8-2 3.5v1h-4v-1A4 4 0 0112 2z" />
        <path d="M10 10.5h4v2a2 2 0 01-4 0v-2z" />
        <circle cx="12" cy="18" r="3" />
        <path d="M12 15v-2.5M9 18H5M15 18h4" />
      </svg>
    ),
  },
  {
    title: "DeFi Integration",
    desc: "Connect seamlessly to top DeFi protocols for lending, borrowing, staking, and yield farming — all from one platform.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
        <path d="M12 7l3.5 5L12 17l-3.5-5L12 7z" />
      </svg>
    ),
  },
  {
    title: "Smart Contracts",
    desc: "Deploy, monitor, and interact with smart contracts across multiple chains with built-in verification and audit tools.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Cross-Chain Bridge",
    desc: "Move assets and data across blockchains with our secure, trustless bridge infrastructure supporting 35+ networks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 6l4-4M4 6l4 4" />
        <path d="M20 18H4M20 18l-4-4M20 18l-4 4" />
        <path d="M12 2v20" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: "Security Suite",
    desc: "Enterprise-grade security with real-time threat detection, wallet monitoring, and smart contract vulnerability scanning.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const integrations = [
  { name: "Ethereum", symbol: "ETH" },
  { name: "Uniswap", symbol: "UNI" },
  { name: "Aave", symbol: "AAVE" },
  { name: "Chainlink", symbol: "LINK" },
  { name: "Compound", symbol: "COMP" },
  { name: "MakerDAO", symbol: "MKR" },
  { name: "Polygon", symbol: "MATIC" },
  { name: "Lido", symbol: "LDO" },
  { name: "Curve", symbol: "CRV" },
  { name: "Arbitrum", symbol: "ARB" },
  { name: "Optimism", symbol: "OP" },
  { name: "Solana", symbol: "SOL" },
  { name: "Avalanche", symbol: "AVAX" },
  { name: "Cosmos", symbol: "ATOM" },
  { name: "Polkadot", symbol: "DOT" },
  { name: "SushiSwap", symbol: "SUSHI" },
];

export default function ProductsPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* Hero */}
      <PageHero
        badge="Products"
        title="Built for the Future of Crypto"
        subtitle="A complete suite of decentralized tools to index, analyze, bridge, and secure your blockchain operations across every major network."
      />

      {/* Features Grid */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GridItem key={i}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(232,86,0,0.3)" }}
                  className="relative p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 h-full group overflow-hidden"
                >
                  {/* Subtle corner glow on hover */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent-orange/0 group-hover:bg-accent-orange/[0.04] blur-3xl transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-6"
                    >
                      {f.icon}
                    </motion.div>

                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-orange transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Integrations / Protocol Logos */}
      <section className="py-28 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="text-center mb-16 flex flex-col items-center gap-5">
              <Badge text="Integrations" />
              <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-2">
                Connects With Top Crypto Protocols
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[550px] mx-auto">
                Plug into the leading DeFi protocols, blockchains, and crypto infrastructure tools — no migration needed.
              </p>
            </div>
          </Reveal>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((item, i) => (
              <GridItem key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-accent-orange/20 hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(160deg, rgba(232,86,0,0.15), rgba(152,151,255,0.1))", color: "#E85600" }}>
                    {item.symbol.substring(0, 2)}
                  </div>
                  <span className="text-[11px] text-[rgba(255,255,255,0.5)] text-center leading-tight">
                    {item.name}
                  </span>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <Reveal variants={fadeUp}>
          <div className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
              Ready to Build on CRYPS?
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[500px]">
              Start indexing, analyzing, and bridging blockchain data in minutes. Join thousands of developers building the future of crypto.
            </p>
            <CTAButton text="GET STARTED" />
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
