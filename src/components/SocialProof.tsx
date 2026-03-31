"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  fadeLeft,
  popIn,
} from "@/components/motion";

const communityQuotes = [
  {
    text: "We deployed an AI SDR without fixing our playbook first. Two months later: no pipeline and a scorched list. AI just made us fail faster.",
    source: "SaaStr community thread, Feb 2026",
  },
  {
    text: "I have Clay, Apollo, HubSpot, and Instantly. None of them talk to each other. My CRM is a lie and my sequences reset every quarter.",
    source: "r/sales, 2025",
  },
  {
    text: "Outbound isn\u2019t dead. Volume-based, untriggered, spray-and-pray outbound is dead. Teams using signals are getting 8\u201312% reply rates. The rest are at 1%.",
    source: "GTM community, 2026",
  },
  {
    text: "Everybody jumped on AI without strategy. Reply rates went from 18% to single digits once mass AI messaging became the norm.",
    source: "Sales leader, shared publicly",
  },
  {
    text: "The real struggle isn\u2019t just lead gen, it\u2019s the entire GTM funnel. Fragmented tools, scattered data, hours lost trying to connect market intelligence to actual execution.",
    source: "Reddit user, r/sales 2025",
  },
];

const clientResults = [
  {
    text: "Rev Orchestra built the system we should have had at Series A. Three months in: 11 qualified calls booked per month from outbound. Before, that number was 2.",
    source: "[Client Name], CEO",
  },
  {
    text: "The signal agent alone changed our outbound.",
    source: "[Client Name], VP Sales",
  },
  {
    text: "I cancelled four tools after the build. The agents do more than all of them combined. And I own it.",
    source: "[Client Name], Founder",
  },
];

export default function SocialProof() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
                Social Proof
              </span>
            </div>
            <h2
              className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              YOU&apos;RE NOT ALONE IN THIS
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[660px] mx-auto mb-16 leading-relaxed">
            Every week, thousands of founders post the same thing. We read the
            threads so you don&apos;t have to.
          </p>
        </Reveal>

        {/* Community Quotes */}
        <StaggerContainer
          staggerDelay={0.12}
          className="flex flex-col gap-5 mb-20"
        >
          {communityQuotes.map((quote, i) => (
            <StaggerItem key={i} variants={fadeLeft}>
              <div className="rounded-[16px] bg-[rgb(18,19,23)] border border-[rgba(255,255,255,0.05)] border-l-2 border-l-accent-orange p-6 md:p-8">
                <p className="text-[rgba(255,255,255,0.75)] italic leading-relaxed mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <span className="text-xs text-[rgba(255,255,255,0.35)] tracking-wide">
                  &mdash; {quote.source}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Client Results */}
        <Reveal variants={fadeUp}>
          <h3
            className="text-center text-white text-2xl md:text-3xl font-medium mb-10 tracking-[-1px]"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            WHAT OUR CLIENTS SAY
          </h3>
        </Reveal>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {clientResults.map((result, i) => (
            <StaggerItem key={i} variants={popIn}>
              <motion.div
                className="rounded-[20px] bg-[rgb(18,19,23)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 h-full flex flex-col justify-between"
                whileHover={{ borderColor: "rgba(232,86,0,0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[rgba(255,255,255,0.75)] italic leading-relaxed mb-4">
                  &ldquo;{result.text}&rdquo;
                </p>
                <span className="text-xs text-accent-orange tracking-wide font-medium">
                  &mdash; {result.source}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
