"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const problems = [
  {
    number: "01",
    title: "Signal Blindness",
    description:
      "Every day, dozens of your best-fit buyers change jobs, raise funding, or switch off a competitor\u2019s tool. Without a signal layer watching those triggers 24/7, you never catch the window.",
  },
  {
    number: "02",
    title: "Tool Soup",
    description:
      "You have Clay, Instantly, HubSpot, and three other subscriptions that barely work together. None of them share memory. Your CRM doesn\u2019t know what your outbound tool sent last week.",
  },
  {
    number: "03",
    title: "Copy That Sounds Like Everyone Else",
    description:
      "Buyers spot AI-generated outreach in the first sentence. Reply rates for generic sequences dropped from 4% to under 1% in 18 months.",
  },
  {
    number: "04",
    title: "Pipeline That Lives in Your Head",
    description:
      "You\u2019re still the best salesperson in the company. The moment you stop doing outreach personally, pipeline stops. That\u2019s not a business \u2014 that\u2019s a job with a startup attached.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(8,8,15)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="mb-16 max-w-[800px]">
          <Reveal variants={fadeUp}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(255,255,255,0.5)] tracking-wider uppercase w-fit mb-6">
              THE REAL PROBLEM
            </div>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <h2
              className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-5"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              WHY MOST FUNDED FOUNDERS ARE STILL STUCK
            </h2>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15}>
            <p className="text-lg text-accent-orange leading-[150%] mb-5">
              You raised the money. You bought the tools. The pipeline still
              feels random.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-5">
              GTM changed quietly in 2025. Buyers got faster, inboxes got
              noisier, and signals started moving in hours not weeks. But most
              GTM playbooks didn&apos;t change. Founders are still running the
              same sequences they built in 2023 &mdash; and wondering why reply
              rates keep dropping.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.25}>
            <p className="text-base text-[rgba(255,255,255,0.4)] leading-[170%]">
              The teams winning right now aren&apos;t doing more outbound.
              They&apos;re doing smarter outbound. Signal-triggered.
              Account-specific. Coordinated across every channel simultaneously.
              Without a system that does that automatically, you&apos;re
              competing on volume against teams that compete on precision.
              It&apos;s not a fair fight.
            </p>
          </Reveal>
        </div>

        {/* 2x2 Problem Cards */}
        <StaggerContainer
          staggerDelay={0.15}
          initialDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {problems.map((problem, i) => (
            <StaggerItem key={i} variants={popIn}>
              <div className="rounded-[20px] bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] p-7 h-full">
                <span
                  className="text-accent-orange text-sm font-semibold tracking-wider mb-3 block"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  {problem.number}
                </span>
                <h3
                  className="text-lg font-semibold text-white mb-3"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  {problem.title}
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">
                  {problem.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
