"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What do you actually build?",
    a: "An AI orchestrated operations system tailored to your workflow. We start by mapping your entire motion, whatever that is: outbound, inbound, research, CX, ops, and then build a fleet of specialized AI agents that run it. Every deployment is custom. Outbound clients get Research \u2192 Draft \u2192 Review \u2192 Finalize \u2192 Outbound pipelines. Inbound clients get triage and qualification agents. Ops clients get workflow automation. Whatever your business actually needs, we build the agents to match.",
  },
  {
    q: "How long does deployment take?",
    a: "90 days from kickoff to handoff. Weeks 1 to 2 are discovery and workflow mapping. Weeks 2 to 3 are system architecture and configuration. Weeks 3 to 10 are the build phase, agents go live one by one, connected to your existing stack. Weeks 11 to 12 are optimization, documentation, and team training. After handoff, you get 30 days of post launch support included.",
  },
  {
    q: "Do I own the system after deployment?",
    a: "Yes, 100%. The entire dashboard, every workflow, every agent, every piece of IP, it\u2019s yours permanently. We deploy inside your tool instances (your n8n, your CRM, your accounts). There are no subscriptions, no retainers, and no lock in.",
  },
  {
    q: "What tools do I need before we start?",
    a: "We work with whatever you have. Common stacks include HubSpot or Salesforce for CRM, Instantly or Clay for outreach and enrichment, Slack for internal coordination, LinkedIn and X for distribution, n8n or webhooks for custom flows. If you\u2019re missing something, we\u2019ll recommend the right tools during discovery. The system integrates with 50+ platforms.",
  },
  {
    q: "What kinds of workflows can you automate?",
    a: "Any repeatable, rules driven workflow where AI can reason, draft, decide, or route. The most common: outbound prospecting and outreach; inbound lead triage and qualification; research and enrichment; CRM hygiene; pipeline monitoring and reporting; customer success playbooks; competitive signal tracking. We design the agent mix around your workflow, not the other way around.",
  },
  {
    q: "What does the dashboard show me?",
    a: "Every agent we built, their role, their current task, and their status. The issue pipeline, what\u2019s queued, in progress, in review, and done. The monthly budget with automatic hard stop ceiling (no runaway spend). Pending approvals for anything that needs your sign off. And a live activity feed showing every action every agent has taken. You see your whole operation in one place.",
  },
  {
    q: "Is my data safe?",
    a: "Everything runs inside your own tool instances, nothing passes through our servers. Every agent has built in guardrails, rate limits, and action boundaries. The system includes role based access control, human in the loop approval gates, and full audit trails. All enrichment sources operate under GDPR compliant data processing agreements.",
  },
  {
    q: "How many clients do you take per quarter?",
    a: "Four, maximum. Danny personally oversees every deployment. We deliberately limit capacity to ensure quality. If we\u2019re full for the current quarter, we\u2019ll let you know on the discovery call and can reserve a slot for the next one.",
  },
  {
    q: "What happens on the discovery call?",
    a: "It\u2019s 30 minutes with Danny. We\u2019ll review your current workflow live, identify the biggest gaps, and show you exactly what we\u2019d build for your business. No pitch deck, no sales pressure. If it\u2019s not the right fit, we\u2019ll tell you.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-lg bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300"
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(8,8,10)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">
              Questions Answered
            </span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 500,
              lineHeight: "120%",
              letterSpacing: "-1.2px",
              color: "white",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            FAQ&apos;S
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[550px] mx-auto">
            Everything you need to know about what we build, how we deploy,
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
