"use client";

import { Reveal, fadeUp, popIn } from "@/components/motion";

const toolLogos = [
  { name: "Bitcoin", src: "https://cdn.simpleicons.org/bitcoin/white" },
  { name: "Ethereum", src: "https://cdn.simpleicons.org/ethereum/white" },
  { name: "Solana", src: "https://cdn.simpleicons.org/solana/white" },
  { name: "Cardano", src: "https://cdn.simpleicons.org/cardano/white" },
  { name: "Polkadot", src: "https://cdn.simpleicons.org/polkadot/white" },
  { name: "Chainlink", src: "https://cdn.simpleicons.org/chainlink/white" },
  { name: "Litecoin", src: "https://cdn.simpleicons.org/litecoin/white" },
  { name: "Binance", src: "https://cdn.simpleicons.org/binance/white" },
];

const row2Logos = [
  { name: "Polygon", src: "https://cdn.simpleicons.org/polygon/white" },
  { name: "Cosmos", src: "https://cdn.simpleicons.org/cosmos/white" },
  { name: "Avalanche", src: "https://cdn.simpleicons.org/avalanche/white" },
  { name: "Tether", src: "https://cdn.simpleicons.org/tether/white" },
  { name: "Dogecoin", src: "https://cdn.simpleicons.org/dogecoin/white" },
  { name: "Stellar", src: "https://cdn.simpleicons.org/stellar/white" },
  { name: "Near", src: "https://cdn.simpleicons.org/near/white" },
  { name: "Algorand", src: "https://cdn.simpleicons.org/algorand/white" },
];

function CoinRow({ logos, direction = "left", speed = 30 }: { logos: typeof toolLogos; direction?: "left" | "right"; speed?: number }) {
  const items = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-[25%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] via-[rgba(14,15,17,0.8)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[25%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] via-[rgba(14,15,17,0.8)] to-transparent pointer-events-none" />

      {/* Center warm glow spotlight */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 120% at 50% 50%, rgba(232, 140, 50, 0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="flex items-center gap-8 w-max"
        style={{
          animation: `${direction === "left" ? "logoScroll" : "logoScrollReverse"} ${speed}s linear infinite`,
        }}
      >
        {items.map((logo, i) => (
          <div
            key={i}
            className="w-[80px] h-[80px] rounded-full shrink-0 flex items-center justify-center relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{
              background: "linear-gradient(160deg, #F09030 0%, #E85600 35%, #C44800 65%, #8A3200 100%)",
              boxShadow: "0 6px 24px rgba(232, 86, 0, 0.2), inset 0 2px 0 rgba(255,200,150,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {/* Coin 3D shine effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,220,180,0.35) 0%, rgba(255,180,100,0.1) 30%, transparent 55%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            {/* Inner ring */}
            <div className="absolute inset-[3px] rounded-full border border-[rgba(255,180,100,0.15)]" />
            <img
              src={logo.src}
              alt={logo.name}
              className="w-9 h-9 object-contain relative z-10 drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section id="integrations" className="relative w-full py-28 bg-black-light overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Best Crypto Networks</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4">
              Best Crypto Networks
            </h2>
            <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[600px] mx-auto">
              Effortlessly tap into real-time data from all major blockchain networks with AI-enhanced insights.
            </p>
          </div>
        </Reveal>

        {/* Animated orange coin logos - 2 rows scrolling opposite directions */}
        <Reveal variants={popIn}>
          <div className="mb-8">
            <CoinRow logos={toolLogos} direction="left" speed={25} />
            <CoinRow logos={row2Logos} direction="right" speed={30} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
