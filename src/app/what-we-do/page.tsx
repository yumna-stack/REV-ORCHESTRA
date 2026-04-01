"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero, StaggerGrid, GridItem } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const agents = [
  {
    name: "Signal Agent",
    desc: "Monitors hiring signals, funding rounds, tech stack changes, and contract renewals across your ICP. Fires triggers the moment a buying window opens.",
    color: "#E8650A",
  },
  {
    name: "Research Agent",
    desc: "Compiles account briefs in under 30 seconds — company size, tech stack, decision makers, recent news. Feeds directly into copy generation.",
    color: "#6366F1",
  },
  {
    name: "Copy Agent",
    desc: "Writes personalised outreach based on the signal, the research, and the channel. Every message is contextual, not templated.",
    color: "#22C55E",
  },
  {
    name: "Outbound Agent",
    desc: "Sends multi-channel sequences — email, LinkedIn, follow-ups. Adapts timing and cadence based on engagement signals.",
    color: "#3B82F6",
  },
  {
    name: "CRM Agent",
    desc: "Updates your HubSpot or Salesforce automatically. Creates contacts, logs activities, moves deals through pipeline stages.",
    color: "#F59E0B",
  },
  {
    name: "Monitor Agent",
    desc: "Watches pipeline health, reply rates, bounce rates, and agent performance. Alerts your team in Slack when something needs attention.",
    color: "#9897FF",
  },
];

const problems = [
  {
    title: "Signal Blindness",
    desc: "You're reaching out to accounts with no buying intent. No trigger, no timing, no context. Just volume.",
  },
  {
    title: "Tool Soup",
    desc: "Clay, Instantly, HubSpot, Apollo — none of them talk to each other. Your CRM is a graveyard of outdated records.",
  },
  {
    title: "Generic Copy",
    desc: "Your outreach sounds like everyone else's. AI-written but not AI-orchestrated. More volume, same bad reply rates.",
  },
  {
    title: "Pipeline in Your Head",
    desc: "No system. No automation. Just a founder manually connecting dots between 5 tools and hoping something converts.",
  },
];

export default function WhatWeDoPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="What We Do"
        title="We build AI GTM systems that run without you."
        subtitle="Six AI agents. Connected to your stack. Orchestrating your entire go-to-market motion — from signal detection to booked meetings."
      />

      {/* Problem Section */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[1100px] mx-auto px-5">
          <Reveal variants={fadeUp} className="mb-12">
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              Why most funded founders are <span className="text-accent-orange italic">still stuck.</span>
            </h2>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((p, i) => (
              <GridItem key={i}>
                <motion.div
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-7 h-full"
                  whileHover={{ borderColor: "rgba(232,86,0,0.2)", y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{p.desc}</p>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Six Agents */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[1100px] mx-auto px-5">
          <Reveal variants={fadeUp} className="text-center mb-14">
            <Badge text="The System" />
            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6" style={{ fontFamily: "var(--font-family-heading)" }}>
              Six agents. One system. <span className="text-accent-orange italic">Always talking.</span>
            </h2>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, i) => (
              <GridItem key={i}>
                <motion.div
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-7 h-full"
                  whileHover={{ borderColor: `${agent.color}40`, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ background: agent.color }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <h3 className="text-white font-semibold">{agent.name}</h3>
                  </div>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{agent.desc}</p>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <Reveal variants={fadeUp}>
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white mb-6" style={{ fontFamily: "var(--font-family-heading)" }}>
              Ready to see what orchestration looks like for your business?
            </h2>
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
