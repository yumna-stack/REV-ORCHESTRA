"use client";

import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const trustItems = [
  {
    emoji: "\uD83D\uDD27",
    title: "Your stack, your data",
    description:
      "We build inside your n8n instance. Nothing passes through our servers.",
  },
  {
    emoji: "\uD83D\uDC64",
    title: "Human-in-the-loop by default",
    description:
      "Every major automation gets your sign-off before going live.",
  },
  {
    emoji: "\uD83C\uDF0D",
    title: "GDPR-aware enrichment sources",
    description:
      "Every data source we use operates under GDPR-compliant terms.",
  },
  {
    emoji: "\uD83D\uDCCB",
    title: "Full audit trail",
    description:
      "Every agent action is logged. Review anything, anytime.",
  },
  {
    emoji: "\uD83D\uDD10",
    title: "Role-based access",
    description:
      "Your team sees what they need. Nothing more.",
  },
  {
    emoji: "\u2705",
    title: "ISO 27001 process initiated",
    description:
      "We\u2019re working toward certification.",
  },
];

export default function Compliance() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(8,8,15)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
                Trust &amp; Compliance
              </span>
            </div>
            <h2
              className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              HOW WE HANDLE YOUR DATA
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[500px] mx-auto mb-16 leading-relaxed">
            Your business data is not our product.
          </p>
        </Reveal>

        {/* Trust Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {trustItems.map((item, i) => (
            <StaggerItem key={i} variants={popIn}>
              <div className="rounded-[20px] bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8">
                <span className="text-3xl mb-4 block">{item.emoji}</span>
                <h3 className="text-white font-semibold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
