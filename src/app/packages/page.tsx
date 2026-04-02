"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero } from "@/components/PageWrapper";
import { Reveal, fadeUp, flipUp, popIn, StaggerContainer, StaggerItem } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const included = [
  "Full GTM diagnostic & gap analysis",
  "Custom system architecture design",
  "6 AI agents built & deployed",
  "Connected to your existing stack (HubSpot, Salesforce, Clay, Instantly, etc.)",
  "Multi-channel outbound sequences (email + LinkedIn)",
  "Signal-led targeting & ICP matching",
  "CRM automation & pipeline sync",
  "Slack-based monitoring & alerts",
  "Full documentation & runbooks",
  "Team training & handover session",
  "30-day post-launch support",
  "You own everything permanently, no subscription",
];

const faqs = [
  {
    q: "Why $18,000 as a one-time fee instead of monthly?",
    a: "Because you're buying a system, not renting one. After 90 days, you own everything: the agents, the workflows, the IP. No recurring fees, no vendor lock-in. Most founders save $3,500+/month in tool consolidation alone.",
  },
  {
    q: "What if I need changes after the 90 days?",
    a: "You get 30 days of post-launch support included. After that, your team can modify the system. We provide full documentation. We also offer optional retainer packages for ongoing optimisation.",
  },
  {
    q: "How does this compare to hiring an SDR team?",
    a: "A single SDR costs $60-80K/year fully loaded. Rev Orchestra replaces the manual work of 2-3 SDRs with a system that runs 24/7, never takes holidays, and improves over time. The $18K pays for itself within the first quarter.",
  },
  {
    q: "Why only 4 clients per quarter?",
    a: "Each build is custom. We go deep into your business, your ICP, your messaging, your stack. That level of attention doesn't scale past 4 concurrent builds without quality dropping.",
  },
];

export default function PackagesPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="Packages"
        title="One system. One price. Yours forever."
        subtitle="$18,000 one-time investment for a complete AI-orchestrated GTM system built in 90 days."
      />

      {/* Pricing card */}
      <section className="w-full py-16 bg-[rgb(14,15,17)]">
        <div className="max-w-[700px] mx-auto px-5">
          <Reveal variants={popIn} once={false}>
            {/* Outer shell - glassmorphic */}
            <motion.div
              className="rounded-[36px] p-[6px] border border-[rgba(232,86,0,0.25)] relative overflow-hidden"
              whileHover={{ scale: 1.01, borderColor: "rgba(232,86,0,0.4)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Inner card */}
              <div className="rounded-[30px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden relative">
                {/* Orange glow at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,86,0,0.12) 0%, transparent 65%)",
                  }}
                />

                {/* Animated bottom orange line */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                  <motion.div
                    className="h-full w-[60%] mx-auto"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(232,86,0,0.6), transparent)",
                    }}
                    animate={{ x: ["-30%", "30%", "-30%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="relative z-10 p-10">
                  <div className="text-center mb-8">
                    <p className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-3">Rev Orchestra, Full Build</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-[64px] font-bold text-white leading-none tracking-[-3px]">$18,000</span>
                    </div>
                    <p className="text-sm text-[rgba(255,255,255,0.4)] mt-2">One-time. You own everything. No subscription.</p>
                  </div>

                  <div className="w-full h-px bg-[rgba(255,255,255,0.06)] my-8" />

                  <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-5">Everything included</p>

                  <StaggerContainer className="grid grid-cols-1 gap-3" staggerDelay={0.06} once={false}>
                    {included.map((item, i) => (
                      <StaggerItem key={i} variants={fadeUp}>
                        <motion.div
                          className="flex items-start gap-3"
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                            <path d="M3 8l3.5 3.5L13 5" stroke="#E8650A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-sm text-[rgba(255,255,255,0.6)] leading-[160%]">{item}</span>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <div className="text-center mt-10">
                    <motion.a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Book a Call with Danny
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.a>
                    <p className="text-xs text-green-500 mt-4">4 spots available for 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section className="w-full py-16 bg-[rgb(14,15,17)]">
        <div className="max-w-[600px] mx-auto px-5">
          <Reveal variants={flipUp} once={false}>
            {/* Outer shell - glassmorphic */}
            <motion.div
              className="rounded-[28px] p-[6px] border border-[rgba(232,86,0,0.25)] relative overflow-hidden"
              whileHover={{ scale: 1.02, borderColor: "rgba(232,86,0,0.4)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Inner card */}
              <div className="rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden relative p-6">
                {/* Orange glow at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,86,0,0.12) 0%, transparent 65%)",
                  }}
                />

                {/* Animated bottom orange line */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                  <motion.div
                    className="h-full w-[60%] mx-auto"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(232,86,0,0.6), transparent)",
                    }}
                    animate={{ x: ["-30%", "30%", "-30%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm text-[rgba(255,255,255,0.4)]">Legacy stack (monthly tools + SDR)</span>
                    <span className="text-sm text-[rgba(255,255,255,0.3)] line-through">$3,500+/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">With Rev Orchestra</span>
                    <span className="text-sm text-accent-orange font-bold">$18,000 once, yours forever</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[700px] mx-auto px-5">
          <Reveal variants={fadeUp} className="text-center mb-12" once={false}>
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              Common questions
            </h2>
          </Reveal>

          <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1} once={false}>
            {faqs.map((faq, i) => (
              <StaggerItem key={i} variants={flipUp}>
                {/* Outer shell - glassmorphic */}
                <motion.div
                  className="rounded-[28px] p-[6px] border border-[rgba(232,86,0,0.25)] relative overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "rgba(232,86,0,0.4)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Inner card */}
                  <div className="rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden relative p-6">
                    {/* Orange glow at bottom */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,86,0,0.12) 0%, transparent 65%)",
                      }}
                    />

                    {/* Animated bottom orange line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                      <motion.div
                        className="h-full w-[60%] mx-auto"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(232,86,0,0.6), transparent)",
                        }}
                        animate={{ x: ["-30%", "30%", "-30%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-white font-medium mb-3">{faq.q}</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
