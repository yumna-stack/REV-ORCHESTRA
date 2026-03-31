"use client";

import { motion } from "framer-motion";
import { Reveal, fadeUp } from "@/components/motion";

const CALENDLY_URL = "https://calendly.com/danny-revorchestra";

export default function CTA() {
  return (
    <section className="relative w-full py-24 bg-[rgb(8,8,15)] overflow-hidden">
      {/* Orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center bottom, rgba(232,101,10,0.1) 0%, transparent 70%)" }} />

      <div className="max-w-[700px] mx-auto px-5 text-center relative z-10">
        <Reveal variants={fadeUp}>
          <h2
            className="text-[clamp(28px,4.5vw,52px)] font-normal leading-[120%] tracking-[-1px] text-white mb-6"
            style={{ fontFamily: "var(--font-family-heading)" }}
          >
            The founders who built their system in Q1{" "}
            <span className="text-accent-orange italic">are already booking calls from it.</span>
          </h2>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.15}>
          <p className="text-base text-[rgba(255,255,255,0.5)] leading-[170%] mb-8 max-w-[540px] mx-auto">
            4 seats left for Q2. Discovery calls are 30 minutes. We&apos;ll review your current GTM live on the call and tell you honestly what we&apos;d build — and whether this is the right moment.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.3}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
          >
            Book a Call with Danny
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.4}>
          <p className="text-sm text-[rgba(255,255,255,0.35)] mt-6">
            Or send us your current stack and ICP. We&apos;ll show you what the system looks like for your specific market before the call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
