"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What exactly does Rev Orchestra build?",
    a: "We build a complete AI-orchestrated GTM system tailored to your business. This includes 6 AI sub-agents (Signal, Research, Copy, Outbound, CRM, and Monitor) connected to your existing tools like HubSpot, Clay, Instantly, Slack, and n8n. The system detects buying signals, researches accounts, writes personalised outreach, manages sequences, updates your CRM, and monitors performance \u2014 all automatically.",
  },
  {
    q: "How long does the full build take?",
    a: "90 days from kickoff to handoff. Weeks 1\u20132 are discovery and audit. Weeks 2\u20133 are system architecture and blueprint sign-off. Weeks 3\u201310 are the build and integration phase. Weeks 11\u201312 are optimisation, documentation, and team training. After handoff, you get 30 days of post-launch support included.",
  },
  {
    q: "Do I actually own the system after the build?",
    a: "Yes, 100%. Every workflow, every agent, every piece of IP \u2014 it\u2019s yours permanently. We build inside your tool instances (your n8n, your CRM, your accounts). There are no subscriptions, no retainers, and no lock-in. When we hand the keys over, you own it completely.",
  },
  {
    q: "What tools do I need before we start?",
    a: "We work with whatever you have. Most clients use some combination of HubSpot/Salesforce, Clay, Instantly, Slack, and a few enrichment tools. If you\u2019re missing something, we\u2019ll recommend the right tools during the audit phase. We integrate with 50+ platforms.",
  },
  {
    q: "What kind of results can I expect?",
    a: "Teams using signal-led, AI-orchestrated outbound see 4\u20137\u00D7 higher conversion rates vs. traditional batch-and-blast outbound. Our clients typically go from 1\u20132% reply rates to 8\u201312%. Pipeline generation increases by 3\u20135\u00D7 within the first 90 days of the system being live.",
  },
  {
    q: "Is my data safe? What about compliance?",
    a: "Everything runs inside your own tool instances \u2014 nothing passes through our servers. Every agent has built-in guardrails, rate limits, and action boundaries. We include RBAC (role-based access control), human-in-the-loop approval gates, and full audit trails. All enrichment sources operate under GDPR-compliant data processing agreements.",
  },
  {
    q: "How many clients do you take per quarter?",
    a: "Four, maximum. Danny personally oversees every build. We deliberately limit capacity to ensure quality. If we\u2019re full for the current quarter, we\u2019ll let you know on the discovery call and can reserve a slot for the next one.",
  },
  {
    q: "What happens on the discovery call?",
    a: "It\u2019s 30 minutes with Danny. We\u2019ll review your current GTM setup live, identify the biggest gaps, and tell you honestly whether Rev Orchestra is the right fit. No pitch deck, no sales pressure. If it\u2019s not the right time or right solution, we\u2019ll tell you.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-[15px] font-medium text-white group-hover:text-accent-orange transition-colors duration-300 pr-4">
          {faq.q}
        </span>
        <motion.div
          className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0"
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "rgba(232,86,0,0.15)" : "transparent",
            borderColor: open ? "rgba(232,86,0,0.3)" : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2v10M2 7h10"
              stroke={open ? "#E85600" : "rgba(255,255,255,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] px-6 pb-5">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full py-28 bg-black-light">
      <div className="max-w-[1100px] mx-auto px-5">
        <Reveal variants={fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
              Questions Answered
            </span>
          </div>
          <h2
            className="text-[clamp(28px,4vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            FAQ&apos;S
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[550px] mx-auto">
            Everything you need to know about Rev Orchestra, the build process,
            and what you get at the end of 90 days.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
