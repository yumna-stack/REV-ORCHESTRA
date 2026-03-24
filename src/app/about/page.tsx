"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge, PageHero, StaggerGrid, GridItem } from "@/components/PageWrapper";
import { Reveal, fadeUp, popIn } from "@/components/motion";

const team = [
  { name: "Jane Doe", role: "CEO & Blockchain Architect", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
  { name: "John Smith", role: "AI & Data Scientist", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
  { name: "Alex Crypto", role: "Lead Developer", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
  { name: "Sarah Tech", role: "Community Manager", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
  { name: "Michel Finn", role: "Community Manager", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
  { name: "Chris Doe", role: "CEO & Blockchain Architect", socials: { x: "#", youtube: "#", linkedin: "#", instagram: "#" } },
];

const partners = [
  { name: "ADA", label: "AUTHORIZED PARTNER" },
  { name: "BTC", label: "AUTHORIZED PARTNER" },
  { name: "ETH", label: "AUTHORIZED PARTNER" },
  { name: "SOL", label: "AUTHORIZED PARTNER" },
  { name: "BNB", label: "AUTHORIZED PARTNER" },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[rgb(14,15,17)]">
      <Navigation />

      {/* Hero */}
      <PageHero
        badge="About"
        title="Unleash the Power of Crypto Data"
        subtitle="Real-time insights across 35+ chains with CRYPS' decentralized indexing."
      />

      {/* Animated Text Section */}
      <section className="relative w-full py-20 bg-[rgb(14,15,17)]">
        <div className="max-w-[850px] mx-auto px-5 text-center">
          <Reveal variants={fadeUp}>
            <p className="text-[clamp(24px,4vw,48px)] font-medium leading-[135%] tracking-[-1.5px] text-[rgba(255,255,255,0.12)]">
              <span className="text-white">Cryps</span>{" "}
              <span className="text-white">is</span>{" "}
              <span className="text-white">revolutionizing</span>{" "}
              the fusion of cryptocurrency and artificial intelligence, ushering in a new era of crypto data indexing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team Photos Ticker */}
      <section className="relative w-full py-24 bg-[rgb(14,15,17)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="text-center mb-12">
              <Badge text="Our Team" />
              <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6 mb-4">
                Cryps Team in Action
              </h2>
              <p className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[560px] mx-auto">
                Our team works in a hybrid environment to be the best in the world
              </p>
            </div>
          </Reveal>

          {/* Photos ticker - scrolling row */}
          <Reveal variants={popIn}>
            <div className="relative w-full h-[500px] overflow-hidden rounded-[60px]">
              <div className="absolute left-0 top-0 bottom-0 w-[10%] z-10 bg-gradient-to-r from-[rgb(14,15,17)] to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-[10%] z-10 bg-gradient-to-l from-[rgb(14,15,17)] to-transparent" />
              <div className="flex gap-6 h-full" style={{ animation: "logoScroll 30s linear infinite" }}>
                {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="w-[500px] h-full shrink-0 rounded-[60px] bg-gradient-to-br from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.06)]" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="relative w-full py-24 bg-[rgb(14,15,17)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="text-center mb-12">
              <Badge text="Trusted Partners" />
              <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6 mb-4">
                A Foundation You Can Trust
              </h2>
              <p className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%] max-w-[560px] mx-auto">
                Our deep integrations with these leading protocols provide our users with unparalleled security, speed, and reliability.
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {partners.map((p, i) => (
              <GridItem key={i}>
                <motion.div
                  className="rounded-[24px] border border-[rgba(41,42,43,1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col items-center justify-center gap-4 h-[200px] transition-all"
                  whileHover={{ scale: 1.02, borderColor: "rgba(232,86,0,0.3)" }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-orange/20 to-accent-purple/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{p.name[0]}</span>
                  </div>
                  <span className="text-lg font-semibold text-white">{p.name}</span>
                  <span className="text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.15em]">{p.label}</span>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative w-full py-24 bg-[rgb(14,15,17)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <Reveal variants={fadeUp}>
            <div className="text-center mb-12">
              <Badge text="Our Heros" />
              <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-[110%] tracking-[-2px] text-white mt-6 mb-4">
                Our Team
              </h2>
              <p className="text-lg text-[rgba(255,255,255,0.45)] leading-[160%]">Meet our great team.</p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {team.map((m, i) => (
              <GridItem key={i}>
                <motion.div
                  className="rounded-[24px] border border-[rgba(41,42,43,1)] bg-[rgba(255,255,255,0.02)] p-8 transition-all"
                  whileHover={{ scale: 1.02, borderColor: "rgba(232,86,0,0.3)" }}
                >
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.02)] mb-6 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-[rgba(255,255,255,0.3)]">{m.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{m.name}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.45)] mb-4">{m.role}</p>
                  {/* Social links */}
                  <div className="flex gap-3">
                    {["X", "YT", "Li", "IG"].map((s, j) => (
                      <a key={j} href="#" className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[10px] text-[rgba(255,255,255,0.4)] hover:border-accent-orange hover:text-accent-orange transition-all">
                        {s}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </GridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <Footer />
    </main>
  );
}
