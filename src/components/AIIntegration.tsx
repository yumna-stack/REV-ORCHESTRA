"use client";

import { useState } from "react";
import { Reveal, fadeUp, fadeLeft, fadeRight } from "@/components/motion";

const items = [
  {
    title: "Decentralized Crypto Indexers",
    description: "Experience the strength of the CRYPS Network, where crypto indexing meets decentralization for unmatched reliability.",
  },
  {
    title: "AI-Powered Crypto Toolkit",
    description: "Unlock advanced tools for analyzing blockchain data, market trends, and on-chain signals with cutting-edge AI.",
  },
  {
    title: "Support for Multi-Chain Protocols",
    description: "Seamlessly integrate and index data across every major blockchain network with real-time synchronization.",
  },
];

export default function AIIntegration() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="relative w-full py-28 bg-black-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <Reveal variants={fadeUp}>
          <div
            className="rounded-3xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left - Accordion */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 w-fit">
                <span className="text-xs text-accent-orange tracking-wider uppercase font-medium">
                  Crypto & AI Integration
                </span>
              </div>

              <h2 className="text-[clamp(24px,3vw,38px)] font-semibold leading-[120%] tracking-[-1px] text-white">
                Your Gateway to Advanced Crypto Data Indexing
              </h2>

              {/* Accordion items */}
              <div className="flex flex-col mt-4">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer py-5 border-b transition-all duration-500"
                    style={{
                      borderColor: i === activeIndex ? "rgba(232,86,0,0.5)" : "rgba(255,255,255,0.06)",
                    }}
                    onClick={() => setActiveIndex(i)}
                  >
                    <h4
                      className="text-base font-semibold transition-colors duration-300"
                      style={{ color: i === activeIndex ? "#fff" : "rgba(255,255,255,0.6)" }}
                    >
                      {item.title}
                    </h4>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: i === activeIndex ? "60px" : "0px",
                        opacity: i === activeIndex ? 1 : 0,
                        marginTop: i === activeIndex ? "8px" : "0px",
                      }}
                    >
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[160%]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Glowing chain illustration */}
            <div className="relative flex items-center justify-center h-[400px] rounded-2xl overflow-hidden">
              {/* Warm glow background */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(232, 86, 0, 0.2) 0%, rgba(120, 50, 10, 0.1) 40%, transparent 70%)",
                }}
              />
              {/* Chain links visual */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                {[0, 1, 2].map((n) => (
                  <div
                    key={n}
                    className="w-20 h-32 rounded-[40px] border-2 border-accent-orange/60 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(160deg, rgba(232,86,0,0.3) 0%, rgba(232,86,0,0.05) 100%)`,
                      boxShadow: "0 0 30px rgba(232,86,0,0.15)",
                      animation: `float${(n % 3) + 1} ${5 + n}s ease-in-out infinite`,
                    }}
                  >
                    <div className="w-10 h-16 rounded-[20px] bg-[rgba(14,15,17,0.8)] border border-[rgba(232,86,0,0.2)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
