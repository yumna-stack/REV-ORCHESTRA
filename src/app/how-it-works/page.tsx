"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero, StaggerGrid, GridItem } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const steps = [
  {
    number: "01",
    title: "Map the Gaps",
    timeline: "Week 1\u20132",
    description: "We go inside your business before we build anything. ICP audit. Messaging review. Signal gap analysis. CRM health check. Tool overlap mapping. You get a full diagnostic report — what\u2019s working, what\u2019s broken, what\u2019s missing.",
    deliverables: ["ICP audit & scoring model", "Signal gap analysis", "CRM health report", "Tool overlap map", "Messaging scorecard"],
  },
  {
    number: "02",
    title: "Design the Machine",
    timeline: "Week 2\u20133",
    description: "Nothing gets built until you\u2019ve signed off on the blueprint. We design the full system architecture on paper \u2014 which agents do what, how they connect, what triggers what, and how data flows between your tools.",
    deliverables: ["Agent architecture diagram", "Data flow map", "Trigger & signal definitions", "Integration plan", "Your sign-off before a line of code"],
  },
  {
    number: "03",
    title: "Build the Orchestra",
    timeline: "Week 3\u201310",
    description: "Six agents go live, one by one, connected to your existing stack. Signal detection. Research. Copy generation. Multi-channel outbound. CRM sync. Pipeline monitoring. Each agent is tested individually, then connected to the full system.",
    deliverables: ["6 AI agents deployed", "Connected to your HubSpot/Salesforce", "Clay + Instantly + n8n integrations", "Slack notifications", "Multi-channel sequences live"],
  },
  {
    number: "04",
    title: "Hand the Keys Over",
    timeline: "Week 11\u201312",
    description: "Two weeks of live optimisation and monitoring. We tune the system, fix edge cases, and make sure everything runs smoothly. Then we hand it over \u2014 all of it. The system, the workflows, the agents, the IP. Yours permanently.",
    deliverables: ["Full system ownership transfer", "Documentation & runbooks", "Team training session", "30-day support window", "No ongoing subscription"],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="How It Works"
        title="Four steps. 90 days. Then it's yours."
        subtitle="A systematic approach to building your AI-orchestrated GTM system. No rushing, no shortcuts, no half-built systems."
      />

      {/* Timeline */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[900px] mx-auto px-5">
          {steps.map((step, i) => (
            <Reveal key={i} variants={fadeUp} delay={i * 0.1}>
              <div className="relative pl-12 pb-16 last:pb-0">
                {/* Timeline line */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="absolute left-[18px] top-10 bottom-0 w-px"
                    style={{ background: "linear-gradient(to bottom, #E8650A, rgba(255,255,255,0.06))" }}
                    initial={{ scaleY: 0, transformOrigin: "top" }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                )}

                {/* Step circle */}
                <motion.div
                  className="absolute left-0 top-0 w-9 h-9 rounded-full border-2 border-accent-orange bg-[rgb(14,15,17)] flex items-center justify-center"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-accent-orange text-xs font-bold">{step.number}</span>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-7"
                  whileHover={{ borderColor: "rgba(232,86,0,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-white text-xl font-semibold" style={{ fontFamily: "var(--font-family-heading)" }}>
                      {step.title}
                    </h3>
                    <span className="text-xs text-accent-orange bg-accent-orange/10 px-2.5 py-1 rounded-full font-medium">{step.timeline}</span>
                  </div>

                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] mb-5">{step.description}</p>

                  <div className="border-t border-[rgba(255,255,255,0.06)] pt-4">
                    <p className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-3">Deliverables</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d, j) => (
                        <motion.span
                          key={j}
                          className="text-[11px] text-[rgba(255,255,255,0.5)] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + j * 0.05 }}
                        >
                          {d}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <Reveal variants={fadeUp}>
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white mb-4" style={{ fontFamily: "var(--font-family-heading)" }}>
              The founders who built their system in Q1 are already booking calls from it.
            </h2>
            <p className="text-sm text-[rgba(255,255,255,0.4)] mb-8">4 spots available for Q2 2026.</p>
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
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
