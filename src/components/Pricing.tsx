"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const plans = [
  {
    name: "STARTER",
    price: "$8,500",
    period: "/ENGAGEMENT",
    tagline: "Powerful & Simple Solution",
    highlighted: false,
    dotColor: "rgba(255,255,255,0.25)",
    features: [
      { text: "Full GTM diagnostic & audit", included: true },
      { text: "ICP and messaging framework", included: true },
      { text: "System architecture blueprint", included: true },
      { text: "Tool stack recommendations", included: true },
      { text: "90-minute strategy session", included: true },
      { text: "6 AI sub-agents deployed", included: false },
      { text: "Full tool integration", included: false },
    ],
  },
  {
    name: "PRO",
    price: "$18,000",
    period: "/ENGAGEMENT",
    tagline: "Powerful & Simple Solution",
    highlighted: true,
    dotColor: "#E85600",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "6 AI sub-agents deployed", included: true },
      { text: "Full tool integration & automation", included: true },
      { text: "Custom workflows in your stack", included: true },
      { text: "90-day async build support", included: true },
      { text: "You own 100% of everything", included: true },
      { text: "Extended 6-month support", included: false },
    ],
  },
  {
    name: "ENTERPRISE",
    price: "$28,000",
    period: "/ENGAGEMENT",
    tagline: "Powerful & Simple Solution",
    highlighted: false,
    dotColor: "rgb(80,200,170)",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Extended 6-month support", included: true },
      { text: "Monthly optimization sprints", included: true },
      { text: "Priority Slack access to Danny", included: true },
      { text: "Quarterly strategy reviews", included: true },
      { text: "Advanced agent customization", included: true },
      { text: "Custom reporting dashboards", included: true },
    ],
  },
];

/* ── Check / X icons — exact Cryps style: 26px filled circles ── */
function PricingIcon({ included, highlighted }: { included: boolean; highlighted: boolean }) {
  if (included) {
    return (
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          backgroundColor: highlighted ? "rgba(232,86,0,0.15)" : "rgba(255,255,255,0.06)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6l2.5 2.5L9.5 3.5"
            stroke={highlighted ? "#E85600" : "#fff"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.04)",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M3 3l4 4M7 3l-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Pricing Card — single clean card like Cryps screenshot ── */
function PricingCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 60, scale: 0.92, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      style={{ transformPerspective: 1200 }}
    >
      {/* Single card — clean like Cryps screenshot */}
      <div
        className="relative h-full flex flex-col overflow-hidden"
        style={{
          borderRadius: 36,
          backgroundColor: "rgb(14,15,17)",
          border: `1px solid ${plan.highlighted ? "rgba(232,86,0,0.25)" : "rgb(30,30,30)"}`,
        }}
      >
        {/* Orange glow for highlighted Pro card */}
        {plan.highlighted && (
          <>
            <div
              className="absolute bottom-0 right-0 w-[70%] h-[80%] pointer-events-none z-0"
              style={{
                background: "radial-gradient(ellipse at 100% 100%, rgba(232,86,0,0.2) 0%, transparent 55%)",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-[10%] right-[10%] h-[2px] rounded-full z-10"
              style={{
                background: "linear-gradient(90deg, transparent, #E85600, transparent)",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Card content */}
        <div className="relative z-[1] px-7 py-8 md:px-8 md:py-9 flex flex-col flex-1">
          {/* Plan name — dot + uppercase label */}
          <div className="flex items-center gap-2.5 mb-7">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: plan.dotColor }}
            />
            <span
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {plan.name}
            </span>
          </div>

          {/* Price — big and bold like Cryps ($25, $30, $50) */}
          <div className="flex items-baseline gap-2 mb-2">
            <span
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: 48,
                fontWeight: 500,
                lineHeight: "100%",
                letterSpacing: "-1.5px",
                color: plan.highlighted ? "#E85600" : "white",
              }}
            >
              {plan.price}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {plan.period}
            </span>
          </div>

          {/* Tagline — white, medium */}
          <p
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "150%",
              color: "white",
              marginBottom: 28,
            }}
          >
            {plan.tagline}
          </p>

          {/* CTA Button — full width pill */}
          <motion.a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5"
            style={{
              width: "100%",
              height: 52,
              borderRadius: 100,
              fontFamily: "var(--font-family-heading)",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
              marginBottom: 32,
              ...(plan.highlighted
                ? { backgroundColor: "#E85600", color: "white" }
                : {
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }),
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            GET STARTED
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          {/* Feature list */}
          <div className="flex flex-col gap-[18px] flex-1">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <PricingIcon included={feature.included} highlighted={plan.highlighted} />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: feature.included ? "white" : "rgba(255,255,255,0.25)",
                  }}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full py-24 md:py-32 bg-[rgb(14,15,17)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <Reveal variants={fadeUp}>
          <div className="text-center mb-6">
            <div
              className="relative inline-flex items-center gap-2 mb-6"
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                backgroundColor: "rgb(25,27,31)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
                Pricing
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-family-heading)",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 500,
                lineHeight: "110%",
                letterSpacing: "-2.88px",
                color: "white",
              }}
            >
              Simplest Membership
            </h2>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p
            className="text-center mx-auto mb-16"
            style={{
              maxWidth: 600,
              fontSize: 16,
              lineHeight: "150%",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            One system. Yours forever. No subscriptions, no retainers, just results you own.
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
          <p
            className="text-center mx-auto"
            style={{
              maxWidth: 520,
              fontSize: 12,
              lineHeight: "140%",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Applications only. Discovery call first. If it&apos;s not the right fit, we&apos;ll tell you on the call &mdash; before you spend anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
