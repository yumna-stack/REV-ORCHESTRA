"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageWrapper";
import { Reveal, fadeUp } from "@/components/motion";

const recentIssues = [
  {
    title: "Why Signal Led Outbound is Replacing Volume Plays",
    date: "Mar 25, 2026",
    excerpt: "The data is clear: teams using buying signals to trigger outreach see 4 to 7x higher conversion rates. Here's exactly how to build a signal layer.",
  },
  {
    title: "The Multi Agent Architecture: How We Design AI Operations Systems",
    date: "Mar 18, 2026",
    excerpt: "A deep dive into why a fleet of specialised agents outperforms a single AI SDR, and the architecture we tailor to each client&apos;s workflow.",
  },
  {
    title: "Done For You vs. DIY: The Real Cost of Building Internally",
    date: "Mar 11, 2026",
    excerpt: "Most founders underestimate the time cost of stitching together Clay + Instantly + n8n + HubSpot. Here's the honest math.",
  },
];

export default function OrchestraPage() {
  return (
    <main className="w-full bg-[rgb(0, 0, 0)]">
      <Navigation />

      <PageHero
        badge="The Orchestra"
        title="Weekly. Free. Actually useful."
        subtitle="GTM strategy, AI orchestration insights, and founder playbooks, delivered every Tuesday. No spam, no fluff."
      />

      {/* Subscribe form placeholder */}
      <section className="w-full py-16 bg-[rgb(0, 0, 0)]">
        <div className="max-w-[500px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] p-8 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Join 200+ B2B founders</h3>
              <p className="text-sm text-[rgba(255,255,255,0.4)] mb-6">One email per week. Unsubscribe anytime.</p>

              {/* Kit/ConvertKit embed placeholder */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white text-sm placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-accent-orange transition-colors"
                />
                <motion.button
                  className="px-6 py-3 text-white text-sm font-medium rounded-full hover:bg-[rgb(22,22,26)] transition-all"
                  style={{ backgroundColor: "rgb(14,14,16)", border: "1px solid rgb(60,50,42)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-[10px] text-[rgba(255,255,255,0.2)] mt-3">Powered by Kit. We respect your inbox.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recent issues */}
      <section className="w-full py-16 bg-[rgb(0, 0, 0)]">
        <div className="max-w-[700px] mx-auto px-5">
          <Reveal variants={fadeUp} className="mb-10">
            <h2
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
              Recent Issues
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {recentIssues.map((issue, i) => (
              <Reveal key={i} variants={fadeUp} delay={i * 0.08}>
                <motion.div
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] p-6"
                  whileHover={{ borderColor: "rgba(232,86,0,0.15)", x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-[rgba(255,255,255,0.3)]">{issue.date}</span>
                  </div>
                  <h3 className="text-white font-medium mb-2">{issue.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.4)] leading-[170%]">{issue.excerpt}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
