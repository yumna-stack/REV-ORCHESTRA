"use client";

import { motion } from "framer-motion";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  popIn,
} from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const plans = [
  {
    name: "STARTER",
    price: "$8,500",
    period: "/engagement",
    tagline: "GTM Audit + Blueprint",
    highlighted: false,
    features: [
      "Full GTM diagnostic & audit",
      "ICP and messaging framework",
      "System architecture blueprint",
      "Tool stack recommendations",
      "90-minute strategy session",
      "Written playbook document",
    ],
  },
  {
    name: "PRO",
    price: "$18,000",
    period: "/engagement",
    tagline: "Full 90-Day System Build",
    highlighted: true,
    features: [
      "Everything in Starter",
      "6 AI sub-agents deployed",
      "Full tool integration & automation",
      "Custom workflows in your stack",
      "90-day async build support",
      "30-day post-handoff support",
      "Team training session",
      "You own 100% of everything",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "$28,000",
    period: "/engagement",
    tagline: "Full Build + Ongoing Orchestration",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Extended 6-month support",
      "Monthly optimization sprints",
      "Priority Slack access to Danny",
      "Quarterly strategy reviews",
      "Advanced agent customization",
      "Dedicated account manager",
      "Custom reporting dashboards",
    ],
  },
];

/* ── Framer-style pricing card ── */
function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[number];
  index: number;
}) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      style={{ transformPerspective: 1200 }}
    >
      {/* Outer shell — Framer pattern: thin outline + padding */}
      <div
        className={`h-full rounded-[36px] p-[6px] border ${
          plan.highlighted
            ? "border-[rgba(232,86,0,0.25)]"
            : "border-[rgba(255,255,255,0.03)]"
        }`}
      >
        {/* Inner card */}
        <div className="relative h-full rounded-[30px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden flex flex-col">
          {/* Orange glow overlay for highlighted card */}
          {plan.highlighted && (
            <>
              <div
                className="absolute bottom-0 right-0 w-[60%] h-[70%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 100%, rgba(232,86,0,0.15) 0%, transparent 60%)",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-[10%] right-[10%] h-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E85600, transparent)",
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          <div className="relative z-[1] p-7 md:p-8 flex flex-col flex-1">
            {/* Plan name badge */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className={`w-2 h-2 rounded-full ${
                  plan.highlighted ? "bg-accent-orange" : "bg-[rgba(255,255,255,0.25)]"
                }`}
              />
              <span className="text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] font-medium">
                {plan.name}
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span
                className={`text-[clamp(36px,4vw,48px)] font-medium leading-none tracking-[-2px] ${
                  plan.highlighted ? "text-accent-orange" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-family-heading)" }}
              >
                {plan.price}
              </span>
              <span className="text-sm text-[rgba(255,255,255,0.35)] ml-2">
                {plan.period}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-[rgba(255,255,255,0.5)] font-medium mb-6">
              {plan.tagline}
            </p>

            {/* CTA Button */}
            <motion.a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3.5 rounded-full text-sm font-semibold text-center uppercase tracking-wider flex items-center justify-center gap-2 transition-all mb-7 ${
                plan.highlighted
                  ? "bg-accent-orange text-white hover:brightness-110"
                  : "bg-transparent border border-[rgba(255,255,255,0.15)] text-white hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              GET STARTED
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-6" />

            {/* Features */}
            <div className="flex flex-col gap-3.5 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 mt-0.5 rounded-full bg-accent-orange/12 flex items-center justify-center shrink-0">
                    <svg
                      width="8"
                      height="8"
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
                  <span className="text-sm text-[rgba(255,255,255,0.6)] leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]"
    >
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
              className="text-[clamp(28px,4vw,56px)] font-medium leading-[110%] tracking-[-2.88px] text-white italic"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              Simplest Membership
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="text-center text-[rgba(255,255,255,0.55)] max-w-[600px] mx-auto mb-16 leading-relaxed">
            One system. Yours forever. No subscriptions, no retainers — just
            results you own.
          </p>
        </Reveal>

        {/* 3-card pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Note */}
        <Reveal variants={fadeUp} delay={0.35}>
          <p className="text-center text-xs text-[rgba(255,255,255,0.35)] max-w-[520px] mx-auto leading-relaxed">
            Applications only. Discovery call first. If it&apos;s not the right
            fit, we&apos;ll tell you on the call &mdash; before you spend
            anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
