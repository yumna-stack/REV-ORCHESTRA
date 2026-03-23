"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Section, Badge, CTAButton } from "@/components/PageWrapper";

export default function NetworkDetailPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />
      <section className="relative w-full pt-[140px] pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-5">
          <Section>
            <Badge text="Network" />
            <div className="flex items-center gap-4 mt-6 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(160deg, #F09030, #E85600, #C44800)", boxShadow: "0 4px 20px rgba(232,86,0,0.2)" }}>
                <span className="text-white text-2xl font-bold">C</span>
              </div>
              <h1 className="text-[clamp(28px,4vw,44px)] font-medium text-white">Celer Network</h1>
            </div>
            <p className="text-lg text-[rgba(255,255,255,0.5)] leading-[170%] mb-8">
              Celer Network is a leading inter-blockchain and cross-layer communication platform. CRYPS provides comprehensive indexing for Celer Network data.
            </p>
          </Section>

          <Section delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: "Chain Type", value: "Layer 2" },
                { label: "Consensus", value: "State Channels" },
                { label: "TPS", value: "15,000+" },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                  <span className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider">{item.label}</span>
                  <p className="text-2xl font-medium text-accent-orange mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section delay={300} className="text-center flex flex-col items-center gap-4">
            <CTAButton text="EXPLORE ALL NETWORKS" href="/crypto-networks" />
          </Section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
