"use client";

import { Reveal, fadeUp } from "@/components/motion";

/* Positive-outcome testimonials — scrolling wall in the Orchestrator-Mode-ON view.
 * Clean text-only cards: pull quote on top, attribution under a divider. */
type Quote = { text: string; name: string; title: string };

const quotes: Quote[] = [
  {
    text: "Week 1 after Rev Orchestra handoff, 4 qualified demos on the calendar. My SDRs are doing discovery calls, not doomscrolling LinkedIn for leads.",
    name: "Stuart Brent",
    title: "Founder at SaasyDB",
  },
  {
    text: "Before Rev Orchestra we blasted 2,400 emails a week for a 0.9% reply rate. After day 90, 320 emails, 11% replies, three closed deals this month.",
    name: "Amelia Cross",
    title: "Head of Growth at Northstar",
  },
  {
    text: "Rev Orchestra took prospecting off our plate completely. Warm, intent-scored leads land in my inbox every morning. We went from 6 hours a week to zero.",
    name: "Maxime Le Morillon",
    title: "Head of Sales at Martech Agency",
  },
  {
    text: "Rev Orchestra runs enrichment, drafting, and routing for us. My reps spend their day on calls now, not juggling 7 tabs.",
    name: "Kenny Saad",
    title: "CEO at Vision Media",
  },
  {
    text: "Rev Orchestra's signal layer pulled 5 demos from just 30 prospects last week. Founder contact info, straight to my inbox, zero manual chasing.",
    name: "Alessandro Paladino",
    title: "Co-Founder at KubaLabs",
  },
  {
    text: "Rev Orchestra tracks people engaging with our competitors. We land the first call before anyone else and pipeline is compounding every week.",
    name: "Nathan Amram",
    title: "Growth Automation at Mindflow",
  },
  {
    text: "The best part about Rev Orchestra is that it's ours. No retainer, no seat fees, no lock in. Ninety days, and the system lives in our stack forever.",
    name: "Amin Lams",
    title: "CEO at TheLams.io",
  },
  {
    text: "Rev Orchestra solved the hardest problem in outbound. Finding high intent leads, people already searching for what we sell, and surfacing them the moment it matters.",
    name: "Frank Houbre",
    title: "Co-founder at Lunesia",
  },
  {
    text: "Our SDR team went from 6 to 3 after Rev Orchestra. Not layoffs. The ones who stayed close deals now, they don't chase dead contacts.",
    name: "Priya Shah",
    title: "RevOps at Northstar",
  },
  {
    text: "Canceled Clay, canceled Apollo, canceled Smartlead. Rev Orchestra built one system that does what five tools pretended to do, and it actually talks to itself.",
    name: "Daniel Kim",
    title: "Founder at GrowthOS",
  },
  {
    text: "Day 92 with Rev Orchestra. Still can't believe a system this good is just mine. No seat fees, no per lead pricing, no renewal anxiety.",
    name: "Lisa Park",
    title: "Head of Revenue at DataSync",
  },
  {
    text: "Rev Orchestra's audit trail made our board happy. Every agent action is logged, reversible, reviewable. Compliance stopped pushing back after week 2.",
    name: "James Wilson",
    title: "COO at CloudBase",
  },
];

/* Split into 3 columns, distributing evenly */
const columnCount = 3;
const columns: Quote[][] = Array.from({ length: columnCount }, (_, i) =>
  quotes.filter((_, idx) => idx % columnCount === i),
);

function TestimonialCard({ q }: { q: Quote }) {
  return (
    <div
      className="text-left relative overflow-hidden transition-colors"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "24px 24px 26px",
      }}
    >
      {/* Quote first — pull quote style */}
      <p className="text-[15px] text-[rgba(255,255,255,0.85)] leading-[165%] whitespace-pre-line mb-5">
        &ldquo;{q.text}&rdquo;
      </p>
      {/* Attribution */}
      <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[14px] font-semibold text-white leading-tight">{q.name}</p>
        <p className="text-[12.5px] text-[rgba(255,255,255,0.45)] mt-1 leading-snug">{q.title}</p>
      </div>
    </div>
  );
}

/* Column with continuous vertical scroll. `direction` controls travel,
 * `duration` sets pace so the three columns feel organic, not synced. */
function ScrollColumn({
  items,
  duration,
  direction,
}: {
  items: Quote[];
  duration: number;
  direction: "up" | "down";
}) {
  const loopItems = [...items, ...items];
  return (
    <div className="flex flex-col gap-5 will-change-transform" style={{
      animation: `${direction === "up" ? "marquee-up" : "marquee-down"} ${duration}s linear infinite`,
    }}>
      {loopItems.map((q, i) => (
        <TestimonialCard key={`${q.name}-${i}`} q={q} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden" style={{ background: "rgb(0, 0, 0)" }}>
      {/* Soft ambient orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,101,10,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-12">
          <h2
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: "clamp(28px, 3.8vw, 48px)",
              fontWeight: 500,
              lineHeight: "115%",
              letterSpacing: "-1.2px",
              color: "white",
              maxWidth: 820,
              margin: "0 auto",
            }}
          >
            <span className="text-accent-orange">Testimonials</span> by agencies and B2B founders
          </h2>
        </Reveal>

        {/* 3-column vertical-scroll wall */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{
            height: 640,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <ScrollColumn items={columns[0]} duration={55} direction="up" />
          <ScrollColumn items={columns[1]} duration={70} direction="down" />
          <ScrollColumn items={columns[2]} duration={62} direction="up" />
        </div>
      </div>
    </section>
  );
}
