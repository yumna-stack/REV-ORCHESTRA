"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const features = [
  "Full 4-phase delivery (Diagnose, Design, Build, Orchestrate)",
  "6 AI sub-agents deployed and connected to your stack",
  "Custom ICP and messaging framework built from scratch",
  "90-day async support during the build",
  "30-day post-handoff support window",
  "Full documentation and team training session",
  "You own 100% of the workflows, agents, and IP",
  "Maximum 4 clients per quarter \u2014 quality, not scale",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
                Pricing
              </span>
            </div>
            <h2
              className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              THE INVESTMENT
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-lg md:text-xl text-accent-orange font-medium max-w-[600px] mx-auto mb-4">
            One fee. One system. Yours forever.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.2}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[740px] mx-auto mb-16 leading-relaxed">
            Most Seed-to-Series A founders spend $3,000&ndash;4,000/month on GTM
            tools that don&apos;t coordinate. That&apos;s $36,000&ndash;48,000 per
            year &mdash; for a stack with no memory, no handoffs, and no one making
            sure the signals actually trigger the right outreach. Rev Orchestra
            builds the system once. One price. You own it permanently.
          </p>
        </Reveal>

        {/* Pricing Card */}
        <Reveal variants={popIn} delay={0.25}>
          <motion.div
            className="relative max-w-[600px] mx-auto rounded-[28px] overflow-hidden"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Orange glow border effect */}
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(232,86,0,0.5) 0%, rgba(232,86,0,0.1) 40%, rgba(232,86,0,0.05) 60%, rgba(232,86,0,0.4) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Glow behind the card */}
            <div className="absolute -inset-1 rounded-[32px] bg-accent-orange/10 blur-xl pointer-events-none" />

            {/* Card content */}
            <div className="relative rounded-[28px] bg-[rgb(18,19,23)] border border-[rgba(232,86,0,0.25)] p-8 md:p-10">
              {/* Corner glows */}
              <div
                className="absolute top-0 left-0 w-[160px] h-[160px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, rgba(232,86,0,0.12) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-[160px] h-[160px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom right, rgba(232,86,0,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Price */}
              <div className="text-center mb-8 relative z-10">
                <span
                  className="block text-[clamp(48px,6vw,72px)] font-bold text-accent-orange leading-none tracking-[-2px]"
                  style={{ fontFamily: "var(--font-family-heading)" }}
                >
                  $18,000
                </span>
                <span className="text-sm text-[rgba(255,255,255,0.45)] mt-2 block">
                  one-time &middot; 50% upfront, 50% at handoff &middot; USD
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-8" />

              {/* Features */}
              <StaggerContainer
                staggerDelay={0.08}
                className="flex flex-col gap-4 mb-8 relative z-10"
              >
                {features.map((feature, i) => (
                  <StaggerItem key={i} variants={fadeUp}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-accent-orange/15 flex items-center justify-center shrink-0">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5l2.5 2.5L8 3"
                            stroke="#E85600"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white font-medium leading-snug">
                        {feature}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-8" />

              {/* Scarcity */}
              <p className="text-center text-sm text-accent-orange font-medium mb-6 relative z-10">
                <span className="mr-1" aria-hidden="true">
                  &#x1F3AF;
                </span>
                4 seats available for Q2 2026. Applications open.
              </p>

              {/* CTA Button */}
              <div className="relative z-10">
                <a
                  href="https://calendly.com/danny-revorchestra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-accent-orange text-white font-semibold text-center text-base tracking-wide hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book a Call with Danny
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Note */}
        <Reveal variants={fadeUp} delay={0.35}>
          <p className="text-center text-xs text-[rgba(255,255,255,0.35)] max-w-[520px] mx-auto mt-8 leading-relaxed">
            Applications only. Discovery call first. If it&apos;s not the right
            fit, we&apos;ll tell you on the call &mdash; before you spend anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
