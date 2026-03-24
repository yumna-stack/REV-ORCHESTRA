"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, CTAButton } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";
import { StaggerGrid, GridItem } from "@/components/PageWrapper";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Feature cards data ── */
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

/* ── Chart bar heights for BTC/USDT panel ── */
const barData = [40, 55, 35, 60, 50, 70, 45, 80, 55, 65, 38, 72];

/* ── SVG path for Seller->Buyer dotted line ── */
const flowPath = "M40,30 L40,90 Q40,130 70,130 L180,130 Q210,130 210,160 L210,220";

export default function ProductsPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO SECTION (unique to Products page)
      ═══════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col items-center bg-[rgb(14,15,17)] overflow-hidden">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
            WebkitMask:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)",
          }}
        />

        {/* Warm amber/orange gradient glow from the sides */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 10% 30%, rgba(200,100,20,0.12) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 90% 30%, rgba(200,100,20,0.12) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Hero text content - staggered fade up */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto px-5 pt-[150px] gap-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.7, ease }}
          >
            <Badge text="Product" />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.9, ease }}
            className="text-[clamp(36px,5.5vw,72px)] font-medium leading-[105%] tracking-[-3px] text-white max-w-[800px]"
          >
            Unlock Crypto Data with CRYPS
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.7, ease }}
            className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[520px]"
          >
            Real-time insights across 35+ chains Powered by AI and Decentralization
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease }}
          >
            <CTAButton text="GET STARTED" />
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            DASHBOARD CARD - 3 panels side by side
        ═══════════════════════════════════════════ */}
        <motion.div
          className="relative z-10 w-full max-w-[1080px] mx-auto px-5 mt-14 pb-8"
          initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
        >
          {/* Outer border: rounded-[44px], 0.93px border */}
          <div
            className="rounded-[44px] p-[0.93px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          >
            {/* Inner container: rounded-[36px] */}
            <div className="rounded-[36px] bg-[rgb(14,15,17)] border border-[rgba(41,42,43,1)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-[rgba(41,42,43,0.6)]">
                {/* ─── Left Panel: BTC/USDT Chart ─── */}
                <div className="p-6 flex flex-col">
                  <span className="text-sm font-medium text-white mb-4">BTC/USDT</span>

                  {/* Y-axis labels + bars */}
                  <div className="flex gap-2 flex-1 min-h-[180px]">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between text-[10px] text-[rgba(255,255,255,0.25)] py-1">
                      <span>.07</span>
                      <span>.06</span>
                      <span>.05</span>
                      <span>.04</span>
                      <span>.03</span>
                    </div>

                    {/* Bars */}
                    <div className="flex-1 flex items-end gap-[3px]">
                      {barData.map((h, i) => {
                        const isHighlighted = i >= 7 && i <= 9;
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t-sm"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{
                              duration: 0.7,
                              ease,
                              delay: 0.8 + i * 0.05,
                            }}
                            style={{
                              background: isHighlighted
                                ? "#E85600"
                                : "rgba(255,255,255,0.08)",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="flex justify-between mt-2 text-[9px] text-[rgba(255,255,255,0.2)] pl-6">
                    <span>12 AM</span>
                    <span>12 AM</span>
                  </div>
                </div>

                {/* ─── Center Panel: Swap Interface ─── */}
                <motion.div
                  className="p-6 flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.9 }}
                >
                  {/* Tabs */}
                  <div className="flex items-center gap-1 mb-6">
                    <div className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-medium">
                      Swap
                    </div>
                    <div className="px-4 py-1.5 rounded-full text-[rgba(255,255,255,0.35)] text-xs">
                      Send
                    </div>
                    <div className="px-4 py-1.5 rounded-full text-[rgba(255,255,255,0.35)] text-xs">
                      Buy
                    </div>
                  </div>

                  {/* Sell section */}
                  <div className="rounded-2xl border border-[rgba(41,42,43,0.8)] bg-[rgba(255,255,255,0.02)] p-4 mb-2">
                    <span className="text-[10px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                      Sell
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-semibold text-white">10</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(41,42,43,0.8)]">
                        <div className="w-5 h-5 rounded-full bg-[#627EEA] flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">E</span>
                        </div>
                        <span className="text-xs text-white font-medium">ETH</span>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M3 4l2 2 2-2"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-xs text-[rgba(255,255,255,0.25)] mt-1 block">
                      2,586.77
                    </span>
                  </div>

                  {/* Swap arrow */}
                  <div className="flex justify-center -my-1 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[rgb(14,15,17)] border border-[rgba(41,42,43,0.8)] flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 3v8M4 8l3 3 3-3"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Buy section */}
                  <div className="rounded-2xl border border-[rgba(41,42,43,0.8)] bg-[rgba(255,255,255,0.02)] p-4 mt-2">
                    <span className="text-[10px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                      Buy
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-semibold text-white">0.422</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(41,42,43,0.8)]">
                        <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">B</span>
                        </div>
                        <span className="text-xs text-white font-medium">BTC</span>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M3 4l2 2 2-2"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ─── Right Panel: Seller -> Buyer Flow ─── */}
                <div className="p-6 flex flex-col relative min-h-[320px]">
                  {/* Seller card */}
                  <div className="absolute top-8 left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[rgba(41,42,43,0.8)] bg-[rgba(255,255,255,0.03)]">
                    <div className="w-7 h-7 rounded-lg bg-[#F7931A] flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-white">Seller</span>
                  </div>

                  {/* SVG path + animated dot */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 250 280"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Dotted path */}
                    <path
                      d={flowPath}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Orange directional arrow at end */}
                    <path
                      d="M205,210 L210,220 L215,210"
                      stroke="#E85600"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Animated orange dot */}
                    <motion.circle
                      r="4"
                      fill="#E85600"
                      filter="url(#glowFilter)"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        offsetPath: `path("${flowPath}")`,
                      }}
                    />
                    {/* Glow filter for the dot */}
                    <defs>
                      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>

                  {/* Buyer card */}
                  <div className="absolute bottom-8 right-6 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[rgba(41,42,43,0.8)] bg-[rgba(255,255,255,0.03)]">
                    <div className="w-7 h-7 rounded-lg bg-[rgba(255,255,255,0.08)] flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-white">Buyer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom warm glow beneath dashboard */}
        <div className="relative w-full h-[300px] -mb-[120px] z-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(200,100,20,0.25) 0%, rgba(160,70,10,0.12) 30%, transparent 65%)",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GridItem key={i}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(232,86,0,0.3)" }}
                  className="relative p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 h-full group overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent-orange/0 group-hover:bg-accent-orange/[0.04] blur-3xl transition-all duration-500 pointer-events-none" />
                  <div className="relative z-10">
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

      {/* ═══════════════════════════════════════════
          INTEGRATIONS
      ═══════════════════════════════════════════ */}
      <section className="py-28 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="text-center mb-16 flex flex-col items-center gap-5">
              <Badge text="Integrations" />
              <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white mt-2">
                Connects With Top Crypto Protocols
              </h2>
              <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[550px] mx-auto">
                Plug into the leading DeFi protocols, blockchains, and crypto
                infrastructure tools — no migration needed.
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
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(232,86,0,0.15), rgba(152,151,255,0.1))",
                      color: "#E85600",
                    }}
                  >
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

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-28">
        <Reveal variants={fadeUp}>
          <div className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">
              Ready to Build on CRYPS?
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] max-w-[500px]">
              Start indexing, analyzing, and bridging blockchain data in minutes.
              Join thousands of developers building the future of crypto.
            </p>
            <CTAButton text="GET STARTED" />
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
