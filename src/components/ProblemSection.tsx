"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem, fadeUp } from "@/components/motion";

export default function ProblemSection() {
  return (
    <section className="relative w-full py-16 bg-black-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.12}>
          <StaggerItem variants={fadeUp}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(25,27,31)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(255,255,255,0.5)] tracking-wider uppercase w-fit">
              THE REAL PROBLEM
            </div>
          </StaggerItem>

          <StaggerItem variants={fadeUp}>
            <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white max-w-[800px]">
              Most Founders Don&apos;t Have a Lead Problem. They Have a Stack Problem.
            </h2>
          </StaggerItem>

          <StaggerItem variants={fadeUp}>
            <p className="text-lg text-[rgba(255,255,255,0.5)] leading-[150%] max-w-[700px]">
              Your outbound tool says one thing. Your CRM says another. Content lives somewhere else entirely. And somehow your team is expected to piece it all together and hit their number.
            </p>
          </StaggerItem>

          <StaggerItem variants={fadeUp}>
            <p className="text-base text-[rgba(255,255,255,0.4)] leading-[160%] max-w-[700px]">
              A target account clicks a LinkedIn ad, browses your pricing page, and engages with a chatbot — but your SDR enrolls them into a generic cold email sequence that ignores all that high-intent activity. Your tech stack literally forgets the account&apos;s history. We call this Stack Amnesia, and it&apos;s the reason your pipeline feels random.
            </p>
          </StaggerItem>

          <StaggerItem variants={fadeUp}>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white text-sm font-medium uppercase tracking-wider rounded-full hover:brightness-110 transition-all w-fit mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              BOOK A CALL WITH DANNY
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
