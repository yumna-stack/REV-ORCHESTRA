"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";
import { StaggerGrid, GridItem } from "@/components/PageWrapper";

const chains = [
  { name: "Ethereum", icon: "https://cdn.simpleicons.org/ethereum/white" },
  { name: "Bitcoin", icon: "https://cdn.simpleicons.org/bitcoin/white" },
  { name: "Solana", icon: "https://cdn.simpleicons.org/solana/white" },
  { name: "Polygon", icon: "https://cdn.simpleicons.org/polygon/white" },
  { name: "Avalanche", icon: "https://cdn.simpleicons.org/avalanche/white" },
  { name: "Binance", icon: "https://cdn.simpleicons.org/binance/white" },
  { name: "Cardano", icon: "https://cdn.simpleicons.org/cardano/white" },
  { name: "Polkadot", icon: "https://cdn.simpleicons.org/polkadot/white" },
];

export default function SupportedBlockchain() {
  return (
    <section className="relative w-full py-28 bg-black-light">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black border border-[rgba(255,255,255,0.15)] mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.8)] tracking-wider uppercase">Supported Blockchain</span>
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: "120%",
                letterSpacing: "-0.02em",
                color: "white",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Hear the Pulse of Every Crypto Chain
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.6)] leading-[160%] max-w-[600px] mx-auto">
              Multi chain support across all major blockchain networks with real time data indexing and analysis.
            </p>
          </div>
        </Reveal>

        {/* Chain grid */}
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {chains.map((chain, i) => (
            <GridItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-black hover:border-[rgba(255,255,255,0.25)] transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-black border border-[rgba(255,255,255,0.15)] flex items-center justify-center group-hover:bg-black group-hover:border-[rgba(255,255,255,0.3)] transition-colors duration-300">
                  <img src={chain.icon} alt={chain.name} className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-[13px] font-medium text-[rgba(255,255,255,0.8)] tracking-wide group-hover:text-white transition-colors duration-300">
                  {chain.name}
                </span>
              </motion.div>
            </GridItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
