"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  slideRight,
  popIn,
} from "@/components/motion";

/* ── Animated counter hook ── */
function useCountUp(
  end: string,
  duration: number = 1.8,
  inView: boolean
) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Parse the numeric portion
    const match = end.match(/^([\d.]+)/);
    if (!match) {
      setDisplay(end);
      return;
    }

    const numericEnd = parseFloat(match[1]);
    const suffix = end.slice(match[1].length); // e.g. "x", "%", "B"
    const prefix = end.match(/^[^\d]*/)?.[0] ?? ""; // e.g. "$"
    const cleanEnd = end.replace(/^[^\d]*/, "");
    const cleanMatch = cleanEnd.match(/^([\d.]+)/);
    if (!cleanMatch) {
      setDisplay(end);
      return;
    }

    const hasDecimal = cleanMatch[1].includes(".");
    const decimalPlaces = hasDecimal
      ? cleanMatch[1].split(".")[1]?.length ?? 0
      : 0;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = numericEnd * eased;

      if (hasDecimal) {
        setDisplay(current.toFixed(decimalPlaces));
      } else {
        setDisplay(Math.round(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return display;
}

/* ── Stat card component ── */
function StatCard({
  rawNumber,
  displayPrefix,
  displaySuffix,
  description,
  source,
  inView,
}: {
  rawNumber: string;
  displayPrefix?: string;
  displaySuffix?: string;
  description: string;
  source: string;
  inView: boolean;
}) {
  const count = useCountUp(rawNumber, 1.8, inView);

  return (
    <div className="rounded-[20px] bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] p-7 flex flex-col h-full">
      <span
        className="text-accent-orange text-[clamp(32px,4vw,48px)] font-bold leading-[110%] mb-3"
        style={{ fontFamily: "var(--font-family-heading)" }}
      >
        {displayPrefix}
        {count}
        {displaySuffix}
      </span>
      <p className="text-sm text-white leading-[170%] mb-4 flex-1">
        {description}
      </p>
      <p className="text-xs text-[rgba(255,255,255,0.3)] italic">{source}</p>
    </div>
  );
}

const stats = [
  {
    rawNumber: "7",
    displayPrefix: "4-",
    displaySuffix: "\u00d7",
    description:
      "higher conversions for AI-native GTM teams vs. traditional outbound",
    source: "Source: Landbase, 2026",
  },
  {
    rawNumber: "70",
    displayPrefix: "",
    displaySuffix: "%",
    description:
      "of B2B companies adopting AI-driven GTM by end of 2026",
    source: "Source: Gartner, 2025",
  },
  {
    rawNumber: "240",
    displayPrefix: "$58B \u2192 $",
    displaySuffix: "B",
    description:
      "AI GTM market growing to $240B by 2030 (32.9% CAGR)",
    source: "",
  },
];

export default function TheShift() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: false, amount: 0.3 });

  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="mb-16 max-w-[800px]">
          <Reveal variants={slideRight}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(255,255,255,0.5)] tracking-wider uppercase w-fit mb-6">
              THE SHIFT
            </div>
          </Reveal>

          <Reveal variants={slideRight} delay={0.1}>
            <h2
              className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-5"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              WHY THE OLD PLAYBOOK STOPPED WORKING
            </h2>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15}>
            <p className="text-lg text-accent-orange leading-[150%] mb-5">
              AI amplifies what&apos;s already there. If the system is broken,
              AI just breaks it faster.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-5">
              Most companies deploying AI in their go-to-market are bolting it
              onto a broken process. They automate bad sequences. They scale
              generic messaging. They generate more volume into channels that
              already ignore them. The result is the same pipeline problem,
              just more expensive and harder to diagnose.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.25}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-5">
              The companies getting 5&ndash;12% reply rates aren&apos;t using
              better AI. They&apos;re using AI on a better system. Signals feed
              the targeting. The targeting shapes the copy. The copy adapts to
              the channel. Every layer is connected, and the AI orchestrates
              the sequence instead of just writing it.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.3}>
            <p className="text-base text-white font-medium leading-[170%]">
              That playbook-first, system-first approach is exactly what 90
              days with Rev Orchestra builds.
            </p>
          </Reveal>
        </div>

        {/* 3 Stat Cards */}
        <div ref={statsRef}>
          <StaggerContainer
            staggerDelay={0.2}
            initialDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {stats.map((stat, i) => (
              <StaggerItem key={i} variants={popIn}>
                <StatCard
                  rawNumber={stat.rawNumber}
                  displayPrefix={stat.displayPrefix}
                  displaySuffix={stat.displaySuffix}
                  description={stat.description}
                  source={stat.source}
                  inView={inView}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
