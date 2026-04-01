"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero } from "@/components/PageWrapper";
import {
  Reveal,
  fadeUp,
  fadeLeft,
  slideRight,
  popIn,
  flipUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const CAL_URL = "https://cal.com/danny-revorchestra/discovery";

const values = [
  {
    title: "Ownership > Subscriptions",
    desc: "You pay once, you own everything. No monthly fees, no vendor lock-in, no surprise price hikes. The system is yours permanently.",
  },
  {
    title: "Playbook > Tools",
    desc: "Tools without a strategy just create expensive noise. We build the playbook first, then connect the tools to execute it.",
  },
  {
    title: "Precision > Volume",
    desc: "Sending more emails isn't a strategy. Reaching the right buyer in the right window with the right message — that's orchestration.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      <PageHero
        badge="About"
        title="Built by a founder, for founders."
        subtitle="Rev Orchestra exists because too many post-funding B2B founders are burning through pipeline budgets on disconnected tools."
      />

      {/* Story */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[750px] mx-auto px-5">
          <Reveal variants={slideRight}>
            <div className="space-y-6 text-base text-[rgba(255,255,255,0.5)] leading-[180%]">
              <p>
                Danny Bossa built Rev Orchestra after watching 30+ B2B founders go through the same cycle: raise funding, hire an SDR, buy 5-6 tools, burn through their list in 60 days, and end up with nothing but a messy CRM and a depleted TAM.
              </p>
              <p>
                The problem was never the tools. It was never the AI. It was the <span className="text-white font-medium">lack of orchestration</span> — no system connecting the signals to the research to the copy to the outreach to the CRM. Just disconnected point solutions running in parallel.
              </p>
              <p>
                Rev Orchestra is the fix. A <span className="text-accent-orange font-medium">90-day, done-for-you GTM system build</span> that deploys six AI agents into your existing stack. Not another SaaS subscription. Not another retainer. A system you own, permanently.
              </p>
              <p className="text-white font-medium">
                Small team. High-touch. 4 clients per quarter, max. Based between Sri Lanka and Singapore.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[1000px] mx-auto px-5">
          <Reveal variants={flipUp} className="text-center mb-14">
            <Badge text="Our Values" />
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6" style={{ fontFamily: "var(--font-family-heading)" }}>
              What we believe
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <StaggerItem key={i} variants={popIn}>
                <motion.div
                  className="relative rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)] group h-full"
                  whileHover={{ scale: 1.015, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Inner card */}
                  <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden p-8 h-full">
                    <h3 className="text-accent-orange font-semibold text-lg mb-3" style={{ fontFamily: "var(--font-family-heading)" }}>
                      {v.title}
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%]">{v.desc}</p>

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-[20%] right-[20%] h-[60px] bg-gradient-to-t from-accent-orange/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Animated bottom line on outer shell */}
                  <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[rgba(232,86,0,0.35)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Founder */}
      <section className="w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <Reveal variants={fadeUp}>
            {/* Glassmorphic card wrapper with orange glow */}
            <div className="relative rounded-[28px] p-[5px] border border-[rgba(255,255,255,0.03)] group">
              {/* Orange glow behind the card */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-accent-orange/[0.06] via-transparent to-accent-orange/[0.04] blur-xl pointer-events-none" />

              {/* Inner card */}
              <div className="relative rounded-[24px] bg-[rgb(14,15,17)] border border-[rgb(41,42,43)] overflow-hidden p-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 border border-accent-orange/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-accent-orange">DB</span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-1">Danny Bossa</h3>
                <p className="text-sm text-accent-orange mb-4">Founder, Rev Orchestra</p>
                <p className="text-sm text-[rgba(255,255,255,0.45)] leading-[170%] mb-8">
                  GTM strategist and AI systems builder. Previously built and scaled outbound engines for B2B SaaS companies across APAC and Europe. Now focused on one thing: building AI-orchestrated GTM systems that founders own permanently.
                </p>
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

                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-[20%] right-[20%] h-[60px] bg-gradient-to-t from-accent-orange/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Animated bottom line on outer shell */}
              <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[rgba(232,86,0,0.35)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
