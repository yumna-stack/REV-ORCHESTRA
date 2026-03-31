"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp, popIn } from "@/components/motion";

const faqs = [
  { q: "What is CRYPS?", a: "CRYPS is a cutting-edge platform that combines cryptocurrency management with advanced AI technology, offering secure wallet management, real-time analytics, and intelligent trading insights." },
  { q: "How does CRYPS ensure transaction security?", a: "We use multi-layer encryption, hardware security modules, and advanced AI-powered fraud detection to keep all transactions and assets fully secure at all times." },
  { q: "Which cryptocurrencies does CRYPS support?", a: "CRYPS supports all major cryptocurrencies including Bitcoin, Ethereum, Solana, Cardano, Polkadot, and hundreds of altcoins across 12+ blockchain networks." },
  { q: "What are the pricing plans?", a: "We offer three plans: Starter ($25/month), Pro ($30/month), and Enterprise ($50/month). Each tier includes progressively more features and support." },
  { q: "How can I integrate CRYPS into my business?", a: "Our robust API suite allows seamless integration with your existing systems. Enterprise clients get dedicated support and custom integration assistance." },
  { q: "Is my data safe with CRYPS?", a: "Absolutely. We follow enterprise-grade security practices with end-to-end encryption, SOC 2 compliance, and regular security audits to protect all user data." },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-base font-medium text-white group-hover:text-accent-orange transition-colors duration-300 pr-4">{faq.q}</span>
        <motion.div
          className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "rgba(232,86,0,0.15)" : "transparent",
            borderColor: open ? "rgba(232,86,0,0.3)" : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke={open ? "#E85600" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] pb-6 pr-12">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full py-28 bg-black-light">
      <div className="max-w-[800px] mx-auto px-5">
        <Reveal variants={fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.08)] mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange" />
            <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider uppercase">Questions Answered</span>
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] font-semibold leading-[110%] tracking-[-2px] text-white mb-4">FAQ&apos;S</h2>
          <p className="text-base text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[550px] mx-auto">Find answers to the most common questions about our platform, security, and how we can help you trade smarter.</p>
        </Reveal>

        <StaggerContainer staggerDelay={0.08}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i} variants={fadeUp}>
              <FAQItem faq={faq} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
