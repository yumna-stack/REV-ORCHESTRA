"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";

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
  "You own everything permanently — no subscription",
];

const faqs = [
  {
    q: "Why $18,000 as a one-time fee instead of monthly?",
    a: "Because you're buying a system, not renting one. After 90 days, you own everything — the agents, the workflows, the IP. No recurring fees, no vendor lock-in. Most founders save $3,500+/month in tool consolidation alone.",
  },
  {
    q: "What if I need changes after the 90 days?",
    a: "You get 30 days of post-launch support included. After that, your team can modify the system — we provide full documentation. We also offer optional retainer packages for ongoing optimisation.",
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
          <Reveal variants={fadeUp}>
            <div className="rounded-[28px] border border-[rgba(232,86,0,0.25)] bg-[rgba(255,255,255,0.02)] p-10 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent-orange/8 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <p className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-3">Rev Orchestra — Full Build</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-[64px] font-bold text-white leading-none tracking-[-3px]">$18,000</span>
                  </div>
                  <p className="text-sm text-[rgba(255,255,255,0.4)] mt-2">One-time. You own everything. No subscription.</p>
                </div>

                <div className="w-full h-px bg-[rgba(255,255,255,0.06)] my-8" />

                <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-5">Everything included</p>
                <div className="grid grid-cols-1 gap-3">
                  {included.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                        <path d="M3 8l3.5 3.5L13 5" stroke="#E8650A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-[rgba(255,255,255,0.6)] leading-[160%]">{item}</span>
                    </motion.div>
                  ))}
                </div>

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
                  <p className="text-xs text-green-500 mt-4">4 spots available for Q2 2026</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section className="w-full py-16 bg-[rgb(14,15,17)]">
        <div className="max-w-[600px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <span className="text-sm text-[rgba(255,255,255,0.4)]">Legacy stack (monthly tools + SDR)</span>
                <span className="text-sm text-[rgba(255,255,255,0.3)] line-through">$3,500+/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white font-medium">With Rev Orchestra</span>
                <span className="text-sm text-accent-orange font-bold">$18,000 once — yours forever</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[700px] mx-auto px-5">
          <Reveal variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              Common questions
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} variants={fadeUp} delay={i * 0.08}>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
                  <h3 className="text-white font-medium mb-3">{faq.q}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
