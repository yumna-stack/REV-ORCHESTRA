"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, PageHero, CTAButton } from "@/components/PageWrapper";

const networks = [
  "Ethereum", "Bitcoin", "Polkadot", "Cardano", "Solana", "Avalanche",
  "Polygon", "Cosmos", "Near", "Arbitrum", "Optimism", "BSC",
  "Fantom", "Celo", "Harmony", "Algorand", "Tezos", "Flow",
];

export default function CryptoNetworksPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <PageHero
        badge="Crypto Networks"
        title="Feel the Rhythm of Every Crypto Network"
        subtitle="Effortlessly tap into real-time data from 35+ crypto networks, including Ethereum, BSC, Polygon, with CRYPS' AI-enhanced insights."
      />

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {networks.map((name, i) => (
              <Section key={i} delay={i * 50}>
                <a href={`/crypto-networks/${name.toLowerCase()}`} className="block group">
                  <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-accent-orange/30 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(160deg, #F09030, #E85600, #C44800, #8A3200)", boxShadow: "0 4px 20px rgba(232,86,0,0.2), inset 0 2px 0 rgba(255,200,150,0.2)" }}>
                      <span className="text-white text-lg font-bold">{name.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-white font-medium group-hover:text-accent-orange transition-colors">{name}</span>
                  </div>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <Section className="max-w-[800px] mx-auto px-5 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-1.5px] text-white">Supported Blockchain</h2>
          <p className="text-base text-[rgba(255,255,255,0.45)]">The easiest way to query Crypto data from 35+ chains.</p>
          <CTAButton text="EXPLORE ALL" />
        </Section>
      </section>

      <Footer />
    </main>
  );
}
