"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  fadeLeft,
  fadeRight,
  popIn,
} from "@/components/motion";

const dashboardItems = [
  "Shows last week\u2019s data",
  "Reports activity",
  "One tool\u2019s view",
  "Someone has to read it and decide",
  "\u201c40 leads opened your email\u201d",
];

const commandCenterItems = [
  "Reacts to what\u2019s happening right now",
  "Takes action automatically",
  "Every tool connected, one memory",
  "Runs the next step without being asked",
  "\u201cTells you which 3 to call, drafts the follow-up, logs it in CRM\u201d",
];

export default function CommandCenter() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[rgb(8,8,15)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <Reveal variants={fadeUp}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(255,255,255,0.5)] tracking-wider uppercase w-fit mx-auto mb-6">
              COMMAND CENTER
            </div>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <h2
              className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-5"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              THE WAY GTM ACTUALLY WORKS NOW
            </h2>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15}>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%]">
              A dashboard tells you what happened. A command center decides
              what happens next.
            </p>
          </Reveal>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard (Left) */}
          <Reveal variants={fadeLeft}>
            <div className="rounded-[20px] bg-[rgb(14,15,17)] border border-[rgba(255,255,255,0.06)] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.15)]" />
                <h3
                  className="text-lg font-semibold text-[rgba(255,255,255,0.4)]"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  Dashboard
                </h3>
              </div>

              <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-0">
                {dashboardItems.map((item, i) => (
                  <StaggerItem key={i} variants={fadeUp}>
                    <div className="flex items-start gap-3 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.15)] shrink-0" />
                      <span className="text-sm text-[rgba(255,255,255,0.4)] leading-[160%]">
                        {item}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>

          {/* Command Center (Right) */}
          <Reveal variants={fadeRight}>
            <div className="relative rounded-[20px] bg-[rgb(14,15,17)] border border-accent-orange/30 p-8 h-full overflow-hidden">
              {/* Orange glow */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-accent-orange/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-orange to-transparent" />

              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent-orange" />
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  Command Center
                </h3>
              </div>

              <StaggerContainer
                staggerDelay={0.1}
                initialDelay={0.2}
                className="relative flex flex-col gap-0"
              >
                {commandCenterItems.map((item, i) => (
                  <StaggerItem key={i} variants={fadeUp}>
                    <div className="flex items-start gap-3 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-orange shrink-0" />
                      <span className="text-sm text-[rgba(255,255,255,0.7)] leading-[160%]">
                        {item}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
