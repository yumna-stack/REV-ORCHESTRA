"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero } from "@/components/PageWrapper";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, fadeLeft, fadeRight, popIn, flipUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const agents = [
  {
    name: "Signal Agent",
    icon: "S",
    desc: "Monitors hiring signals, funding rounds, tech stack changes, and contract renewals across your ICP. Fires triggers the moment a buying window opens.",
    color: "#E8650A",
  },
  {
    name: "Research Agent",
    icon: "R",
    desc: "Compiles account briefs in under 30 seconds \u2014 company size, tech stack, decision makers, recent news. Feeds directly into copy generation.",
    color: "#6366F1",
  },
  {
    name: "Copy Agent",
    icon: "C",
    desc: "Writes personalised outreach based on the signal, the research, and the channel. Every message is contextual, not templated.",
    color: "#22C55E",
  },
  {
    name: "Outbound Agent",
    icon: "O",
    desc: "Sends multi-channel sequences \u2014 email, LinkedIn, follow-ups. Adapts timing and cadence based on engagement signals.",
    color: "#3B82F6",
  },
  {
    name: "CRM Agent",
    icon: "CR",
    desc: "Updates your HubSpot or Salesforce automatically. Creates contacts, logs activities, moves deals through pipeline stages.",
    color: "#F59E0B",
  },
  {
    name: "Monitor Agent",
    icon: "M",
    desc: "Watches pipeline health, reply rates, bounce rates, and agent performance. Alerts your team in Slack when something needs attention.",
    color: "#9897FF",
  },
];

const problems = [
  {
    title: "Signal Blindness",
    desc: "You\u2019re reaching out to accounts with no buying intent. No trigger, no timing, no context. Just volume.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    title: "Tool Soup",
    desc: "Clay, Instantly, HubSpot, Apollo \u2014 none of them talk to each other. Your CRM is a graveyard of outdated records.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    title: "Generic Copy",
    desc: "Your outreach sounds like everyone else\u2019s. AI-written but not AI-orchestrated. More volume, same bad reply rates.",
    icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  },
  {
    title: "Pipeline in Your Head",
    desc: "No system. No automation. Just a founder manually connecting dots between 5 tools and hoping something converts.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

export default function WhatWeDoPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="What We Do"
        title="We build AI GTM systems that run without you."
        subtitle="Six AI agents. Connected to your stack. Orchestrating your entire go-to-market motion \u2014 from signal detection to booked meetings."
      />

      {/* Problem Section */}
      <section className="w-full py-24 bg-[rgb(14,15,17)]">
        <div className="max-w-[1100px] mx-auto px-5">
          <Reveal variants={fadeLeft} className="mb-14">
            <h2 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[115%] tracking-[-1.5px] text-white" style={{ fontFamily: "var(--font-family-heading)" }}>
              Why most funded founders are <span className="text-accent-orange italic">still stuck.</span>
            </h2>
          </Reveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((p, i) => (
              <StaggerItem key={i} variants={popIn}>
                <motion.div
                  className="rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)] h-full"
                  whileHover={{ scale: 1.015, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden p-7 h-full">
                    <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,86,0,0.06) 0%, transparent 65%)" }} />
                    <div className="relative z-[1]">
                      <div className="w-11 h-11 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8650A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Six Agents */}
      <section className="w-full py-24 bg-[rgb(14,15,17)]">
        <div className="max-w-[1100px] mx-auto px-5">
          <Reveal variants={flipUp} className="text-center mb-14" >
            <Badge text="The System" />
            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6" style={{ fontFamily: "var(--font-family-heading)" }}>
              Six agents. One system. <span className="text-accent-orange italic">Always talking.</span>
            </h2>
          </Reveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, i) => (
              <StaggerItem key={i} variants={popIn}>
                <motion.div
                  className="rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)] h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden p-7 h-full">
                    <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${agent.color}12 0%, transparent 65%)` }} />
                    <motion.div className="absolute bottom-0 left-[15%] right-[15%] h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)` }} animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
                    <div className="relative z-[1]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${agent.color}20`, border: `1px solid ${agent.color}30`, color: agent.color }}>
                          {agent.icon}
                        </div>
                        <h3 className="text-white font-semibold">{agent.name}</h3>
                        <motion.div className="w-2 h-2 rounded-full ml-auto" style={{ background: agent.color }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                      </div>
                      <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{agent.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-[rgb(14,15,17)]">
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
