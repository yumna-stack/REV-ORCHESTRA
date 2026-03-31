"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const steps = [
  {
    number: "01",
    title: "Map the Gaps",
    timeline: "Week 1\u20132",
    description:
      "We go inside your business before we build anything. ICP audit. Messaging review. Signal gap analysis. CRM health check. Tool overlap mapping.",
  },
  {
    number: "02",
    title: "Design the Machine",
    timeline: "Week 2\u20133",
    description:
      "Nothing gets built until you\u2019ve signed off on the blueprint. We design the full system on paper.",
  },
  {
    number: "03",
    title: "Build the Orchestra",
    timeline: "Week 3\u201310",
    description:
      "Six agents go live, one by one, connected to your existing stack.",
  },
  {
    number: "04",
    title: "Hand the Keys Over",
    timeline: "Week 11\u201312",
    description:
      "Two weeks of live optimisation, then it\u2019s yours. All of it. The system, the workflows, the agents, the IP \u2014 yours permanently.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]"
    >
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp} className="text-center mb-16">
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
              The Process
            </span>
          </div>
          <h2
            className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mb-4"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            THE PROCESS
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[600px] mx-auto">
            Four steps. 90 days. The system runs after we leave.
          </p>
        </Reveal>

        {/* 2x2 Step Cards */}
        <StaggerContainer
          staggerDelay={0.2}
          initialDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {steps.map((step, i) => (
            <StaggerItem key={i} variants={popIn}>
              <div
                className="rounded-[42px] p-[8px]"
                style={{
                  border: "0.93px solid rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="relative rounded-[36px] overflow-hidden"
                  style={{
                    border: "1px solid rgba(41,42,43,1)",
                    background: "rgb(14,15,17)",
                  }}
                >
                  {/* Orange glow top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, #E85600 30%, #E85600 70%, transparent 100%)",
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-accent-orange/10 blur-2xl rounded-full" />

                  <div className="px-8 py-8">
                    {/* Step number + timeline */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-accent-orange text-sm font-bold tracking-wider"
                        style={{
                          fontFamily: "var(--font-family-heading)",
                        }}
                      >
                        STEP {step.number}
                      </span>
                      <span className="text-xs text-[rgba(255,255,255,0.3)] tracking-wider">
                        {step.timeline}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-semibold text-white mb-3"
                      style={{
                        fontFamily: "var(--font-family-heading)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
